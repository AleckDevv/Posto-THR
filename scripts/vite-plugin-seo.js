/**
 * Plugin de SEO do Posto THR.
 *  - Injeta <title>, descrição, Open Graph, Twitter Cards, canonical e JSON-LD
 *    (Schema.org / GasStation) no index.html a partir de src/data/siteData.js.
 *  - Gera robots.txt e sitemap.xml no build.
 *
 * O domínio vem de VITE_SITE_URL (.env). Sem ele, canonical, og:url e sitemap
 * são omitidos (nunca publicamos URLs inventadas) e o build emite um aviso.
 */
import { siteData, fullAddress } from '../src/data/siteData.js';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildJsonLd(base) {
  const { address, contact, geo, hours, social, payment } = siteData;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'GasStation',
    name: siteData.name,
    description: siteData.seo.description,
    image: base ? [`${base}${siteData.seo.ogImage}`] : undefined,
    url: base ? `${base}/` : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [address.street, address.number].filter(Boolean).join(', '),
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode ?? undefined,
      addressCountry: address.countryCode,
    },
    geo: geo ? { '@type': 'GeoCoordinates', latitude: geo.latitude, longitude: geo.longitude } : undefined,
    telephone: contact.phone ?? undefined,
    email: contact.email ?? undefined,
    openingHoursSpecification: hours.length
      ? hours.filter((h) => h.schema).map((h) => ({ '@type': 'OpeningHoursSpecification', ...h.schema }))
      : undefined,
    sameAs: social.length ? social.map((s) => s.url) : undefined,
    paymentAccepted: payment.join(', '),
    currenciesAccepted: 'BRL',
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.maps.query)}`,
  };
  // JSON.stringify remove as chaves undefined; "<" escapado evita fechar o <script>
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

function buildHead(base) {
  const { seo, name } = siteData;
  const image = `${base}${seo.ogImage}`;
  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    base && `<link rel="canonical" href="${base}/" />`,
    `<meta name="geo.region" content="BR-${siteData.address.state}" />`,
    `<meta name="geo.placename" content="${esc(siteData.address.city)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:site_name" content="${esc(name)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    base && `<meta property="og:url" content="${base}/" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(seo.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${buildJsonLd(base)}</script>`,
  ];
  return tags.filter(Boolean).join('\n    ');
}

export function seoPlugin({ siteUrl } = {}) {
  const base = (siteUrl || '').trim().replace(/\/+$/, '');
  let warned = false;

  return {
    name: 'thr-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (!base && !warned) {
          warned = true;
          console.warn(
            '\n[thr-seo] VITE_SITE_URL não definido: canonical, og:url e sitemap.xml foram omitidos.\n' +
              '          Defina o domínio oficial em .env antes de publicar (ver README).\n',
          );
        }
        return html
          .replace('<!--seo-head-->', buildHead(base))
          .replace(/__SITE_NAME__/g, esc(siteData.name))
          .replace(/__SITE_ADDRESS__/g, esc(fullAddress()));
      },
    },
    generateBundle() {
      if (this.environment && this.environment.name !== 'client') return;
      const robots = ['User-agent: *', 'Allow: /', base && `Sitemap: ${base}/sitemap.xml`]
        .filter(Boolean)
        .join('\n');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` });

      if (base) {
        const today = new Date().toISOString().slice(0, 10);
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap });
      }
    },
  };
}
