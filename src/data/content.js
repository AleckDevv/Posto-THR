/**
 * Textos do site, organizados por seção para facilitar revisão e substituição.
 *
 * A frase de efeito (siteData.tagline) e "Uma nova experiência em cada parada."
 * são PROPOSTAS CRIATIVAS — não são slogans oficiais aprovados.
 * Nenhum texto afirma história, prêmios, preços, horários ou serviços não comprovados.
 */
import { siteData } from './siteData.js';

// Frase de efeito quebrada em duas linhas: primeira palavra / restante.
const [taglineHead, ...taglineTail] = siteData.tagline.split(' ');
const taglineLines = [taglineHead, taglineTail.join(' ')];

export const content = {
  hero: {
    eyebrowLead: 'Posto de combustível',
    eyebrow: 'Teresina — PI',
    titleLead: 'Posto THR —',
    title: taglineLines,
    subtitle: 'Uma nova experiência em cada parada.',
    support: 'Abastecimento com frentista na Avenida João XXIII, em Teresina.',
    primaryCta: 'Como chegar',
    secondaryCta: 'Conheça o posto',
    videoCaption: 'Registro real · pista do THR',
    scrollHint: 'Role para descobrir',
  },

  manifesto: {
    index: '01',
    label: 'Manifesto',
    lines: ['Cada jornada', 'tem sua história.', 'Cada parada', 'merece atenção.'],
    aside: 'O que nos move',
    body: [
      'Quem para no THR está no meio de alguma coisa: o caminho para o trabalho, uma entrega, uma viagem, a volta para casa. Por isso, tratamos cada parada como parte da jornada de quem chega.',
      'Atendimento na pista, gente atenta e cuidado com os detalhes. É assim que entendemos seguir em frente: fazer bem feito hoje para que cada cliente siga viagem com tranquilidade.',
    ],
    signature: `THR — ${siteData.tagline}`,
  },

  about: {
    index: '02',
    label: 'Conheça o THR',
    title: 'Um posto na Avenida João XXIII pensado para quem está em movimento.',
    body: [
      'No Posto THR, o atendimento acontece na pista: frentistas uniformizados e identificados recebem cada veículo, fazem o abastecimento e cuidam dos detalhes antes de você seguir.',
      'Uma estrutura clara, com bombas sinalizadas por combustível e uma equipe que está ali para ajudar — do carro do dia a dia à moto.',
    ],
    facts: [
      { term: 'Combustíveis', key: 'fuels' },
      { term: 'Pagamento', key: 'payment' },
      { term: 'Atendimento', value: 'Com frentista, na pista' },
      { term: 'Endereço', key: 'address' },
    ],
    captions: ['Equipe THR na pista', 'Abastecimento — Av. João XXIII'],
  },

  services: {
    index: '03',
    label: 'Experiência e serviços',
    title: 'Tudo o que acontece na pista, feito com atenção.',
    lead: 'Serviços comprovados no dia a dia do posto. Outros serviços serão incluídos aqui assim que forem confirmados.',
  },

  experience: {
    index: '04',
    label: 'O atendimento THR',
    title: ['O cuidado está', 'nos detalhes.'],
    lead: 'Registros reais da rotina na pista. Gestos simples — uma conversa na janela, o abastecimento acompanhado, o para-brisa limpo — repetidos a cada cliente.',
    closing: 'Entre a chegada e a partida, é aí que o atendimento acontece.',
  },

  team: {
    index: '05',
    label: 'Nossa equipe',
    title: 'Quem faz o THR acontecer.',
    lead: 'Por trás de cada atendimento há pessoas. Uniformizadas, identificadas e prontas para receber você na pista.',
    quote: 'Atendimento é feito por gente — e é a nossa equipe que dá rosto ao THR.',
  },

  gallery: {
    index: '06',
    label: 'Galeria',
    title: 'Um dia na pista.',
    lead: 'Fotos e vídeos registrados no Posto THR. Selecione para ampliar.',
  },

  location: {
    index: '07',
    label: 'Localização',
    title: 'Avenida João XXIII',
    region: 'Teresina — Piauí — Brasil',
    lead: 'Estamos na Avenida João XXIII, em Teresina. Trace sua rota pelo Google Maps e venha conhecer o THR.',
    routeCta: 'Traçar rota',
    mapsCta: 'Abrir no Google Maps',
    loadMap: 'Carregar mapa interativo',
    mapNotice: 'O mapa é fornecido pelo Google e só é carregado após a sua confirmação.',
  },

  footer: {
    statement: taglineLines,
    backToTop: 'Voltar ao topo',
    rights: 'Todos os direitos reservados.',
  },

  notFound: {
    code: '404',
    title: 'Esta página saiu da rota.',
    body: 'O endereço que você acessou não existe ou foi alterado. Volte ao início e siga em frente.',
    cta: 'Voltar ao início',
  },
};
