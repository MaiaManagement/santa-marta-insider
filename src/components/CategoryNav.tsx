import Link from '@/components/Link';
import { categories } from '@/lib/categories';

interface CategoryNavProps {
  activeSlug?: string;
}

export default function CategoryNav({ activeSlug }: CategoryNavProps) {
  return (
    <nav className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/${cat.slug}/`}
          className={`text-sm font-medium px-4 py-2 rounded-full transition-colors ${
            activeSlug === cat.slug
              ? 'bg-teal-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-700'
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
