'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/lib/categories';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <Link href="/" className="flex flex-col items-start">
            <span className="text-2xl font-serif font-bold text-gray-900 tracking-tight">
              Ruta <span className="text-teal-600">Colombia</span>
            </span>
            <span className="text-xs text-gray-500 font-sans uppercase tracking-widest">
              Your guide to Colombia
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/about/"
              className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
            >
              Acerca de
            </Link>
            <Link
              href="/contact/"
              className="text-sm bg-teal-600 text-white px-4 py-1.5 rounded-full hover:bg-teal-700 transition-colors"
            >
              Contacto
            </Link>
          </div>
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Category nav */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              className="text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors font-medium"
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}/`}
                className="text-sm text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md font-medium"
                onClick={() => setMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <hr className="my-2" />
            <Link href="/about/" className="text-sm text-gray-600 px-3 py-2" onClick={() => setMenuOpen(false)}>
              Acerca de
            </Link>
            <Link href="/contact/" className="text-sm text-gray-600 px-3 py-2" onClick={() => setMenuOpen(false)}>
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
