# Posto THR — Auditoria e direção criativa

## 1. Auditoria do material (`assets/`)

Material recebido em 18/11/2026, vindo do WhatsApp: **25 fotos** em JPEG (720×1280, vertical) e **7 vídeos** em MP4 (576×1024 após rotação, verticais, com áudio).

**Não há arquivo de logotipo, manual de marca ou texto institucional.**

### Fotos

| Grupo | Arquivos | Conteúdo | Uso no site |
| --- | --- | --- | --- |
| Equipe com 5 pessoas | `09.22.20*`, `09.22.21`, `09.22.21 (1)`, `(2)` | Equipe completa na pista, sob a placa de diesel S-10 (8 variações quase idênticas) | Equipe (principal), Galeria, OG image |
| Trio e dupla | `09.22.22 (2)–(6)`, `09.22.23–(7)` | Frentistas diante do armário e da bomba com o símbolo do posto | Conheça o THR, Equipe, Galeria |
| Espaço interno | `09.22.23 (8)`, `09.22.24` | Equipe à mesa; parede ripada, jardim vertical, TV | Equipe, Galeria |
| Abastecimento | `09.22.21 (3)`, `09.22.22`, `09.22.22 (1)` | Frentista abastecendo carros: placas E/G, táxi, carro de aplicativo | Conheça o THR, Serviços, Galeria |

Das variações quase idênticas, foi escolhida a melhor de cada grupo (11 fotos usadas). Nenhum original foi alterado ou apagado.

### Vídeos

| Arquivo | Duração | Conteúdo | Trecho usado |
| --- | --- | --- | --- |
| `09.22.21.mp4` | 38 s | Totem de preços → abastecimento de moto → bomba | **Hero** (13–21 s, placa desfocada); Serviços "Carros e motos" |
| `09.22.21 (1).mp4` | 81 s | Limpeza de para-brisa (carro preto) e atendimento na janela | Serviços "Pagamento" (recorte sem placa) |
| `09.22.21 (2).mp4` | 16 s | Abastecimento → bomba "POSTO THR" → visor | Atendimento "Abastecimento" e "Detalhe"; quadro estático da bomba |
| `09.22.21 (3).mp4` | 13 s | Abastecimento com a avenida ao fundo | Quadro da avenida (Localização) |
| `09.22.21 (4).mp4` | 52 s | Limpeza de para-brisa (frontal) | Atendimento "Para-brisa" (recorte sem placa) |
| `09.22.22.mp4` | 4 s | Limpeza de para-brisa (de costas) | Serviços "Limpeza do para-brisa" |
| `09.22.22 (1).mp4` | 62 s | Conversa na janela → abastecimento → finalização | Atendimento "Recepção" |

### Informações comprovadas pelo material

- **Combustíveis:** Gasolina comum, Etanol comum, Diesel S-10 (totem e placas G/E/D).
- **Pagamento:** Dinheiro, PIX, Débito, Crédito (colunas do totem).
- **Serviços:** abastecimento com frentista, limpeza do para-brisa, atendimento a carros e motos.
- **Equipe:** frentistas uniformizados (camisa azul com faixas refletivas e a marca do posto).
- **Marca:** "POSTO" em azul e "THR" em vermelho, com um símbolo de estrada em perspectiva. Aparece só em fotos, sem arquivo.

### Informações vistas, mas não publicadas

- **Preços do totem:** mudam com frequência.
- **Slogan do totem** ("Melhor preço! Aqui tem economia de verdade!"): é campanha de preço, não posicionamento.
- **Distribuidora** ("Federal Energia S/A", adesivo da bomba): falta confirmação.
- **Negócios vizinhos** (oficina, concessionária): não pertencem ao THR.

---

## 2. Direção criativa

### Conceito

**THR — Sempre em frente.** O posto como parte da jornada de quem passa, não como um destino. A frase também lembra a sinalização de trânsito ("siga sempre em frente"), o que combina com um posto de combustível.

O site é uma narrativa em oito atos: chegada (hero) → propósito (manifesto) → o lugar → o que acontece na pista → como acontece → quem faz → registros → como chegar.

A sofisticação está na tipografia, no espaço e no ritmo. A linguagem é direta e próxima, nunca elitista.

### Referências combinadas

- **Automotive premium:** vídeo vertical em painel ao lado de tipografia gigante, cortes curtos, legendas mínimas tipo "timecode".
- **Editorial contemporâneo:** índices numerados (01–07), títulos em escada, colagens com sobreposição, muito espaço negativo e quase nenhuma caixa.
- **Produto digital moderno:** scrollytelling com rolagem nativa, menu em tela cheia, lightbox acessível e microinterações discretas.

