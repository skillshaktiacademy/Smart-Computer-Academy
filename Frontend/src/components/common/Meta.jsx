import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Smart Computer Academy";
const SITE_URL = "https://skillshakti.in"; // Default production URL
const DEFAULT_IMAGE = "/logo.jpg"; // Path to standard logo

/**
 * Enterprise SEO Meta & Schema Manager Component
 * Features:
 * - Dynamic Title, Description, Keywords
 * - Automatic & Manual Canonical URL Generation (prevents duplicate content)
 * - Open Graph & Twitter Cards for social sharing
 * - Noindex/Nofollow support for admin/dashboard sections
 * - Dynamic JSON-LD Structured Data (Schema.org) Injection
 */
const Meta = ({
  title,
  description,
  keywords,
  image,
  canonical,
  noindex = false,
  ogType = "website",
  schema, // Custom JSON-LD object or array of objects
}) => {
  const location = useLocation();

  // 1. Resolve values with fallbacks
  const resolvedTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} | Bihar's #1 ISO Certified Computer Institute`;

  const resolvedDescription =
    description ||
    "Smart Computer Academy is the leading computer education institute in Kahalgaon. Learn ADCA, DCA, Tally Prime with GST, Python, and coding with 100% practical lab training.";

  const resolvedKeywords = Array.isArray(keywords)
    ? keywords.join(", ")
    : keywords ||
      "computer institute Kahalgaon, computer classes Kahalgaon, ADCA course, DCA course, Tally classes Kahalgaon, coding course Bihar, Smart Computer Academy";

  const resolvedImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}${DEFAULT_IMAGE}`;

  const resolvedCanonical = useMemo(() => {
    if (canonical) return canonical;
    // Automatic Canonical URL generation based on current route
    return `${SITE_URL}${location.pathname}`;
  }, [canonical, location.pathname]);

  // 2. Build JSON-LD Structured Data
  const jsonLdScripts = useMemo(() => {
    if (!schema) return null;
    const schemas = Array.isArray(schema) ? schema : [schema];
    return schemas.map((schemaObj, index) => {
      // Auto-inject context if missing
      const formatted = {
        "@context": "https://schema.org",
        ...schemaObj,
      };
      return (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(formatted)}
        </script>
      );
    });
  }, [schema]);

  return (
    <Helmet>
      {/* ── Basic Meta Tags ── */}
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={resolvedKeywords} />
      
      {/* Indexing rules */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Canonical Link */}
      <link rel="canonical" href={resolvedCanonical} />

      {/* ── Open Graph / Facebook ── */}
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:image" content={resolvedImage} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* ── Twitter Cards ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedImage} />
      <meta name="twitter:url" content={resolvedCanonical} />

      {/* ── JSON-LD Structured Data ── */}
      {jsonLdScripts}
    </Helmet>
  );
};

export default Meta;
