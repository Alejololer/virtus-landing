// ponytail: endpoint de 10 lineas en vez de @astrojs/sitemap (su v3.7 ya pide Astro 5)
import { paginas } from "../data/paginas.js";
import { herramientas } from "../data/site.js";

export async function GET({ site }) {
  const rutas = ["/", ...herramientas.map((h) => `/${h.slug}`), ...paginas.map((p) => `/${p.slug}`)];
  const urls = rutas
    .map(
      (r) =>
        `  <url><loc>${new URL(r, site).href}</loc><changefreq>monthly</changefreq><priority>${r === "/" ? "1.0" : "0.8"}</priority></url>`
    )
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } }
  );
}
