/** Itens de navegação. `primary` = exibido no menu desktop; todos aparecem no menu mobile e no rodapé. */
export const navigation = [
  { id: 'manifesto', label: 'Manifesto', primary: false },
  { id: 'sobre', label: 'O posto', primary: true },
  { id: 'servicos', label: 'Serviços', primary: true },
  { id: 'atendimento', label: 'Atendimento', primary: true },
  { id: 'equipe', label: 'Equipe', primary: true },
  { id: 'galeria', label: 'Galeria', primary: true },
  { id: 'localizacao', label: 'Localização', primary: false },
];

export const sectionIds = navigation.map((item) => item.id);
