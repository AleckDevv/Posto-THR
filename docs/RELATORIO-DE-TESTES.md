# Posto THR — Relatório de testes

**Data:** 20/11/2026
**Ambiente:**

- Windows 11, Node 26.13, npm 11.20
- Google Chrome estável, automatizado com Playwright 1.65
- Lighthouse 13.6 e axe-core 4.14

**Alvo:** build de produção (`npm run build`), servido com compressão Brotli e com os mesmos cabeçalhos de cache e CSP de `public/_headers`.

## Resumo

| Verificação | Resultado |
| --- | --- |
| Build de produção | ✅ sem erros nem avisos |
| ESLint (React, Hooks, jsx-a11y) | ✅ 0 problemas |
| Lighthouse mobile | ✅ Performance 100 · Acessibilidade 100 · Boas práticas 100 · SEO 100 |
| Lighthouse desktop | ✅ Performance 100 · Acessibilidade 100 · Boas práticas 100 · SEO 100 |
| axe-core (WCAG 2.0/2.1/2.2 A e AA + best practices), 390 px e 1440 px | ✅ 0 violações |
| Rolagem horizontal em 360, 390, 430, 768, 1024, 1440 e 1920 px | ✅ nenhuma |
| Erros ou avisos de console (incluindo CSP) | ✅ nenhum |
| Testes de interação automatizados | ✅ 29/29 |

Os relatórios completos do Lighthouse estão em [docs/lighthouse/](lighthouse/).

## Core Web Vitals (Lighthouse, throttling simulado)

| Métrica | Meta | Mobile | Desktop |
| --- | --- | --- | --- |
| LCP | ≤ 2,5 s | **0,8 s** | **0,7 s** |
| CLS | ≤ 0,1 | **0** | **0** |
| TBT (aproxima o INP) | ≤ 200 ms | **10–50 ms** | **0 ms** |
| FCP | — | 0,8 s | 0,4 s |

## Peso da página

| Recurso | Tamanho |
| --- | --- |
| HTML (pré-renderizado) | ~13 KB gzip |
| JavaScript inicial | ~106 KB gzip (React DOM 72 KB + site e Motion 34 KB) |
| Animações (assíncrono, depois do conteúdo) | 18,5 KB gzip |
| CSS | 9 KB gzip |
| Fontes | Manrope 25 KB + Inter 48 KB (woff2, subconjunto latino) |
| Vídeo do hero | 1,29 MB (8 s, 576×1024). O único vídeo baixado na primeira tela |
| Demais vídeos | 250–500 KB cada, baixados só quando chegam perto da tela |
| Fotos | AVIF (35–80 KB) com WebP de reserva, lazy loading fora da primeira tela |
| Total da primeira visita | ~1,6–1,8 MB, a maior parte é o vídeo do hero |

### Bundle analisado com sourcemaps

- **Chunk compartilhado:** 92% `react-dom`.
- **Chunk principal:** Motion + código do site.
- **Otimização aplicada:** os recursos de animação do Motion foram movidos para um chunk assíncrono, reduzindo o JS crítico de 123 KB para 106 KB gzip.

## Testes de interação (Playwright)

| Teste | Resultado |
| --- | --- |
| Menu mobile abre como diálogo modal, `aria-expanded` correto | ✅ |
| Rolagem da página travada com o menu aberto e destravada ao fechar | ✅ |
| `Esc` fecha o menu | ✅ |
| Link do menu fecha o diálogo, rola até a seção e atualiza o hash | ✅ |
| Vídeo do hero inicia mudo e automaticamente | ✅ |
| Apenas 1 vídeo carregado na primeira tela | ✅ |
| Botão "Pausar vídeo" pausa e troca o rótulo para "Reproduzir vídeo" | ✅ |
| Lightbox abre, ← / → navegam, `Esc` fecha | ✅ |
| Foco preso no lightbox e devolvido à galeria ao fechar | ✅ |
| Itens de vídeo no lightbox abrem player com controles | ✅ |
| Iframe do Google Maps ausente até o clique; carrega após "Carregar mapa interativo" | ✅ |
| Todos os links `target="_blank"` com `rel="noopener noreferrer"` | ✅ |
| Todas as âncoras internas apontam para seções existentes | ✅ |
| Um único `h1` e hierarquia h1 → h2 → h3 | ✅ |
| `prefers-reduced-motion`: nenhum vídeo em autoplay; play manual funciona | ✅ |
| 404 renderiza com `noindex` | ✅ |
| As 67 revelações animadas completam (nenhum conteúdo fica invisível) | ✅ |

