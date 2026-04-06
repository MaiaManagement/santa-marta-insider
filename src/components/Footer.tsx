import Link from 'next/link';
import { categories } from '@/lib/categories';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      {/* Ad slot */}
      <div className="bg-gray-800 py-4 text-center">
        <div className="max-w-7xl mx-auto px-4">
          {/* AdSense footer slot */}
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-2469196723812841"
            data-ad-slot="footer-slot"
            data-ad-format="horizontal"
            data-full-width-responsive="true"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white font-serif font-bold text-xl mb-3">
              Santa Marta <span className="text-teal-400">Insider</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu guía definitiva del Caribe colombiano. Noticias, guías y recursos para vivir, invertir y disfrutar Santa Marta.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              Parte del ecosistema{' '}
              <a
                href="https://the-maia-group.com"
                className="text-teal-400 hover:text-teal-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                The Maia Group
              </a>
            </p>
          </div>

          {/* Categories */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categorías</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}/`}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maia Group */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Maia Group</h4>
            <ul className="space-y-2">
              {[
                { name: 'Maia Realty', url: 'https://maia-realty.com' },
                { name: 'Maia Legal', url: 'https://maia-legal.com' },
                { name: 'Maia Management', url: 'https://maia-management.com' },
                { name: 'Mapaná Marine', url: 'https://mapana-marine.com' },
                { name: 'Be Vida Botánicas', url: 'https://bevidabotanicas.com' },
                { name: 'LlevaLleva', url: 'https://llevalleva.co' },
              ].map((brand) => (
                <li key={brand.name}>
                  <a
                    href={brand.url}
                    className="text-sm text-gray-400 hover:text-teal-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {brand.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/about/" className="hover:text-teal-400 transition-colors">
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact/" className="hover:text-teal-400 transition-colors">
                  Escríbenos
                </Link>
              </li>
              <li className="pt-2 text-xs text-gray-500">
                Santa Marta, Magdalena<br />
                Colombia
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {year} Santa Marta Insider — The Maia Group. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/about/" className="hover:text-gray-400">Política de privacidad</Link>
            <Link href="/about/" className="hover:text-gray-400">Términos de uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
