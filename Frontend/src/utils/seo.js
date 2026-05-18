import { useEffect } from "react";

const SITE_NAME = "Smart Computer Academy";
const SITE_URL  = "https://skillshakti.in";
const LOGO_URL  = `${SITE_URL}/logo.png`;

/* ── Slug preview (mirrors backend slugify logic) ───────────── */
export function generateSlug(text = "") {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")    // remove special chars
    .replace(/[\s_]+/g, "-")     // spaces/underscores → hyphens
    .replace(/--+/g, "-")        // collapse multiple hyphens
    .replace(/^-+|-+$/g, "");    // trim leading/trailing hyphens
}

/* ── Course JSON-LD ─────────────────────────────────────────── */
export function courseJsonLd(course) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: `${SITE_URL}/courses/${course.slug}`,
    image: course.thumbnail?.url || LOGO_URL,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
    offers: {
      "@type": "Offer",
      price: course.fee ?? 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/courses/${course.slug}`,
    }
  };
}

/* ── Franchise JSON-LD ──────────────────────────────────────── */
export function franchiseJsonLd(franchise) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: franchise.name,
    description: `Official center of Smart Computer Academy in ${franchise.address?.city}`,
    url: `${SITE_URL}/franchises/${franchise.code}`,
    image: franchise.logo?.url || LOGO_URL,
    address: {
      "@type": "PostalAddress",
      streetAddress: franchise.address?.street,
      addressLocality: franchise.address?.city,
      addressRegion: franchise.address?.state,
      postalCode: franchise.address?.pincode,
      addressCountry: "IN",
    },
    parentOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/* ── Breadcrumb JSON-LD ─────────────────────────────────────── */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/* ── Build meta object ──────────────────────────────────────── */
export function buildMeta({
  title,
  description = "Smart Computer Academy – Bihar's #1 Computer Education Institute. DCA, ADCA, Tally & more.",
  image = LOGO_URL,
  url = SITE_URL,
  type = "website",
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: fullTitle,
    metas: [
      { name: "description",        content: description },
      { name: "robots",             content: noindex ? "noindex,nofollow" : "index,follow" },
      { property: "og:type",        content: type },
      { property: "og:title",       content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image",       content: image },
      { property: "og:url",         content: url },
      { property: "og:site_name",   content: SITE_NAME },
      { name: "twitter:card",        content: "summary_large_image" },
      { name: "twitter:title",       content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image",       content: image },
    ],
    canonical: url,
  };
}

/**
 * Hook for SEO debugging
 */
export function useSEO({ title, url }) {
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.debug("[SEO Update]", { title, url });
    }
  }, [title, url]);
}
