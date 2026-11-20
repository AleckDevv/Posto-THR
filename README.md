# Posto THR — Website

Site institucional do **Posto THR** (Avenida João XXIII, Teresina — PI), construído com o material real do posto: fotos da equipe, vídeos de atendimento na pista, totem e bombas.

- **Conceito criativo (proposta):** *THR — Sempre em frente.* · *Uma nova experiência em cada parada.*
- **Narrativa da página:** Hero → Manifesto → Conheça o THR → Serviços → O atendimento THR → Nossa equipe → Galeria → Localização → Rodapé.
- **Resultados (build de produção):** Lighthouse 100 / 100 / 100 / 100 (mobile e desktop), CLS 0, sem violações no axe-core. Detalhes em [docs/RELATORIO-DE-TESTES.md](docs/RELATORIO-DE-TESTES.md).

> **Antes de publicar**, veja a seção [Informações pendentes](#informações-pendentes). Nada foi inventado: campos sem confirmação simplesmente não aparecem no site.

---

## Executar localmente

Requisitos: **Node.js 20.19+** (testado com Node 26 e npm 11).

```bash
npm install          # instala as dependências
npm run dev          # servidor de desenvolvimento em http://localhost:5173
```

## Build de produção

```bash
cp .env.example .env # e preencha VITE_SITE_URL com o domínio oficial
npm run build        # gera dist/ (HTML pré-renderizado + assets com hash)
npm run preview      # serve dist/ em http://localhost:4173
npm run lint         # ESLint (React, Hooks e acessibilidade)
```

O `build` executa três etapas:

1. `vite build` — bundle do cliente (`index.html` e `404.html`).
2. `vite build --ssr` — versão de servidor do React, usada só no build.
3. `scripts/prerender.mjs` — injeta o HTML renderizado nas páginas (SSG) e adiciona preload das fontes.

O conteúdo chega completo no HTML (bom para SEO e para a primeira pintura) e o React apenas hidrata a página.

### Variável de ambiente

| Variável | Uso |
| --- | --- |
| `VITE_SITE_URL` | Domínio oficial, sem barra final (ex.: `https://www.dominio.com.br`). Gera `canonical`, `og:url`, URLs absolutas do Open Graph/JSON-LD e o `sitemap.xml`. **Sem ela, esses itens são omitidos** e o build mostra um aviso. |

---

## Publicação

O resultado é um site **100% estático** (pasta `dist/`). Qualquer host estático serve. Configurações já incluídas:

| Host | Arquivo | O que configura |
| --- | --- | --- |
| Netlify / Cloudflare Pages | `public/_headers` | Cache de 1 ano em `/assets/*`, HTML sempre revalidado, cabeçalhos de segurança e CSP |
| Vercel | `vercel.json` | Comando de build, pasta de saída, cabeçalhos e cache |
| Apache / LiteSpeed (Hostinger, Locaweb, HostGator…) | `public/.htaccess` | Página 404, HTTPS, compressão, cache, segurança e CSP |

**Passo a passo (Netlify, Vercel ou Cloudflare Pages):** conecte o repositório, use `npm run build` como comando e `dist` como pasta de publicação, e defina `VITE_SITE_URL` nas variáveis de ambiente do painel.

**Hospedagem compartilhada (cPanel/hPanel):** rode `npm run build` localmente e envie **o conteúdo** de `dist/` (incluindo o `.htaccess`) para `public_html/`.

A página `404.html` é servida automaticamente com status HTTP 404 nesses hosts. Depois de publicar, envie o `sitemap.xml` ao Google Search Console.

A CSP foi testada com o site rodando: nenhuma violação, inclusive com o mapa do Google carregado. Se adicionar scripts de terceiros (ex.: analytics), inclua os domínios na CSP dos três arquivos.

---

## Estrutura

```
assets/                    ← MATERIAL ORIGINAL (nunca alterado pelo projeto)
public/                    ← favicon, ícones, og-image, manifest, _headers, .htaccess
scripts/
  process-media.mjs        ← pipeline de mídia (fotos e vídeos otimizados)
  prerender.mjs            ← pré-renderização estática (SSG)
  vite-plugin-seo.js       ← metadados, JSON-LD, robots.txt e sitemap.xml
src/
  assets/
    images/ videos/        ← mídia otimizada (gerada por npm run media)
    logo/                  ← coloque aqui o logotipo oficial (ver LEIA-ME.md)
    media-manifest.json    ← dimensões e cor dominante (gerado)
  components/
    layout/                ← Header, Navigation, MobileMenu, Footer
    sections/              ← Hero, Manifesto, About, Services, Experience, Team, Gallery, Location
    ui/                    ← Button, Container, SectionHeading, Reveal, ResponsiveImage,
                             AmbientVideo, Lightbox, Logo
  data/
    siteData.js            ← DADOS INSTITUCIONAIS (endereço, contatos, horários, SEO)
    content.js             ← TODOS OS TEXTOS do site, por seção
    services.js            ← serviços comprovados
    navigation.js          ← itens de menu
    media.js               ← registro de mídia, textos alternativos e coleções
  hooks/                   ← useScrollSpy, useLockBodyScroll, useClientInfo
  layouts/MainLayout.jsx
  pages/Home.jsx, NotFound.jsx
  styles/globals.css       ← tokens de design (Tailwind v4 @theme)
  utils/                   ← animações, links de mapa, cn()
  main.jsx · notfound.jsx · entry-server.jsx · App.jsx
docs/                      ← direção criativa, relatório de testes, Lighthouse
```

Ajustes em relação à estrutura sugerida no briefing:

- `Contact.jsx` foi incorporado a `Location.jsx`. Sem telefone, WhatsApp ou e-mail confirmados, um formulário não teria para onde enviar. Os contatos aparecem sozinhos quando preenchidos.
- `useScrollProgress` e `useMediaQuery` não foram criados. A barra de progresso usa o `useScroll` do Motion, e os layouts responsivos são resolvidos só com CSS, sem divergência entre servidor e cliente.
- Não há React Router: o site tem uma página. O 404 é um HTML estático próprio (status 404 real, melhor para SEO que uma rota de SPA).

---

## Como editar

| Quero… | Onde |
| --- | --- |
| Trocar a frase de efeito ("Sempre em frente.") | `tagline` em `src/data/siteData.js`: atualiza hero, manifesto, rodapé e texto alternativo. Rode `npm run media` para regenerar a `og-image.jpg` |
| Trocar os demais textos | `src/data/content.js` |
| Adicionar telefone, WhatsApp, horário, redes sociais, CEP | `src/data/siteData.js`. Aparecem automaticamente na Localização, no Rodapé e no JSON-LD |
| Incluir um serviço | `src/data/services.js` (somente após confirmação) |
| Usar o logotipo oficial | Coloque `logo.svg` (ou `logo-light.svg` / `logo-dark.svg`) em `src/assets/logo/` |
| Trocar cores, fontes ou espaçamentos | Tokens em `src/styles/globals.css` (`@theme`) |
| Trocar ou adicionar fotos e vídeos | Coloque os originais em `assets/`, ajuste `scripts/process-media.mjs` e rode `npm run media`. Depois, registre em `src/data/media.js` |

### Pipeline de mídia (`npm run media`)

Lê `assets/` (somente leitura) e gera:

- **Fotos:** AVIF + WebP em 480 px e 720 px (720 px é a largura nativa do material; nada é ampliado).
- **Vídeos:** recortes curtos em MP4 H.264, sem áudio, com `faststart`, denoise leve e tratamento de cor sutil. O VP9/WebM foi testado e ficou *maior* que o MP4 neste material, por isso foi descartado.
- **Privacidade:** trechos e enquadramentos foram escolhidos para **não mostrar placas legíveis**. No vídeo do hero, a placa da moto foi desfocada.
- **Também gera:** posters, quadros estáticos, `og-image.jpg` (1200×630) e ícones PNG.

Usa `ffmpeg-static` e `sharp` (devDependencies). O script de instalação do `ffmpeg-static` já está autorizado em `allowScripts` no `package.json`. Os arquivos gerados já estão no projeto, então o `build` não depende do ffmpeg.

---

## Dependências

| Pacote | Por quê |
| --- | --- |
| `react`, `react-dom` | Interface (componentes funcionais e hooks) |
| `motion` | Animações de revelação e barra de progresso (`LazyMotion` + `m`, recursos carregados de forma assíncrona) |
| `lucide-react` | Ícones (importação individual, tree-shaking) |
| `@fontsource-variable/manrope`, `@fontsource-variable/inter` | Fontes auto-hospedadas (sem requisição ao Google Fonts) |
| *dev* `vite`, `@vitejs/plugin-react` | Build e servidor de desenvolvimento |
| *dev* `tailwindcss`, `@tailwindcss/vite` | Estilos com tokens de design |
| *dev* `eslint` + plugins `react`, `react-hooks`, `react-refresh`, `jsx-a11y`, `globals`, `@eslint/js` | Qualidade e acessibilidade do código. ESLint 9, porque o `jsx-a11y` ainda não suporta o 10 |
| *dev* `sharp`, `ffmpeg-static` | Pipeline de mídia |

JavaScript inicial: ~106 KB gzip (React DOM ≈ 72 KB + site/Motion ≈ 34 KB); mais 18,5 KB de animações carregados depois. CSS: 9 KB gzip.

---

## Informações pendentes

O site está pronto para publicar, mas estes itens dependem do Posto THR:

1. **Logotipo oficial em arquivo** (SVG de preferência). Hoje o site usa uma assinatura tipográfica **provisória** ("POSTO THR"), e o favicon também é provisório. A marca só aparece no material em fotos das bombas, do totem e dos uniformes.
2. **Cores oficiais** (HEX ou Pantone). As atuais foram amostradas das fotos: azul `#17368C` e vermelho `#D7222E`.
3. **Domínio** do site, para preencher `VITE_SITE_URL`.
4. **Horário de funcionamento.**
5. **Telefone e WhatsApp.**
6. **Redes sociais oficiais.**
7. **Número, bairro e CEP** do endereço.
8. **Coordenadas / perfil no Google** (Google Business Profile), para o mapa apontar ao local exato. Hoje o mapa usa a busca "Posto THR, Avenida João XXIII, Teresina - PI".
9. **Outros serviços** (conveniência, calibragem, troca de óleo etc.). Nenhum foi incluído por falta de comprovação.
   - O espaço interno com mesas, que aparece em duas fotos, foi descrito apenas como "espaço interno". Falta confirmar se é uma conveniência ou lanchonete e qual o nome.
10. **Distribuidora/bandeira.** Um adesivo nas bombas indica "Federal Energia S/A", mas a informação não foi publicada sem confirmação.
11. **Autorização de uso de imagem** dos colaboradores e de clientes que aparecem nos vídeos (LGPD). Placas foram evitadas ou desfocadas; rostos de motoristas aparecem pequenos e de relance.
12. **Aprovação dos textos**, principalmente a frase *"Sempre em frente."*, que é uma proposta criativa.
13. **Material com mais resolução (recomendado).** As fotos (720 px) e os vídeos (576 px) vieram comprimidos pelo WhatsApp. Uma sessão de fotos e vídeos profissional elevaria a qualidade visual, sobretudo em telas grandes e retina.
