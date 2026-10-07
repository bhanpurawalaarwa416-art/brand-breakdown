import React from 'react';
import { Bookmark, X, ArrowRight, Trash2 } from 'lucide-react';
import { Article } from '../types';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (slug: string) => void;
  onRemoveSaved: (id: string) => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-red-600 fill-red-600" />
            <h3 className="font-editorial text-lg font-bold text-gray-950">
              Saved Breakdowns ({savedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
          {savedArticles.length > 0 ? (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="p-3.5 rounded-xl border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/60 transition-all flex items-start justify-between gap-3 group"
              >
                <div
                  onClick={() => {
                    onSelectArticle(art.slug);
                    onClose();
                  }}
                  className="cursor-pointer space-y-1 flex-1"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
                    {art.category}
                  </span>
                  <h4 className="font-editorial text-sm font-bold text-gray-950 group-hover:text-red-600 transition-colors line-clamp-1">
                    {art.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-normal">
                    {art.readingTime} · {art.publishedDate}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => onRemoveSaved(art.id)}
                    aria-label="Remove from reading list"
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onSelectArticle(art.slug);
                      onClose();
                    }}
                    className="p-1.5 text-gray-700 hover:text-red-600 rounded-md cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-2">
              <p className="font-editorial text-base font-bold text-gray-800">
                No saved breakdowns yet
              </p>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Click the bookmark icon on any article card to save it to your personal reading list.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
