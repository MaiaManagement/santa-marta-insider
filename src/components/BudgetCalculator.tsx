'use client';

import { useMemo, useState } from 'react';

type AccommodationType = 'hostel' | 'mid' | 'luxury';
type TravelStyle = 'budget' | 'comfort' | 'splurge';

const COP_PER_USD = 4000;

const accommodationBenchmarks: Record<AccommodationType, { label: string; cop: number; note: string }> = {
  hostel: {
    label: 'Hostel / guesthouse',
    cop: 65000,
    note: 'Dorms, simple guesthouses, or shared stays',
  },
  mid: {
    label: 'Mid-range hotel',
    cop: 170000,
    note: 'Comfortable private room or boutique stay',
  },
  luxury: {
    label: 'Luxury hotel',
    cop: 360000,
    note: 'Upscale hotel, resort, or premium apartment',
  },
};

const styleBenchmarks: Record<
  TravelStyle,
  {
    label: string;
    food: number;
    transport: number;
    activities: number;
    note: string;
  }
> = {
  budget: {
    label: 'Budget',
    food: 32000,
    transport: 14000,
    activities: 24000,
    note: 'Street food, local buses, free and low-cost sights',
  },
  comfort: {
    label: 'Comfort',
    food: 85000,
    transport: 42000,
    activities: 70000,
    note: 'Restaurants, rideshares, museums, day trips',
  },
  splurge: {
    label: 'Splurge',
    food: 210000,
    transport: 100000,
    activities: 150000,
    note: 'Premium dining, private transfers, guided experiences',
  },
};

const whatsappHref =
  'https://wa.me/19034598763?text=Hola%21%20I%27d%20like%20help%20planning%20my%20Colombia%20trip%20%F0%9F%87%A8%F0%9F%87%B4';

function formatCop(value: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default function BudgetCalculator() {
  const [days, setDays] = useState(7);
  const [travellers, setTravellers] = useState(2);
  const [accommodation, setAccommodation] = useState<AccommodationType>('mid');
  const [style, setStyle] = useState<TravelStyle>('comfort');

  const estimate = useMemo(() => {
    const safeDays = Math.max(1, days || 1);
    const safeTravellers = Math.max(1, travellers || 1);
    const accommodationDaily = accommodationBenchmarks[accommodation].cop;
    const selectedStyle = styleBenchmarks[style];
    const perTravellerBreakdown = {
      accommodation: accommodationDaily,
      food: selectedStyle.food,
      transport: selectedStyle.transport,
      activities: selectedStyle.activities,
    };
    const perTravellerDaily = Object.values(perTravellerBreakdown).reduce((total, value) => total + value, 0);
    const groupDaily = perTravellerDaily * safeTravellers;
    const total = groupDaily * safeDays;

    return {
      safeDays,
      safeTravellers,
      perTravellerBreakdown,
      perTravellerDaily,
      groupDaily,
      total,
      groupBreakdown: Object.fromEntries(
        Object.entries(perTravellerBreakdown).map(([category, value]) => [category, value * safeTravellers * safeDays]),
      ) as Record<keyof typeof perTravellerBreakdown, number>,
    };
  }, [accommodation, days, style, travellers]);

  const categoryRows = [
    ['Accommodation', estimate.groupBreakdown.accommodation],
    ['Food', estimate.groupBreakdown.food],
    ['Transport', estimate.groupBreakdown.transport],
    ['Activities', estimate.groupBreakdown.activities],
  ] as const;

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.7fr)]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-3 h-3 bg-teal-600 rounded-full" />
              <h2 className="font-serif text-2xl font-bold text-gray-900">Trip Budget Calculator</h2>
              <div className="h-px flex-1 bg-gray-200" />
            </div>
            <p className="text-gray-600 leading-relaxed max-w-3xl mb-6">
              Estimate a realistic Colombia trip budget using 2025/2026 price benchmarks for accommodation,
              food, local transport, and paid experiences. Figures are planning ranges, not quotes.
            </p>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-gray-800">Trip duration</span>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={days}
                  onChange={(event) => setDays(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                />
                <span className="mt-1 block text-xs text-gray-500">Days in Colombia</span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-800">Travellers</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={travellers}
                  onChange={(event) => setTravellers(Number(event.target.value))}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                />
                <span className="mt-1 block text-xs text-gray-500">People sharing the itinerary</span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-800">Accommodation type</span>
                <select
                  value={accommodation}
                  onChange={(event) => setAccommodation(event.target.value as AccommodationType)}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                >
                  {Object.entries(accommodationBenchmarks).map(([value, option]) => (
                    <option key={value} value={value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="mt-1 block text-xs text-gray-500">{accommodationBenchmarks[accommodation].note}</span>
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-gray-800">Travel style</span>
                <select
                  value={style}
                  onChange={(event) => setStyle(event.target.value as TravelStyle)}
                  className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
                >
                  {Object.entries(styleBenchmarks).map(([value, option]) => (
                    <option key={value} value={value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <span className="mt-1 block text-xs text-gray-500">{styleBenchmarks[style].note}</span>
              </label>
            </div>
          </div>

          <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Estimated budget</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-4 border border-gray-200">
                <p className="text-xs text-gray-500">Daily group budget</p>
                <p className="text-xl font-bold text-gray-900">{formatCop(estimate.groupDaily)}</p>
                <p className="text-sm text-gray-600">{formatUsd(estimate.groupDaily / COP_PER_USD)}</p>
              </div>
              <div className="rounded-xl bg-white p-4 border border-gray-200">
                <p className="text-xs text-gray-500">Total trip cost</p>
                <p className="text-xl font-bold text-gray-900">{formatCop(estimate.total)}</p>
                <p className="text-sm text-gray-600">{formatUsd(estimate.total / COP_PER_USD)}</p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-white border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">
                  Breakdown for {estimate.safeDays} days and {estimate.safeTravellers} traveller
                  {estimate.safeTravellers === 1 ? '' : 's'}
                </p>
              </div>
              <dl className="divide-y divide-gray-100">
                {categoryRows.map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-4 px-4 py-3">
                    <dt className="text-sm text-gray-600">{label}</dt>
                    <dd className="text-sm font-semibold text-gray-900 text-right">{formatCop(value)}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-gray-500">
              Per-person daily estimate: {formatCop(estimate.perTravellerDaily)} /{' '}
              {formatUsd(estimate.perTravellerDaily / COP_PER_USD)}. USD uses 1 USD = 4,000 COP for simple planning.
            </p>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#1ebe5e] transition-colors"
            >
              Plan your trip with Maia
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
