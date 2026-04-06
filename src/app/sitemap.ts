import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';
import { categories } from '@/lib/categories';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ruta-colombia.com';

  const articles = getAllArticles();
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/${article.category}/${article.slug}/`,
    lastModified: new Date(article.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...categoryUrls,
    ...articleUrls,
  ];
}
