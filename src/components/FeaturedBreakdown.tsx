import React from 'react';
import { ArrowRight, Clock, Star } from 'lucide-react';
import { Article } from '../types';

interface FeaturedBreakdownProps {
  article: Article;
  onReadArticle: (slug: string) => void;
}

export const FeaturedBreakdown: React.FC<FeaturedBreakdownProps> = ({
  article,
  onReadArticle,
}) => {
  return (
    <section className="py-12 bg-white border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h2 className="text-xs sm:text-sm uppercase tracking-widest font-extrabold text-gray-900">
              Featured Breakdown
            </h2>
          </div>
          <span className="text-xs font-semibold text-gray-500">
            Editor&apos;s Pick of the Month
          </span>
        </div>

        {/* Large Featured Card */}
        <div
          onClick={() => onReadArticle(article.slug)}
          className="group relative bg-[#FAFAFA] rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Large Image Column */}
          <div className="lg:col-span-7 relative overflow-hidden bg-gray-100 aspect-[16/10] lg:aspect-auto min-h-[300px] lg:min-h-[420px]">
            <img
              src={article.image}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Subtle bottom vignette on small screens */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Clean unboxed metadata */}
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                <span className="text-red-600 uppercase tracking-wider font-bold">
                  {article.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{article.publishedDate}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readingTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-black text-gray-950 group-hover:text-red-600 transition-colors leading-[1.15]">
                {article.title}
              </h3>

              {/* Subtitle / Short Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                {article.summary}
              </p>

              {/* Key tags preview */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-gray-500 font-medium">
                {article.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-gray-600">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Read Article Button */}
            <div className="pt-8">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReadArticle(article.slug);
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gray-950 group-hover:bg-red-600 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
              >
                <span>Read Full Breakdown</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
