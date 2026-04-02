import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'GAM IT Solutions | Digital Transformation in Ghana',
  description = 'Leading IT solutions provider in Ghana, specializing in institutional digital infrastructure, healthcare intelligence, and national-scale technological advancements.',
  keywords = 'IT solutions, Ghana, digital transformation, healthcare software, educational software, GAM IT Solutions, software development, GAM Poul, poultry management',
  image = 'https://picsum.photos/seed/gamit/1200/630',
  url = 'https://gamitsolutions.com'
}) => {
  const siteTitle = title.includes('GAM IT Solutions') ? title : `${title} | GAM IT Solutions`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
