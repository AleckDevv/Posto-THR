/**
 * Dados institucionais do Posto THR — fonte única de verdade.
 *
 * Regra do projeto: somente informações confirmadas pelo material disponível.
 * Campos `null` ou listas vazias estão PENDENTES e simplesmente não são exibidos
 * no site (nem nos dados estruturados) até serem preenchidos.
 *
 * Este arquivo é importado também pelo build (vite.config.js) para gerar
 * metadados, JSON-LD, robots.txt e sitemap.xml — mantenha-o sem imports.
 */
// Frase de efeito (proposta criativa, não é slogan oficial aprovado).
// Alterar aqui atualiza hero, manifesto, rodapé, texto alternativo e og-image (após `npm run media`).
const TAGLINE = 'Sempre em frente.';

export const siteData = {
  name: 'Posto THR',

  tagline: TAGLINE,
  concept: 'Uma nova experiência em cada parada.',

  address: {
    street: 'Avenida João XXIII',
    number: null, // PENDENTE
    district: null, // PENDENTE
    city: 'Teresina',
    state: 'PI',
    stateName: 'Piauí',
    country: 'Brasil',
    countryCode: 'BR',
    postalCode: null, // PENDENTE
  },

  // PENDENTE — não inventar coordenadas. Ex.: { latitude: -5.0, longitude: -42.0 }
  geo: null,

  // PENDENTE — ex.: [{ days: 'Segunda a domingo', time: '24 horas', schema: { dayOfWeek: [...], opens: '00:00', closes: '23:59' } }]
  hours: [],

  contact: {
    phone: null, // PENDENTE — ex.: '+55 86 0000-0000'
    whatsapp: null, // PENDENTE — somente dígitos com DDI, ex.: '5586900000000'
    email: null, // PENDENTE
  },

  // PENDENTE — ex.: [{ label: 'Instagram', url: 'https://www.instagram.com/...' }]
  social: [],

  // Comprovados pelo totem de preços e pela sinalização das bombas (vídeos e fotos).
  fuels: ['Gasolina comum', 'Etanol comum', 'Diesel S-10'],
  // Comprovados pelo totem de preços ("Dinheiro / PIX / Débito" e "Crédito").
  payment: ['Dinheiro', 'PIX', 'Débito', 'Crédito'],

  maps: {
    // Consulta textual usada nos links do Google Maps (sem coordenadas inventadas).
    query: 'Posto THR, Avenida João XXIII, Teresina - PI',
  },

  seo: {
    title: 'Posto THR | Posto de combustível na Av. João XXIII em Teresina – PI',
    description:
      'Posto THR, na Avenida João XXIII, em Teresina (PI). Abastecimento com frentista, gasolina comum, etanol e diesel S-10, limpeza do para-brisa e pagamento em PIX ou cartão.',
    locale: 'pt_BR',
    themeColor: '#060D24',
    ogImage: '/og-image.jpg',
    ogImageAlt: `Equipe do Posto THR na pista de abastecimento, com o texto “${TAGLINE}”`,
  },
};

export const fullAddress = (a = siteData.address) =>
  [
    [a.street, a.number].filter(Boolean).join(', '),
    a.district,
    `${a.city} — ${a.state}`,
  ]
    .filter(Boolean)
    .join(' · ');
