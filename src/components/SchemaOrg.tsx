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
      name: 'Santa Marta Insider',
      logo: {
        '@type': 'ImageObject',
        url: 'https://santamartainsider.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    articleSection: category,
    inLanguage: 'es-CO',
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
    name: 'Santa Marta Insider',
    description: 'Tu guía definitiva del Caribe colombiano. Noticias, guías y recursos para vivir, invertir y disfrutar Santa Marta.',
    url: 'https://santamartainsider.com',
    inLanguage: 'es-CO',
    publisher: {
      '@type': 'Organization',
      name: 'The Maia Group',
      url: 'https://the-maia-group.com',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://santamartainsider.com/search?q={search_term_string}',
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
