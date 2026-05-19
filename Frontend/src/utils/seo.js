/**
 * Enterprise SEO & Structured Data Constants and Builders
 * Provides standardized templates for Schema.org JSON-LD injection
 */

export const SITE_NAME = "Smart Computer Academy";
export const SITE_URL  = "https://skillshakti.in";
export const LOGO_URL  = `${SITE_URL}/logo.jpg`;

/**
 * 1. Website Schema (Sitelinks Searchbox support)
 */
export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${SITE_URL}/courses?search={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * 2. Organization Schema
 */
export function organizationJsonLd() {
  return {
    "@type": "EducationalOrganization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": LOGO_URL,
    "sameAs": [
      "https://www.facebook.com/smartcomputeracademy",
      "https://www.youtube.com/@smartcomputeracademy",
      "https://www.instagram.com/smartcomputeracademy"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8092578834",
      "contactType": "admissions",
      "areaServed": "IN",
      "availableLanguage": ["Hindi", "English"]
    }
  };
}

/**
 * 3. Local Business (Educational Institute) Schema
 */
export function localBusinessJsonLd() {
  return {
    "@type": "CollegeOrUniversity",
    "@id": `${SITE_URL}/#institute`,
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": LOGO_URL,
    "image": `${SITE_URL}/praveen-sir.jpg`,
    "telephone": "+91-8092578834",
    "priceRange": "₹₹",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "S.S.V. College Road, Near Bal Badda",
      "addressLocality": "Kahalgaon",
      "addressRegion": "Bihar",
      "postalCode": "813203",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.2679,
      "longitude": 87.2185
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "07:00",
      "closes": "18:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "248"
    }
  };
}

/**
 * 4. Course Detailed Schema
 */
export function courseJsonLd(course) {
  return {
    "@type": "Course",
    "name": course.title,
    "description": course.shortDescription || course.description,
    "url": `${SITE_URL}/courses/${course.slug}`,
    "image": course.image || LOGO_URL,
    "provider": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": { "@type": "ImageObject", "url": LOGO_URL }
    },
    "offers": {
      "@type": "Offer",
      "price": course.fee || 3500,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": `${SITE_URL}/courses/${course.slug}`
    },
    "educationalLevel": course.level || "Beginner to Advanced",
    "about": course.skills || []
  };
}

/**
 * 5. Breadcrumb Schema
 */
export function breadcrumbJsonLd(items) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.path}`
    }))
  };
}

/**
 * 6. FAQ Page Schema
 */
export function faqJsonLd(faqs = []) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question || faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer || faq.a
      }
    }))
  };
}

/**
 * 7. Franchise Schema
 */
export function franchiseJsonLd(franchise) {
  return {
    "@type": "EducationalOrganization",
    "name": franchise.name,
    "description": `Official center of Smart Computer Academy in ${franchise.address?.city || 'Bihar'}`,
    "url": `${SITE_URL}/franchises/${franchise.code}`,
    "image": franchise.logo?.url || LOGO_URL,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": franchise.address?.street || "",
      "addressLocality": franchise.address?.city || "",
      "addressRegion": franchise.address?.state || "Bihar",
      "postalCode": franchise.address?.pincode || "",
      "addressCountry": "IN"
    },
    "parentOrganization": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    }
  };
}
