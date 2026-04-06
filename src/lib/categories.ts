export interface Category {
  slug: string;
  name: string;
  nameEs: string;
  description: string;
  maia_brand: {
    name: string;
    url: string;
    tagline: string;
    color: string;
    bgColor: string;
  };
}

export const categories: Category[] = [
  {
    slug: 'real-estate',
    name: 'Real Estate',
    nameEs: 'Bienes Raíces',
    description: 'Guías de propiedades, barrios e inversión inmobiliaria en Santa Marta y Colombia.',
    maia_brand: {
      name: 'Maia Realty',
      url: 'https://maia-realty.com',
      tagline: 'Encuentra tu propiedad ideal en Santa Marta',
      color: '#1e40af',
      bgColor: '#eff6ff',
    },
  },
  {
    slug: 'legal',
    name: 'Legal',
    nameEs: 'Legal',
    description: 'Todo sobre visas, residencia, derecho colombiano y trámites legales.',
    maia_brand: {
      name: 'Maia Legal',
      url: 'https://maia-legal.com',
      tagline: 'Asesoría legal experta para vivir e invertir en Colombia',
      color: '#1e3a5f',
      bgColor: '#f0f4f8',
    },
  },
  {
    slug: 'food-drink',
    name: 'Food & Drink',
    nameEs: 'Gastronomía',
    description: 'Los mejores restaurantes, bares y experiencias gastronómicas de Santa Marta.',
    maia_brand: {
      name: 'Be Vida Botánicas',
      url: 'https://bevidabotanicas.com',
      tagline: 'Cócteles RTD artesanales — sabores tropicales de Colombia',
      color: '#14532d',
      bgColor: '#f0fdf4',
    },
  },
  {
    slug: 'jobs',
    name: 'Jobs & Careers',
    nameEs: 'Empleos',
    description: 'Oportunidades laborales, emprendimiento y vida profesional en Santa Marta.',
    maia_brand: {
      name: 'LlevaLleva',
      url: 'https://llevalleva.co',
      tagline: 'El marketplace de Colombia — compra, vende, encuentra trabajo',
      color: '#7c3aed',
      bgColor: '#faf5ff',
    },
  },
  {
    slug: 'marine',
    name: 'Marine',
    nameEs: 'Marina',
    description: 'Náutica, buceo, surf y todo lo relacionado con el mar en Santa Marta.',
    maia_brand: {
      name: 'Mapaná Marine',
      url: 'https://mapana-marine.com',
      tagline: 'Servicios náuticos profesionales en el Caribe colombiano',
      color: '#0c4a6e',
      bgColor: '#f0f9ff',
    },
  },
  {
    slug: 'things-to-do',
    name: 'Things to Do',
    nameEs: 'Qué Hacer',
    description: 'Atracciones, actividades, turismo y experiencias únicas en Santa Marta.',
    maia_brand: {
      name: 'LlevaLleva',
      url: 'https://llevalleva.co',
      tagline: 'Descubre servicios y experiencias locales en Santa Marta',
      color: '#7c3aed',
      bgColor: '#faf5ff',
    },
  },
  {
    slug: 'community',
    name: 'Community',
    nameEs: 'Comunidad',
    description: 'Noticias locales, eventos y vida comunitaria en Santa Marta.',
    maia_brand: {
      name: 'LlevaLleva',
      url: 'https://llevalleva.co',
      tagline: 'Conecta con tu comunidad local en LlevaLleva',
      color: '#7c3aed',
      bgColor: '#faf5ff',
    },
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
