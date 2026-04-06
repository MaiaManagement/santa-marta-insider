import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Acerca de Santa Marta Insider',
  description: 'Santa Marta Insider es la guía digital de The Maia Group para el Caribe colombiano.',
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">Acerca de nosotros</h1>
      <div className="w-16 h-1 bg-teal-500 mb-8 rounded-full" />

      <div className="prose max-w-none text-gray-700">
        <p>
          <strong>Santa Marta Insider</strong> es el hub de contenido digital de{' '}
          <a href="https://the-maia-group.com" target="_blank" rel="noopener noreferrer">
            The Maia Group
          </a>{' '}
          — tu fuente de confianza para todo lo que necesitas saber sobre vivir, trabajar, invertir y disfrutar Santa Marta y el Caribe colombiano.
        </p>

        <p>
          Nuestro equipo combina más de una década de experiencia local con profesionales en bienes raíces, derecho, gastronomía, náutica y emprendimiento. Escribimos guías detalladas, análisis de mercado y recursos prácticos para expatriados, inversores y locales por igual.
        </p>

        <h2>Nuestra misión</h2>
        <p>
          Hacer accesible el conocimiento local. Santa Marta está creciendo rápidamente como destino para vivir e invertir, pero la información confiable escasea. Estamos aquí para llenar ese vacío.
        </p>

        <h2>El ecosistema Maia Group</h2>
        <p>
          Santa Marta Insider forma parte del ecosistema de empresas de The Maia Group en Colombia:
        </p>
        <ul>
          <li>
            <a href="https://maia-realty.com" target="_blank" rel="noopener noreferrer">
              <strong>Maia Realty</strong>
            </a>{' '}
            — Bienes raíces y gestión de propiedades en Santa Marta
          </li>
          <li>
            <a href="https://maia-legal.com" target="_blank" rel="noopener noreferrer">
              <strong>Maia Legal</strong>
            </a>{' '}
            — Servicios legales para vivir e invertir en Colombia
          </li>
          <li>
            <a href="https://mapana-marine.com" target="_blank" rel="noopener noreferrer">
              <strong>Mapaná Marine</strong>
            </a>{' '}
            — Servicios náuticos en el Caribe colombiano
          </li>
          <li>
            <a href="https://bevidabotanicas.com" target="_blank" rel="noopener noreferrer">
              <strong>Be Vida Botánicas</strong>
            </a>{' '}
            — Cócteles RTD artesanales de Colombia
          </li>
          <li>
            <a href="https://llevalleva.co" target="_blank" rel="noopener noreferrer">
              <strong>LlevaLleva</strong>
            </a>{' '}
            — El marketplace de clasificados de Colombia
          </li>
        </ul>

        <h2>Publicidad y colaboraciones</h2>
        <p>
          Trabajamos con marcas y empresas alineadas con nuestros valores. Si te interesa publicar contenido patrocinado, anuncios o colaboraciones editoriales,{' '}
          <Link href="/contact/">escríbenos</Link>.
        </p>
      </div>
    </div>
  );
}
