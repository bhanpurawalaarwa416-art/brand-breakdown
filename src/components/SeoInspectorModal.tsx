import React, { useState } from 'react';
import { X, KeyRound, Globe, FileText, Check, Copy } from 'lucide-react';
import { PAGE_SEO } from '../data/pageSeo';
import { ARTICLES } from '../data/articles';

interface SeoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPage: (path: string) => void;
}

export const SeoInspectorModal: React.FC<SeoInspectorModalProps> = ({
  isOpen,
  onClose,
  onNavigateToPage,
}) => {
  const [filter, setFilter] = useState<'all' | 'static' | 'articles'>('all');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(id);
      setTimeout(() => setCopiedKey(null), 2000);
    }
  };

  const staticEntries = Object.entries(PAGE_SEO).map(([id, seo]) => ({
    id,
    type: 'Static Page',
    path: seo.canonicalPath,
    title: seo.metaTitle,
    mainKeyword: seo.mainKeyword,
    relatedKeywords: seo.relatedKeywords,
    description: seo.metaDescription,
  }));

  const articleEntries = ARTICLES.map((art) => ({
    id: art.slug,
    type: 'Article Breakdown',
    path: art.seo.canonicalPath,
    title: art.seo.metaTitle,
    mainKeyword: art.seo.mainKeyword,
    relatedKeywords: art.seo.relatedKeywords,
    description: art.seo.metaDescription,
  }));

  const allEntries =
    filter === 'static'
      ? staticEntries
      : filter === 'articles'
      ? articleEntries
      : [...staticEntries, ...articleEntries];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-gray-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold">
              <KeyRound className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-editorial text-lg font-bold text-gray-950">
                SEO Keywords &amp; URL Architecture Directory
              </h3>
              <p className="text-xs text-gray-500">
                Main keyword, 2 related keywords, and unique URL metadata per page
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-6 py-3 border-b border-gray-100 bg-white flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              filter === 'all' ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Pages ({staticEntries.length + articleEntries.length})
          </button>
          <button
            onClick={() => setFilter('static')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              filter === 'static' ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Core Pages ({staticEntries.length})
          </button>
          <button
            onClick={() => setFilter('articles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
              filter === 'articles' ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Article Pages ({articleEntries.length})
          </button>
        </div>

        {/* Directory Table / Grid */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {allEntries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-red-50 text-red-700">
                    {entry.type}
                  </span>
                  <a
                    href={entry.path}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToPage(entry.path);
                      onClose();
                    }}
                    className="font-mono text-xs font-bold text-gray-900 hover:text-red-600 flex items-center gap-1"
                  >
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    <span>{entry.path}</span>
                  </a>
                </div>

                <button
                  onClick={() => handleCopy(`${entry.path} | ${entry.mainKeyword}`, entry.id)}
                  className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 cursor-pointer"
                  title="Copy SEO Summary"
                >
                  {copiedKey === entry.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600 font-bold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Title & Description */}
              <div>
                <p className="text-xs font-bold text-gray-900">
                  <span className="text-gray-400 font-normal">Page Title: </span>
                  {entry.title}
                </p>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  <span className="text-gray-400 font-normal">Meta Description: </span>
                  {entry.description}
                </p>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <div>
                  <span className="font-semibold text-gray-700">Main Keyword: </span>
                  <span className="text-red-700 font-bold bg-white px-2 py-0.5 rounded border border-red-200">
                    &ldquo;{entry.mainKeyword}&rdquo;
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">2 Related Keywords: </span>
                  <span className="italic text-gray-800">
                    &ldquo;{entry.relatedKeywords[0]}&rdquo;, &ldquo;{entry.relatedKeywords[1]}&rdquo;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-950 hover:bg-gray-800 text-white text-xs font-bold rounded-lg cursor-pointer"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
