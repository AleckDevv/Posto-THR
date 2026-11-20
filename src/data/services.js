/**
 * Serviços COMPROVADOS pelo material do posto (fotos, vídeos, totem e bombas).
 * Para incluir novos serviços (ex.: conveniência, calibragem, troca de óleo),
 * adicione um item aqui somente após confirmação do Posto THR.
 */
import { siteData } from './siteData.js';
import { getImage, getVideo } from './media.js';

export const services = [
  {
    id: 'abastecimento',
    title: 'Abastecimento com frentista',
    description:
      'Você não precisa sair do veículo. Um frentista recebe você na pista, conduz o abastecimento e acompanha cada etapa até a finalização.',
    media: { type: 'image', data: getImage('refuel-hatch') },
    evidence: 'Fotos e vídeos de abastecimento na pista.',
  },
  {
    id: 'combustiveis',
    title: 'Combustíveis',
    description:
      'Bombas identificadas por combustível, com sinalização clara na pista para você escolher com segurança.',
    tags: siteData.fuels,
    media: { type: 'image', data: getImage('pump-detail') },
    evidence: 'Totem de preços e placas G / E / D nas bombas.',
  },
  {
    id: 'para-brisa',
    title: 'Limpeza do para-brisa',
    description:
      'Água, rodo e atenção ao vidro enquanto o atendimento acontece — para você seguir viagem com boa visibilidade.',
    media: { type: 'video', data: getVideo('care-window') },
    evidence: 'Vídeos de limpeza de para-brisa pelos frentistas.',
  },
  {
    id: 'carros-e-motos',
    title: 'Carros e motos',
    description:
      'Do carro do dia a dia à moto, o atendimento é o mesmo: alguém da equipe ao seu lado durante toda a parada.',
    media: { type: 'video', data: getVideo('care-moto') },
    evidence: 'Vídeos de abastecimento de carros e de moto.',
  },
  {
    id: 'pagamento',
    title: 'Formas de pagamento',
    description: 'Pague como preferir. Informe a forma de pagamento ao frentista no momento do atendimento.',
    tags: siteData.payment,
    media: { type: 'video', data: getVideo('care-checkout') },
    evidence: 'Totem de preços: "Dinheiro / PIX / Débito" e "Crédito".',
  },
];
