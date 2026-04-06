import Link from 'next/link';
import { ArticleMeta } from '@/lib/articles';
import { getCategoryBySlug } from '@/lib/categories';

interface ArticleCardProps {
  article: ArticleMeta;
  variant?: 'default' | 'featured' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const cat = getCategoryBySlug(article.category);
  const href = `/${article.category}/${article.slug}/`;

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="bg-gradient-to-br from-teal-500 to-teal-700 h-48 flex items-end p-6">
          <span className="text-white/80 text-xs font-semibold uppercase tracking-widest">
            {cat?.name || article.category}
          </span>
        </div>
        <div className="p-6">
          <h2 className="font-serif font-bold text-xl text-gray-900 group-hover:text-teal-700 transition-colors leading-tight mb-3">
            {article.title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{new Date(article.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>·</span>
            <span>{article.readingTime} lectura</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={href} className="group flex gap-4 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors">
        <div className="flex-1 min-w-0">
          <span
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: cat?.maia_brand.color || '#0d9488' }}
          >
            {cat?.name || article.category}
          </span>
          <h3 className="font-semibold text-gray-900 group-hover:text-teal-700 transition-colors text-sm mt-0.5 leading-snug line-clamp-2">
            {article.title}
          </h3>
          <span className="text-xs text-gray-400 mt-1 block">{article.readingTime} lectura</span>
        </div>
      </Link>
    );
  }

  // default
  return (
    <Link href={href} className="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div
        className="h-3 w-full"
        style={{ backgroundColor: cat?.maia_brand.color || '#0d9488' }}
      />
      <div className="p-5">
        <span
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: cat?.maia_brand.color || '#0d9488' }}
        >
          {cat?.name || article.category}
        </span>
        <h2 className="font-serif font-bold text-lg text-gray-900 group-hover:text-teal-700 transition-colors leading-snug mt-1 mb-2 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{new Date(article.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>·</span>
          <span>{article.readingTime} lectura</span>
        </div>
      </div>
    </Link>
  );
}
