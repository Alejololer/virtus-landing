export const SITE = "https://www.virtusestudiojuridico.com";
export const NAME = "Virtus Estudio Jurídico";
export const PHONE = "+593995516608";
export const PHONE_HUMAN = "+593 99 551 6608";

export const wa = (msg) => `https://wa.me/593995516608?text=${encodeURIComponent(msg)}`;
export const WA_GENERAL = wa("Hola, quiero que me asesoren sobre mi caso.");
export const WA_CONSULTA = wa("Hola, quiero agendar una consulta con Virtus Estudio Jurídico.");
export const WA_EMPRESA = wa("Hola, quiero solicitar una propuesta de asesoría legal para mi empresa.");

export const ADDRESS = {
  street: "Bolívar y C. Belisario Quevedo, Edificio Vecamores (frente a la Judicatura de Salcedo)",
  locality: "Salcedo",
  region: "Cotopaxi",
  country: "EC",
  // ubicación exacta del Edificio Vecamores segun Google Maps
  lat: -1.0420674,
  lng: -78.5913327,
};

export const services = [
  "Asesoría y consultoría jurídica",
  "Patrocinio judicial y litigio",
  "Derecho Civil y obligaciones",
  "Contratos y negociación contractual",
  "Recuperación y cobro de cartera",
  "Incumplimiento de obligaciones y procesos ejecutivos",
  "Responsabilidad civil e indemnizaciones",
  "Arrendamientos y conflictos contractuales",
  "Derecho de Familia y sucesiones",
  "Derecho Laboral",
  "Derecho Penal y defensa técnica",
  "Derecho Administrativo",
  "Constitución y asesoría empresarial",
  "Propiedad Intelectual y registro de marcas",
  "Protección de Datos Personales",
  "Derecho Digital",
  "Asesoría a extranjeros y asuntos internacionales",
  "Prevención y gestión de riesgos legales",
].map((name, i) => ({ name, num: String(i + 1).padStart(2, "0") }));

export const SERVICES_INITIAL = 8;

export const team = [
  { name: "Juan Semblantes", slug: "semblantes", focus: "Derecho Procesal, Laboral, Protección de Datos y Derecho Digital." },
  { name: "Vinicio Ortiz", slug: "ortiz", focus: "Derecho Penal, Litigios y Derecho Laboral, con enfoque en defensa y patrocinio judicial." },
  { name: "Aylin Constante", slug: "constante", focus: "Propiedad Intelectual, Marcas y Derecho Internacional, con experiencia en asesoría a clientes extranjeros." },
  { name: "Hernán Naranjo", slug: "naranjo", focus: "Derecho Civil, Contratos, Derecho Administrativo y asuntos patrimoniales." },
];

export const clients = [
  { name: "Asadero El Leñador", city: "Latacunga" },
  { name: "Asadero El Leñador", city: "Salcedo" },
  { name: "All Brazas", city: "Salcedo" },
  { name: "Panadería El Lojanito", city: "Salcedo" },
  { name: "Zetta Aros y Llantas", city: "Salcedo" },
];

export const navLinks = [
  { href: "/#enfoque", label: "Enfoque" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#equipo", label: "Equipo" },
  { href: "/#clientes", label: "Clientes" },
  { href: "/calculadora-pension-alimenticia", label: "Calculadora" },
];

/* Herramientas: paginas de utilidad que no viven en paginas.js porque no son
   prosa. Un solo origen para sitemap, llms.txt, el pie y la portada. */
export const herramientas = [
  {
    slug: "calculadora-pension-alimenticia",
    h1: "Calculadora de pensiones alimenticias 2026",
    description:
      "Calcula la pension minima segun la Tabla 2026 del Ecuador (SBU $482) por ingresos, aporte al IESS, numero de hijos, edad y discapacidad.",
  },
];

export const ORG_ID = `${SITE}/#estudio`;

/* Perfiles oficiales. Alimentan sameAs: es lo que permite a buscadores y
   asistentes confirmar que el sitio, la ficha de Maps y las redes son la
   misma entidad. Formas canonicas verificadas, sin parametros de sesion. */
export const PROFILES = [
  "https://maps.google.com/?cid=13597386254876816219",
  "https://www.facebook.com/people/Virtus-Estudio-Jur%C3%ADdico/61589164015302/",
  "https://www.instagram.com/virtuslegal.ec/",
  "https://www.tiktok.com/@virtus.abogados",
  "https://www.linkedin.com/company/virtus-estudio-jur%C3%ADdico/",
];

/* Un solo @graph por página: negocio + sitio + página + migas + FAQ. */
export function buildSchema({ path = "/", title, description, faq = [], breadcrumb = [], extra = [] }) {
  const url = `${SITE}${path}`;
  const graph = [
    {
      "@type": ["LegalService", "Attorney"],
      "@id": ORG_ID,
      name: NAME,
      description:
        "Estudio jurídico en Salcedo, Cotopaxi. Asesoría, prevención y patrocinio legal en materia civil, penal, laboral, familiar, corporativa y digital.",
      url: SITE,
      sameAs: PROFILES,
      logo: `${SITE}/logo-virtus.jpg`,
      image: `${SITE}/og.jpg`,
      telephone: PHONE,
      slogan: "Justicia · Compromiso · Confianza",
      knowsLanguage: "es",
      currenciesAccepted: "USD",
      address: {
        "@type": "PostalAddress",
        streetAddress: ADDRESS.street,
        addressLocality: ADDRESS.locality,
        addressRegion: ADDRESS.region,
        addressCountry: ADDRESS.country,
      },
      geo: { "@type": "GeoCoordinates", latitude: ADDRESS.lat, longitude: ADDRESS.lng },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Cotopaxi" },
        { "@type": "City", name: "Salcedo" },
        { "@type": "City", name: "Latacunga" },
        { "@type": "City", name: "Ambato" },
        { "@type": "Country", name: "Ecuador" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
          description: "Atención de urgencias las 24 horas por WhatsApp",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: PHONE,
        availableLanguage: "Spanish",
        areaServed: "EC",
      },
      employee: team.map((m) => ({
        "@type": "Person",
        name: m.name,
        jobTitle: "Abogado",
        knowsAbout: m.focus,
        worksFor: { "@id": ORG_ID },
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Áreas de práctica",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, provider: { "@id": ORG_ID } },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: NAME,
      inLanguage: "es-EC",
      publisher: { "@id": ORG_ID },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: "es-EC",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": ORG_ID },
      primaryImageOfPage: `${SITE}/og.jpg`,
    },
  ];

  if (breadcrumb.length) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [{ name: "Inicio", path: "/" }, ...breadcrumb].map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: b.name,
        item: `${SITE}${b.path}`,
      })),
    });
  }

  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": [...graph, ...extra] };
}
