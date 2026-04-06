import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import { getAllArticles, getFeaturedArticles } from '@/lib/articles';
import { categories } from '@/lib/categories';
import AdSense from '@/components/AdSense';

export default function HomePage() {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();
  const latestArticles = allArticles.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Tu guía definitiva del<br />
            <span className="text-teal-200">Caribe colombiano</span>
          </h1>
          <p className="text-teal-100 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Todo lo que necesitas saber sobre vivir, trabajar, invertir y disfrutar Santa Marta — escrito por expertos locales.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}/`}
                className="bg-white/20 hover:bg-white/30 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors backdrop-blur-sm"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* AdSense top banner */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4">
          <AdSense slot="homepage-top" format="horizontal" />
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Artículos destacados</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} variant="featured" />
            ))}
          </div>
        </section>
      )}

      {/* Categories grid */}
      <section className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="font-serif text-2xl font-bold text-gray-900">Explorar categorías</h2>
            <div className="h-px flex-1 bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}/`}
                className="group p-4 rounded-xl border border-gray-200 hover:border-teal-400 hover:shadow-sm transition-all text-center"
              >
                <div
                  className="w-8 h-8 rounded-full mx-auto mb-2"
                  style={{ backgroundColor: cat.maia_brand.bgColor, border: `2px solid ${cat.maia_brand.color}` }}
                />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-teal-700 block leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-serif text-2xl font-bold text-gray-900">Últimos artículos</h2>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Mid-page AdSense */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <AdSense slot="homepage-mid" format="auto" />
      </div>

      {/* About strip */}
      <section className="bg-teal-50 border-t border-teal-100 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-teal-900 mb-3">Sobre Ruta Colombia</h2>
          <p className="text-teal-700 leading-relaxed mb-6">
            Ruta Colombia es la guía digital de The Maia Group para viajeros e inversores en Colombia. Combinamos el conocimiento local con experiencia profesional en bienes raíces, derecho, gastronomía y más.
          </p>
          <Link
            href="/about/"
            className="inline-block bg-teal-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-700 transition-colors"
          >
            Conoce más →
          </Link>
        </div>
      </section>
    </>
  );
}
