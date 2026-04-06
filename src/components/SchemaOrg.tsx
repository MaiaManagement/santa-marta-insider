interface ArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  author: string;
  url: string;
  category: string;
}

export function ArticleSchema({ title, description, datePublished, author, url, category }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ruta Colombia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ruta-colombia.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    inLanguage: 'en',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ruta Colombia',
    description: 'Your definitive guide to Colombia. News, guides, and resources for living, investing, and enjoying Colombia.',
    url: 'https://ruta-colombia.com',
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'The Maia Group',
      url: 'https://the-maia-group.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://ruta-colombia.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
