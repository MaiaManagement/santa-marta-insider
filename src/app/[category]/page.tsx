import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import MaiaAd from '@/components/MaiaAd';
import AdSense from '@/components/AdSense';
import { categories, getCategoryBySlug } from '@/lib/categories';
import { getArticlesByCategory, getAllArticles } from '@/lib/articles';

interface Props {
  params: { category: string };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = getCategoryBySlug(params.category);
  if (!cat) return {};

  return {
    title: `${cat.name} — Santa Marta`,
    description: cat.description,
    openGraph: {
      title: `${cat.name} en Colombia | Ruta Colombia`,
      description: cat.description,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const cat = getCategoryBySlug(params.category);
  if (!cat) notFound();

  const articles = getArticlesByCategory(params.category);
  const allArticles = getAllArticles();
  const otherArticles = allArticles.filter((a) => a.category !== params.category).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-teal-600">Inicio</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">{cat.name}</span>
      </nav>

      {/* Category header */}
      <div className="mb-8 pb-8 border-b border-gray-200">
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ backgroundColor: cat.maia_brand.bgColor, color: cat.maia_brand.color }}
        >
          {cat.nameEs}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3">{cat.name}</h1>
        <p className="text-gray-600 text-lg max-w-2xl">{cat.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2">
          {articles.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg mb-2">Próximamente</p>
              <p className="text-sm">Estamos trabajando en artículos para esta categoría.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          )}

          <div className="mt-8">
            <AdSense slot={`category-${params.category}`} format="auto" />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <MaiaAd category={params.category} variant="sidebar" />

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Otros artículos</h3>
            {otherArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="compact" />
            ))}
          </div>

          <AdSense slot="sidebar-rect" format="rectangle" />
        </aside>
      </div>
    </div>
  );
}
