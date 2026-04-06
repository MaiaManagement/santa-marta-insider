import { getCategoryBySlug } from '@/lib/categories';

interface MaiaAdProps {
  category: string;
  variant?: 'sidebar' | 'inline' | 'banner';
}

export default function MaiaAd({ category, variant = 'inline' }: MaiaAdProps) {
  const cat = getCategoryBySlug(category);
  if (!cat) return null;

  const { maia_brand } = cat;

  if (variant === 'sidebar') {
    return (
      <a
        href={maia_brand.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
        style={{ backgroundColor: maia_brand.bgColor }}
      >
        <div className="p-5">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: maia_brand.color }}
          >
            Patrocinado por
          </span>
          <h3 className="text-lg font-bold mt-1 mb-2" style={{ color: maia_brand.color }}>
            {maia_brand.name}
          </h3>
          <p className="text-sm text-gray-600 leading-snug">{maia_brand.tagline}</p>
          <span
            className="inline-block mt-4 text-sm font-semibold px-4 py-2 rounded-full text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: maia_brand.color }}
          >
            Visitar sitio →
          </span>
        </div>
      </a>
    );
  }

  if (variant === 'banner') {
    return (
      <a
        href={maia_brand.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        style={{ backgroundColor: maia_brand.bgColor }}
      >
        <div className="flex-1 min-w-0">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Servicio recomendado</span>
          <div className="flex items-center gap-3 mt-0.5">
            <span className="font-bold text-base" style={{ color: maia_brand.color }}>
              {maia_brand.name}
            </span>
            <span className="text-sm text-gray-600 truncate">— {maia_brand.tagline}</span>
          </div>
        </div>
        <span
          className="shrink-0 text-sm font-semibold px-4 py-1.5 rounded-full text-white"
          style={{ backgroundColor: maia_brand.color }}
        >
          Ver más
        </span>
      </a>
    );
  }

  // inline (default)
  return (
    <div
      className="my-8 p-6 rounded-2xl border border-gray-200"
      style={{ backgroundColor: maia_brand.bgColor }}
    >
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Contenido patrocinado</p>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold" style={{ color: maia_brand.color }}>
            {maia_brand.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{maia_brand.tagline}</p>
        </div>
        <a
          href={maia_brand.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block shrink-0 text-sm font-semibold px-6 py-2.5 rounded-full text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: maia_brand.color }}
        >
          Visitar {maia_brand.name} →
        </a>
      </div>
    </div>
  );
}