## Responsividade (capturas revisadas)

Larguras testadas: 360, 390, 430, 768, 1024, 1440 e 1920 px.

**Problemas encontrados e corrigidos durante os testes:**

| Problema | Correção |
| --- | --- |
| Painel fixo de Serviços vazio no desktop (conflito `relative`/`absolute` no wrapper do vídeo) | Prop `fill` no `AmbientVideo` |
| Números em contorno renderizando preenchidos | Uso de `-webkit-text-fill-color` |
| Botão "Como chegar" do cabeçalho visível no mobile (conflito `hidden`/`inline-flex`) | Troca por `max-sm:hidden` |
| "Diesel S-10" quebrando no hífen | Itens com `white-space: nowrap` |
| Legenda encoberta pela foto sobreposta (Conheça o THR, mobile) | Ajuste da largura da foto sobreposta |
| Sobrescrito do hero quebrando mal em telas pequenas | Versão curta abaixo de 640 px |
| Itens da galeria encostados no desktop | Ajuste do deslocamento vertical |

**Privacidade:** o clipe "Detalhe" e o quadro "avenida" mostravam placas legíveis e foram recortados de novo. Todos os clipes foram revisados quadro a quadro.

## Acessibilidade e SEO

**Problemas corrigidos:**

| Problema (ferramenta) | Correção |
| --- | --- |
| `aria-hidden-focus` (axe): camadas inativas do painel de Serviços tinham botão focável | Atributo `inert` |
| `label-content-name-mismatch` (axe): duração "0:08" visível fora do nome acessível | Duração incluída no rótulo dos vídeos da galeria |
| `label-content-name-mismatch` (Lighthouse): logotipo sem espaço entre "POSTO" e "THR" | Espaço como texto real |
| CSP: o Vite embutia um subconjunto de fonte como `data:` URI, bloqueado por `font-src 'self'` | Fontes excluídas do inline. A CSP continua estrita |

**Também implementado:**

- **Navegação:** link "Pular para o conteúdo", foco visível com contraste em qualquer fundo, página inteira em `lang="pt-BR"`.
- **Textos alternativos** descritivos, sem nomes de pessoas.
- **SEO técnico:**
  - `title`, `description`, `canonical`, Open Graph, Twitter Cards e `geo.*`;
  - JSON-LD `GasStation` só com dados confirmados;
  - `robots.txt`, `sitemap.xml`, manifest e ícones;
  - 404 real com `noindex`;
  - HTML pré-renderizado.

## Limitações dos testes

- **Ambiente local:** as métricas são do Lighthouse em localhost com throttling simulado. Em produção, a latência real da rede e do servidor muda os números. Recomenda-se medir com PageSpeed Insights após publicar.
- **Navegadores:** testado no Chrome. Safari (iOS/macOS) e Firefox não foram testados nesta máquina. O código usa recursos amplamente suportados (`<dialog>`, `inert`, `aspect-ratio`, AVIF com WebP de reserva), mas vale verificar em um iPhone real.
- **Dispositivos:** sem testes em aparelhos físicos (apenas emulação de viewport).
- **Sem domínio** (`VITE_SITE_URL`): `canonical`, `og:url` e `sitemap.xml` não foram gerados neste build e devem ser verificados após configurar o domínio.
