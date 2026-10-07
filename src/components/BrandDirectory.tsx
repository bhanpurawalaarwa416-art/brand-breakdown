import React, { useState } from 'react';
import { Compass, ArrowRight, ExternalLink, Building2, Tag, Calendar } from 'lucide-react';
import { BRANDS } from '../data/brands';
import { BrandInfo } from '../types';

interface BrandDirectoryProps {
  onSelectBrandArticles: (brand: BrandInfo) => void;
  onOpenArticle: (slug: string) => void;
}

export const BrandDirectory: React.FC<BrandDirectoryProps> = ({
  onSelectBrandArticles,
  onOpenArticle,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');

  const industries = ['All', ...Array.from(new Set(BRANDS.map((b) => b.industry)))];

  const filteredBrands = BRANDS.filter((brand) => {
    const matchesSearch =
      brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      brand.keyStrategy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All' || brand.industry === selectedIndustry;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs font-extrabold uppercase tracking-widest text-red-600 flex items-center gap-2">
          <span>Brand Directory</span>
          <span aria-hidden="true">·</span>
          <span>12 Iconic Case Studies</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl font-black text-gray-950 tracking-tight">
          Explore Popular Brands &amp; Their Strategic Playbooks
        </h1>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          From quick-commerce disruptors in India to global lifestyle empires, discover the strategic DNA and marketing blueprints behind the world&apos;s most influential brands.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200/90 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search brands by name, keyword, or strategy..."
            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
          />
        </div>

        {/* Industry pill-free selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0">
            Sector:
          </span>
          <select
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-red-500 cursor-pointer"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            className="group bg-white rounded-2xl border border-gray-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <div className="space-y-4">
              {/* Header with Brand Monogram & Meta */}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-editorial text-2xl font-black text-gray-950 group-hover:text-red-600 transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs font-semibold text-gray-500 mt-0.5">
                    {brand.industry}
                  </p>
                </div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-editorial font-bold text-base text-white shadow-xs"
                  style={{ backgroundColor: brand.primaryColor }}
                >
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>
              </div>

              {/* Tagline */}
              <p className="text-xs italic font-medium text-gray-500 border-l-2 border-red-500/40 pl-2.5 py-0.5">
                &ldquo;{brand.tagline}&rdquo;
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {brand.description}
              </p>

              {/* Key Strategy Highlight */}
              <div className="pt-2 text-xs font-medium text-gray-700 bg-gray-50 rounded-xl p-3 border border-gray-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-red-600 block mb-0.5">
                  Core Strategic Moat
                </span>
                <span>{brand.keyStrategy}</span>
              </div>
            </div>

            {/* Action Area */}
            <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-semibold">
                Est. {brand.foundedYear} · {brand.origin.split(',')[0]}
              </span>

              <button
                onClick={() => {
                  if (brand.associatedArticleSlugs.length > 0) {
                    onOpenArticle(brand.associatedArticleSlugs[0]);
                  } else {
                    onSelectBrandArticles(brand);
                  }
                }}
                className="px-4 py-2 bg-gray-900 group-hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <p className="text-base font-semibold text-gray-800">No brand matching your search.</p>
          <p className="text-xs text-gray-500 mt-1">Try searching for Nike, Zomato, Starbucks, or Zepto.</p>
        </div>
      )}
    </div>
  );
};
