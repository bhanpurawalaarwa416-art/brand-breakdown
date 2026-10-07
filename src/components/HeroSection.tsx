import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Compass, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreArticles: () => void;
  onExploreBrands: () => void;
  onSelectArticle: (slug: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreArticles,
  onExploreBrands,
  onSelectArticle,
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden border-b border-gray-200/70">
      {/* Subtle background ambient light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest font-bold text-red-600 flex items-center gap-2">
              <span>BBA Digital Business Academic Project</span>
              <span aria-hidden="true">·</span>
              <span>Online Marketing Magazine</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-[1.08] text-balance">
              The Stories, Strategies &amp; Secrets Behind Your Favourite Brands.
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl font-normal">
              Discover how the world&apos;s most recognisable brands use marketing, storytelling, technology and strategy to win customers.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreArticles}
                className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 cursor-pointer group"
              >
                <span>Explore Articles</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreBrands}
                className="px-6 py-3.5 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-semibold text-sm rounded-xl transition-all shadow-xs hover:border-gray-400 flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-gray-600" />
                <span>Explore Brands</span>
              </button>
            </div>

            {/* Quick Proof Metrics adjacent to claims */}
            <div className="pt-6 border-t border-gray-200/80 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-2xl font-black text-gray-950 tabular-nums">12</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Deep Dives</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-950 tabular-nums">100%</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Original Analysis</p>
              </div>
              <div>
                <p className="text-2xl font-black text-gray-950 tabular-nums">700+</p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">Words Per Story</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Collage Grid of Featured Brands */}
          <div className="lg:col-span-5 relative">
            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 p-2 bg-gray-100/70 rounded-2xl border border-gray-200/80 shadow-xs">
              {/* Card 1: Zomato */}
              <div
                onClick={() => onSelectArticle('zomato-brand-experience')}
                className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-gray-200/90 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="/src/assets/images/zomato_brand_breakdown_1791359598593.jpg"
                    alt="Zomato food delivery lifestyle"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Food Tech</div>
                  <h2 className="font-editorial text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-1 mt-0.5">
                    Zomato Experience
                  </h2>
                </div>
              </div>

              {/* Card 2: Nike */}
              <div
                onClick={() => onSelectArticle('nike-brand-strategy')}
                className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-gray-200/90 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="/src/assets/images/nike_brand_breakdown_1791359612565.jpg"
                    alt="Nike runner athletic grit"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Mindset</div>
                  <h2 className="font-editorial text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-1 mt-0.5">
                    Nike &quot;Just Do It&quot;
                  </h2>
                </div>
              </div>

              {/* Card 3: Starbucks */}
              <div
                onClick={() => onSelectArticle('starbucks-lifestyle-marketing')}
                className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-gray-200/90 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="/src/assets/images/starbucks_lifestyle_breakdown_1791359623414.jpg"
                    alt="Starbucks coffee lifestyle ritual"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Third Place</div>
                  <h2 className="font-editorial text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-1 mt-0.5">
                    Starbucks Ritual
                  </h2>
                </div>
              </div>

              {/* Card 4: Apple */}
              <div
                onClick={() => onSelectArticle('apple-simplicity-superpower')}
                className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md border border-gray-200/90 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src="/src/assets/images/apple_minimalism_breakdown_1791359633427.jpg"
                    alt="Apple architectural minimalism"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <div className="text-[11px] font-bold text-red-600 uppercase tracking-wider">Design</div>
                  <h2 className="font-editorial text-sm font-bold text-gray-900 group-hover:text-red-600 line-clamp-1 mt-0.5">
                    Apple Simplicity
                  </h2>
                </div>
              </div>
            </div>

            {/* Editor's Note Stamp */}
            <div className="mt-3 text-center">
              <span className="text-xs text-gray-500 font-medium italic">
                Curated by First-Year BBA Digital Business · Spring Edition 2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
