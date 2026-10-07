import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, ArrowRight, Tag } from 'lucide-react';
import { Article } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (slug: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard escape shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? articles.filter((art) => {
        const q = query.toLowerCase();
        return (
          art.title.toLowerCase().includes(q) ||
          art.subtitle.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q) ||
          (art.brandName && art.brandName.toLowerCase().includes(q)) ||
          art.tags.some((t) => t.toLowerCase().includes(q)) ||
          art.sections.some(
            (sec) =>
              (sec.heading && sec.heading.toLowerCase().includes(q)) ||
              sec.paragraphs.some((p) => p.toLowerCase().includes(q))
          )
        );
      })
    : [];

  const quickPicks = ['Nike', 'Zomato', 'Quick Commerce', 'Influencer', 'Starbucks', 'AI', 'Apple'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Input Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center gap-3 bg-gray-50/50">
          <Search className="w-5 h-5 text-gray-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand, topic, title, or keywords (e.g., Nike, influencer, AI)..."
            className="w-full bg-transparent text-base sm:text-lg text-gray-950 placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="p-5 border-b border-gray-100 bg-white">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {quickPicks.map((pick) => (
                <button
                  key={pick}
                  onClick={() => setQuery(pick)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 hover:border-red-200 border border-gray-200/80 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
                >
                  {pick}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Container */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {query.trim() ? (
            filtered.length > 0 ? (
              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Found {filtered.length} {filtered.length === 1 ? 'breakdown' : 'breakdowns'}
                </p>
                {filtered.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art.slug);
                      onClose();
                    }}
                    className="p-3.5 sm:p-4 rounded-xl border border-gray-200/80 hover:border-red-500/50 hover:bg-red-50/20 transition-all cursor-pointer group flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-semibold">
                        <span className="text-red-600 uppercase tracking-wider font-extrabold">
                          {art.category}
                        </span>
                        {art.brandName && (
                          <>
                            <span className="text-gray-300" aria-hidden="true">·</span>
                            <span className="text-gray-700 font-bold">{art.brandName}</span>
                          </>
                        )}
                        <span className="text-gray-300" aria-hidden="true">·</span>
                        <span className="text-gray-500">{art.readingTime}</span>
                      </div>
                      <h4 className="font-editorial text-base sm:text-lg font-bold text-gray-950 group-hover:text-red-600 transition-colors leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-xs text-gray-500 line-clamp-1 font-normal">
                        {art.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 space-y-2">
                <p className="font-editorial text-lg font-bold text-gray-900">
                  No breakdown found. Try another search.
                </p>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  Try searching for keywords like &ldquo;Zomato&rdquo;, &ldquo;Nike&rdquo;, &ldquo;influencer&rdquo;, &ldquo;fashion&rdquo;, or &ldquo;quick commerce&rdquo;.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-10 text-gray-400 text-xs">
              Type keywords above to instantly search across all 12 articles and brands.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
