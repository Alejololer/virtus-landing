// ponytail: endpoint de 10 lineas en vez de @astrojs/sitemap (su v3.7 ya pide Astro 5)
export async function GET({ site }) {
  const pages = Object.keys(import.meta.glob('./**/*.astro'))
    .map((p) => p.replace('./', '').replace(/index\.astro$/, '').replace(/\.astro$/, '/'));
  const urls = pages
    .map((p) => `  <url><loc>${new URL(p, site)}</loc><changefreq>monthly</changefreq><priority>${p === '' ? '1.0' : '0.8'}</priority></url>`)
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
}
