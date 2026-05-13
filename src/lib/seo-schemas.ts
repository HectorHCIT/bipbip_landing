import { cdn } from "@/lib/cdn";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type Schema = Record<string, unknown>;

const SOCIAL_PROFILES = [
  "https://www.facebook.com/bipbip",
  "https://www.instagram.com/bipbip",
  "https://x.com/bipbip",
  "https://www.youtube.com/@bipbip",
  "https://www.linkedin.com/company/bipbip",
] as const;

/**
 * Organization schema — emitted once globally from the root layout.
 *
 * TODO(seo): add `contactPoint` (telephone + email + areaServed) when the
 * official customer-support contact info is available.
 */
export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: "BipBip",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: cdn("/illustration/Logonav.svg"),
    },
    sameAs: [...SOCIAL_PROFILES],
    address: {
      "@type": "PostalAddress",
      addressCountry: "HN",
    },
  };
}

/**
 * WebSite schema — declares the site identity and a `SearchAction` so search
 * engines can offer a sitelinks searchbox. The search endpoint is published
 * even though the route may not exist yet (it's a forward-looking SEO hint).
 */
export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "es-HN",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/buscar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface WebPageSchemaInput {
  path: string;
  name: string;
  description: string;
  breadcrumbs?: ReadonlyArray<BreadcrumbItem>;
}

/**
 * WebPage schema combined with a BreadcrumbList. Returns an array of two
 * schemas (or just one if no breadcrumbs are provided).
 */
export function webPageSchema(input: WebPageSchemaInput): ReadonlyArray<Schema> {
  const { path, name, description, breadcrumbs = [] } = input;
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  const webPage: Schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "es-HN",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
  };

  if (breadcrumbs.length === 0) {
    return [webPage];
  }

  const breadcrumbList: Schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.path === "/" ? SITE_URL : `${SITE_URL}${crumb.path}`,
    })),
  };

  return [webPage, breadcrumbList];
}

export type ServiceAudience = "drivers" | "restaurants";

interface ServiceSchemaInput {
  type: ServiceAudience;
}

/**
 * Service schema for audience-specific landing pages. Used on /drivers and
 * /restaurants to describe what BipBip offers each audience.
 */
export function serviceSchema({ type }: ServiceSchemaInput): Schema {
  if (type === "drivers") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/drivers#service`,
      serviceType: "Trabajo como repartidor / delivery",
      name: "Trabajá como repartidor con BipBip",
      description:
        "Generá ingresos a tu propio ritmo manejando entregas en BipBip. Definís tus horarios, tus zonas y cobrás por viaje completado.",
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Honduras" },
      audience: {
        "@type": "Audience",
        audienceType: "Repartidores",
      },
      url: `${SITE_URL}/drivers`,
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/restaurants#service`,
    serviceType: "Plataforma de delivery para restaurantes",
    name: "Sumá tu restaurante a BipBip",
    description:
      "Conectá tu restaurante con miles de clientes en Honduras. BipBip se encarga del marketing, la logística y los pagos para que vos te enfoqués en cocinar.",
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Honduras" },
    audience: {
      "@type": "Audience",
      audienceType: "Restaurantes",
    },
    url: `${SITE_URL}/restaurants`,
  };
}
