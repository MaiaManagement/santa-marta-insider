'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories } from '@/lib/categories';
import { cities } from '@/lib/cities';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);

  return (
    <header className="bg-gray-950 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3 border-b border-gray-800">
          <Link href="/" className="flex flex-col items-start" onClick={() => setMenuOpen(false)}>
            <span className="text-2xl font-serif font-bold text-white tracking-tight leading-none">
              Ruta <span className="text-teal-400">Colombia</span>
            </span>
            <span className="text-xs text-gray-400 font-sans uppercase tracking-widest mt-0.5">
              Your definitive guide to living in Colombia
            </span>
          </Link>

          {/* Desktop right nav */}
          <div className="hidden md:flex items-center gap-2">
            {/* Cities dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
                onClick={() => setCityMenuOpen(!cityMenuOpen)}
                onBlur={() => setTimeout(() => setCityMenuOpen(false), 150)}
              >
                Cities
                <svg className="w-3.5 h-3.5 mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {cityMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-52 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 py-2 z-50">
                  {cities.map((city) => (
                    <Link
                      key={city.slug}
                      href={`/${city.slug}/`}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      onClick={() => setCityMenuOpen(false)}
                    >
                      <span className="text-xs">📍</span>
                      <div>
                        <div className="font-semibold">{city.name}</div>
                        <div className="text-xs text-gray-500">{city.tagline}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about/"
              className="text-sm text-gray-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact/"
              className="text-sm bg-teal-600 text-white px-4 py-1.5 rounded-full hover:bg-teal-500 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-300 hover:text-white"
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

        {/* Desktop category nav */}
        <nav className="hidden md:flex items-center gap-1 py-2 overflow-x-auto">
          <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mr-2 shrink-0">Explore:</span>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/medellin/${cat.slug}/`}
              className="text-sm text-gray-400 hover:text-white hover:bg-gray-800 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <span className="text-gray-700 mx-1">|</span>
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}/`}
              className="text-sm font-semibold text-teal-400 hover:text-teal-300 hover:bg-gray-800 px-3 py-1.5 rounded-md whitespace-nowrap transition-colors"
            >
              {city.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-4">
          <div className="mb-3">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 px-3">Cities</p>
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/${city.slug}/`}
                className="flex items-center gap-2 text-sm text-teal-400 font-semibold px-3 py-3 rounded-md hover:bg-gray-800 min-h-[44px]"
                onClick={() => setMenuOpen(false)}
              >
                {city.name}
              </Link>
            ))}
          </div>
          <div className="mb-3">
            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2 px-3">Categories</p>
            <nav className="flex flex-col gap-0.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/medellin/${cat.slug}/`}
                  className="text-sm text-gray-300 hover:text-white px-3 py-3 rounded-md hover:bg-gray-800 min-h-[44px] flex items-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
          <hr className="border-gray-700 my-3" />
          <Link href="/about/" className="block text-sm text-gray-400 px-3 py-3 hover:text-white min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact/" className="block text-sm text-gray-400 px-3 py-3 hover:text-white min-h-[44px] flex items-center" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
