import { MetadataRoute } from 'next';
import { getAllArticlesByCity } from '@/lib/articles';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';

const blogPosts = [
  { slug: 'colombia-10-dias-itinerario', lastMod: '2026-04-25' },
  { slug: 'mejor-epoca-viajar-colombia', lastMod: '2026-04-25' },
  { slug: 'salento-valle-cocora', lastMod: '2026-04-25' },
  { slug: 'san-andres-que-hacer', lastMod: '2026-04-25' },
  { slug: 'parque-tayrona-como-llegar', lastMod: '2026-04-25' },
  { slug: 'itinerario-cartagena-3-dias', lastMod: '2026-04-25' },
  { slug: 'eje-cafetero-que-hacer', lastMod: '2026-04-25' },
  { slug: 'guatape-desde-medellin', lastMod: '2026-04-25' },
  { slug: 'villa-de-leyva-que-ver', lastMod: '2026-04-25' },
  { slug: 'cano-cristales-como-llegar', lastMod: '2026-04-25' },
  { slug: 'bogota-3-dias-itinerario', lastMod: '2026-04-25' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ruta-colombia.com';

  const cityUrls = cities.map((city) => ({
    url: `${baseUrl}/${city.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const cityCategoryUrls = cities.flatMap((city) =>
    categories.map((cat) => ({
      url: `${baseUrl}/${city.slug}/${cat.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  const articleUrls = cities.flatMap((city) =>
    getAllArticlesByCity(city.slug).map((article) => ({
      url: `${baseUrl}/${city.slug}/${article.category}/${article.slug}/`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  const blogUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}.html`,
    lastModified: new Date(post.lastMod),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
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
    {
      url: `${baseUrl}/privacy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    ...cityUrls,
    ...cityCategoryUrls,
    ...articleUrls,
    ...blogUrls,
  ];
}
