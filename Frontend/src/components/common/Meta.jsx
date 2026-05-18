import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  const defaultTitle = "Skill Shakti Academy | Bihar's #1 Computer Institute";
  const defaultDescription = "Skill Shakti Academy is the leading computer institute in Bihar, providing industry-standard DCA, ADCA, Tally, and PGDCA courses with 100% placement support.";
  const defaultKeywords = "computer institute Bihar, DCA course, ADCA training, Tally classes, computer coaching, Skill Shakti Academy, professional certification";

  return (
    <Helmet>
      <title>{title ? `${title} | Skill Shakti Academy` : defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content="/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Helmet>
  );
};

export default Meta;
