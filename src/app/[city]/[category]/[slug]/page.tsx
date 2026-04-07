import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import MaiaAd from '@/components/MaiaAd';
import AdSense from '@/components/AdSense';
import ArticleCard from '@/components/ArticleCard';
import { ArticleSchema } from '@/components/SchemaOrg';
import { cities, getCityBySlug } from '@/lib/cities';
import { categories, getCategoryBySlug } from '@/lib/categories';
import {
  getAllArticleStaticParams,
  getArticleByCityAndSlug,
  getArticlesByCityAndCategory,
} from '@/lib/articles';

interface Props {
  params: { city: string; category: string; slug: string };
}

export async function generateStaticParams() {
  return getAllArticleStaticParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleByCityAndSlug(params.city, params.slug);
  if (!article) return {};

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
    },
  };
}

export default function ArticlePage({ params }: Props) {
  const city = getCityBySlug(params.city);
  const article = getArticleByCityAndSlug(params.city, params.slug);
  if (!city || !article || article.category !== params.category) notFound();

  const cat = getCategoryBySlug(article.category);
  const relatedArticles = getArticlesByCityAndCategory(params.city, article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const articleUrl = `https://ruta-colombia.com/${params.city}/${article.category}/${article.slug}/`;

  return (
    <>
      <ArticleSchema
        title={article.title}
        description={article.excerpt}
        datePublished={article.date}
        author={article.author}
        url={articleUrl}
        category={cat?.name || article.category}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${params.city}/`} className="hover:text-teal-600">{city.name}</Link>
          <span className="mx-2">/</span>
          <Link href={`/${params.city}/${article.category}/`} className="hover:text-teal-600">
            {cat?.name || article.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Article */}
          <article className="lg:col-span-2" lang={article.lang || 'en'}>
            {/* Header */}
            <div className="mb-8">
              {cat && (
                <Link
                  href={`/${params.city}/${article.category}/`}
                  className="inline-block text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4 transition-opacity hover:opacity-80"
                  style={{ backgroundColor: cat.maia_brand.bgColor, color: cat.maia_brand.color }}
                >
                  {cat.name}
                </Link>
              )}
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {article.title}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">{article.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 pb-6 border-b border-gray-200">
                <span>
                  By <strong className="text-gray-700">{article.author}</strong>
                </span>
                <span>·</span>
                <span>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span>·</span>
                <span>{article.readingTime} read</span>
                <span>·</span>
                <span className="text-teal-600 font-medium">{city.name}</span>
              </div>
            </div>

            {/* AdSense top of article */}
            <AdSense slot="article-top" format="fluid" className="mb-8" />

            {/* MDX Content */}
            <div className="prose max-w-none">
              <MDXRemote source={article.content} />
            </div>

            {/* Maia inline ad */}
            <MaiaAd category={article.category} variant="inline" />

            {/* AdSense bottom */}
            <AdSense slot="article-bottom" format="auto" className="mt-8" />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <MaiaAd category={article.category} variant="sidebar" />
            <AdSense slot="sidebar-article" format="rectangle" />

            {relatedArticles.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900 mb-4">Related articles</h3>
                {relatedArticles.map((a) => (
                  <ArticleCard key={a.slug} article={a} variant="compact" />
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Related articles section */}
      {relatedArticles.length > 0 && (
        <section className="bg-white border-t border-gray-200 py-12 mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              More in {cat?.name} — {city.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
