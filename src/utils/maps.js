import { siteData } from '../data/siteData.js';

const q = encodeURIComponent(siteData.maps.query);
const geo = siteData.geo ? `${siteData.geo.latitude},${siteData.geo.longitude}` : null;

/** Links do Google Maps gerados a partir do endereço (ou das coordenadas, quando confirmadas). */
export const mapsLinks = {
  search: `https://www.google.com/maps/search/?api=1&query=${geo ?? q}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${geo ?? q}`,
  embed: `https://www.google.com/maps?q=${geo ?? q}&output=embed&hl=pt-BR`,
};

export const whatsappLink = (digits, text = 'Olá! Vim pelo site do Posto THR.') =>
  digits ? `https://wa.me/${String(digits).replace(/\D/g, '')}?text=${encodeURIComponent(text)}` : null;

export const phoneLink = (phone) => (phone ? `tel:${String(phone).replace(/[^\d+]/g, '')}` : null);