### Paleta (tokens em `src/styles/globals.css`)

| Token | HEX | Papel |
| --- | --- | --- |
| `thr-blue` | `#17368C` | Azul institucional: títulos de ênfase, botão de rota |
| `thr-red` | `#D7222E` | Vermelho institucional: **somente acentos** (traços, ponto final, índice ativo, progresso) |
| `thr-navy` | `#0B1C4A` | Fundo da seção de atendimento |
| `thr-ink` | `#060D24` | Hero, galeria, rodapé |
| `paper` / `bone` / `white` | `#F5F4F0` / `#EAE8E2` / `#FFFFFF` | Fundos claros alternados |
| `graphite` / `slate` | `#2A2E37` / `#565B66` | Texto e texto secundário em fundo claro (6,2:1) |
| `mist` / `concrete` | `#C5CAD6` / `#8B8F99` | Texto secundário em fundo escuro (10:1 / 5,9:1) |

**Origem das cores:** azul e vermelho foram amostrados das fotos do totem, das bombas e dos uniformes, filtrando os pixels saturados de cada matiz. Os demais tons derivam deles ou do concreto da pista.

**Regra:** azul e vermelho nunca disputam o mesmo espaço. O azul estrutura; o vermelho pontua. Não há gradientes decorativos. Os gradientes existentes servem apenas para garantir a legibilidade sobre vídeo.

### Tipografia

- **Manrope (variável)** para títulos e destaques. Pesos 600–800, entrelinha 0,9–1,1 e tracking negativo (−0,045 a −0,025 em).
- **Inter (variável)** para texto, legendas e interface.
- **Sobrescritos** em caixa alta, 12 px, tracking de 0,2 em.
- **Escala fluida com `clamp()`:**
  - `display-xl`: 60 → 148 px
  - `display-lg`: 40 → 104 px
  - `display-md`: 32 → 64 px
  - `display-sm`: 24 → 36 px
- As fontes são auto-hospedadas (sem Google Fonts), com preload do subconjunto latino.

### Espaçamento e grade

- **Contêiner** de até 1440 px com margens de 20 / 32 / 48 px.
- **Grade** de 12 colunas no desktop e 2 no mobile.
- **Ritmo vertical das seções:** `clamp(6rem, 12vw, 11rem)`.

### Direção fotográfica

- O material é real e vertical, e foi tratado com isso em mente: **nunca ampliado** além da resolução nativa.
- **No desktop**, o vídeo do hero vira um painel vertical ao lado da tipografia, em vez de um fundo esticado e borrado.
- **Tratamento de cor:** contraste +5%, saturação −8% e denoise leve, para unificar fotos de celular em tom de campanha.
- **Recortes** pensados para cada proporção (`object-position` por foto) e para evitar placas de veículos.

### Linguagem de movimento (`src/utils/animations.js`)

- **Curva:** `ease-out-expo` (0.16, 1, 0.3, 1). Entradas rápidas que desaceleram, como um carro chegando à bomba.
- **Títulos:** sobem linha a linha de dentro de uma máscara. Imagens: leve zoom-out com fade. Textos: fade + 32 px.
- **Somente** `transform` e `opacity`. Cada animação roda uma única vez, ao entrar na tela.
- **Hero:** as animações são em CSS e começam já na primeira pintura, sem esperar o JavaScript.
- **Vídeos** tocam apenas enquanto visíveis, e todos têm botão de pausa.
- **`prefers-reduced-motion`:** sem animações e sem autoplay (o vídeo vira play manual). O modo Save-Data também desativa o autoplay.
- Não há scroll hijacking: o scrollytelling de Serviços usa `position: sticky` com rolagem nativa.

### Hierarquia visual por seção

| Seção | Fundo | Composição |
| --- | --- | --- |
| Hero | ink | Tipografia gigante à esquerda + painel de vídeo vertical; tela cheia no mobile |
| 01 Manifesto | paper | Frase em escada, 4 linhas, azul na segunda metade, ponto final vermelho |
| 02 Conheça o THR | white | Texto + lista de fatos (sem cards) + colagem de 2 fotos sobrepostas |
| 03 Serviços | bone | Índice editorial 01–05 com mídia fixa que troca na leitura (desktop) |
| 04 Atendimento | navy | 4 clipes escalonados como quadros de filme; carrossel com snap no mobile |
| 05 Equipe | paper | Mosaico em 5 proporções + frase de destaque |
| 06 Galeria | ink | Grade assimétrica de 10 itens, lightbox com teclado e gesto |
| 07 Localização | paper | "Avenida João XXIII" em grande escala + mapa sob demanda |
| Rodapé | ink | "Sempre em frente." em escala máxima, navegação e endereço |
