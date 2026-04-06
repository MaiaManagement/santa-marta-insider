import Link from 'next/link';
import { ArticleMeta } from '@/lib/articles';
import { getCategoryBySlug } from '@/lib/categories';
import PhotoCarousel from '@/components/PhotoCarousel';

const ARTICLE_PHOTOS: Record<string, [string, string, string]> = {
  'medellin-best-neighborhoods-medellin-expats': ['6web5Gydi2g', 'Iqa-WlbNjqs', 'fbQzaqvx4YY'],
  'medellin-cost-of-living-medellin-2026':       ['2RZJIMTfJkU', 'PMYCnEgvPK0', 'JvZ1paoSnHc'],
  'medellin-things-to-do-el-poblado-medellin':   ['Iqa-WlbNjqs', 'ScWTdlHE1b0', '6web5Gydi2g'],
  'santa-marta-costo-de-vida-santa-marta-2026':  ['OBhu9aAnm_4', 'gc5OYAll-rc', 'P41tKN3uZhw'],
  'santa-marta-guia-barrios-santa-marta':         ['ZHQU92sMXuU', 'dMcDVaqVpFg', 'OBhu9aAnm_4'],
  'santa-marta-guia-parque-tayrona':              ['gdtcSQi7B1E', 'gc5OYAll-rc', 'zANBBldletg'],
  'santa-marta-mejores-restaurantes-santa-marta': ['SCbq6uKCyMY', 'P41tKN3uZhw', 'ZHQU92sMXuU'],
  'santa-marta-visa-para-vivir-en-colombia':      ['yMhTgr2zdVM', '0NFDoeXGJso', 'PM95XBE1Xxk'],
};

const FALLBACK_PHOTOS: [string, string, string] = ['JvZ1paoSnHc', 'P41tKN3uZhw', 'gdtcSQi7B1E'];

function unsplash(id: string, w = 800, h = 480) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format`;
}

function getArticleSlides(article: ArticleMeta) {
  const key = `${article.city}-${article.slug}`;
  const [a, b, c] = ARTICLE_PHOTOS[key] ?? FALLBACK_PHOTOS;
  return [
    { src: unsplash(a), alt: article.title },
    { src: unsplash(b), alt: `${article.title} — photo 2` },
    { src: unsplash(c), alt: `${article.title} — photo 3` },
  ];
}

interface ArticleCardProps {
  article: ArticleMeta;
  variant?: 'default' | 'featured' | 'compact';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const cat = getCategoryBySlug(article.category);
  const href = `/${article.city}/${article.category}/${article.slug}/`;

  if (variant === 'featured') {
    return (
      <div className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
        <div className="relative">
          <PhotoCarousel slides={getArticleSlides(article)} className="h-48" />
          <span className="absolute top-3 left-3 z-10 bg-black/50 backdrop-blur-sm text-white/90 text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded-full">
            {cat?.name || article.category}
          </span>
        </div>
        <Link href={href} className="block">
        <div className="p-6">
          <h2 className="font-serif font-bold text-xl text-gray-900 group-hover:text-teal-700 transition-colors leading-tight mb-3">
            {article.title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-4">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>{new Date(article.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>·</span>
            <span>{article.readingTime} read</span>
          </div>
        </div>
      </Link>
    </div>
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
          <span className="text-xs text-gray-400 mt-1 block">{article.readingTime} read</span>
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
          <span>{new Date(article.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>·</span>
          <span>{article.readingTime} read</span>
        </div>
      </div>
    </Link>
  );
}
