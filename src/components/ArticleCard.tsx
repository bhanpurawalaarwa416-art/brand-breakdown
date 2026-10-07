import React, { useState } from 'react';
import { Clock, ArrowRight, Bookmark } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onSelect: (slug: string) => void;
  isSaved?: boolean;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isSaved = false,
  onToggleSave,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      onClick={() => onSelect(article.slug)}
      className="group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-gray-300 transition-all duration-200 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Card Media Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          {!imgError ? (
            <img
              src={article.image}
              alt={article.title}
              onError={() => setImgError(true)}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${article.fallbackGradient} flex flex-col justify-end p-5 text-white`}
            >
              <span className="text-xs uppercase tracking-widest font-bold opacity-80">
                {article.category}
              </span>
              <p className="font-editorial text-lg font-bold leading-tight mt-1 line-clamp-2">
                {article.title}
              </p>
            </div>
          )}

          {/* Bookmark Button */}
          {onToggleSave && (
            <button
              onClick={(e) => onToggleSave(article.id, e)}
              aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full shadow-xs hover:bg-white text-gray-700 hover:text-red-600 transition-colors cursor-pointer"
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? 'fill-red-600 text-red-600' : ''}`}
              />
            </button>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Metadata: unboxed clean text */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="text-red-600 uppercase tracking-wider font-extrabold">
              {article.category}
            </span>
            <span className="text-gray-300" aria-hidden="true">·</span>
            <span className="text-gray-500">{article.publishedDate}</span>
          </div>

          {/* Title */}
          <h3 className="font-editorial text-xl font-bold text-gray-950 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
            {article.title}
          </h3>

          {/* Short Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 font-normal">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          {article.readingTime}
        </span>

        <span className="text-gray-900 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all flex items-center gap-1 font-bold">
          Read more <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
