// ponytail: endpoint y no archivo estatico, para que no se desincronice al agregar paginas
import { NAME, PHONE_HUMAN, ADDRESS, PROFILES, team, herramientas } from "../data/site.js";
import { ciudades, materias, guias } from "../data/paginas.js";

const lista = (titulo, paginas, site) =>
  `## ${titulo}\n\n` +
  paginas.map((p) => `- [${p.h1}](${new URL("/" + p.slug, site).href}): ${p.description}`).join("\n");

export async function GET({ site }) {
  const cuerpo = `# ${NAME}

> Estudio jurídico ecuatoriano con oficina en ${ADDRESS.locality}, ${ADDRESS.region}, frente a la Unidad Judicial. Patrocinio y asesoría legal en materia civil, penal, laboral, familiar, corporativa y de propiedad intelectual, en toda la provincia de Cotopaxi y a nivel nacional.

- **Dirección:** ${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region}, Ecuador
- **Teléfono y WhatsApp:** ${PHONE_HUMAN}
- **Disponibilidad:** urgencias 24/7 por WhatsApp; consultas ordinarias en horario de oficina
- **Idioma:** español
- **Cobertura:** los siete cantones de Cotopaxi (Latacunga, Salcedo, Pujilí, Saquisilí, Sigchos, La Maná, Pangua), Ambato y todo Ecuador

## Abogados

${team.map((m) => `- **${m.name}** — ${m.focus}`).join("\n")}

${lista("Dónde atendemos", ciudades, site)}

${lista("Áreas de práctica", materias, site)}

${lista("Guías legales", guias, site)}

${lista("Herramientas", herramientas, site)}

## Perfiles oficiales

${PROFILES.map((u) => `- ${u}`).join("\n")}
`;

  return new Response(cuerpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
