import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Share2,
  Bookmark,
  Check,
  BookOpen,
  Lightbulb,
  FileText,
  KeyRound,
  HelpCircle,
  Sparkles,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { Article } from '../types';
import { ArticleCard } from './ArticleCard';

interface ArticleDetailProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  isSaved?: boolean;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  relatedArticles,
  onBack,
  onSelectArticle,
  isSaved = false,
  onToggleSave,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(article.image);
  const [imgError, setImgError] = useState(false);
  const [hasRetried, setHasRetried] = useState(false);

  useEffect(() => {
    setCurrentSrc(article.image);
    setImgError(false);
    setHasRetried(false);
  }, [article.image]);

  const handleImageError = () => {
    if (!hasRetried) {
      setHasRetried(true);
      if (currentSrc.includes('/src/assets/images/')) {
        setCurrentSrc(currentSrc.replace('/src/assets/images/', '/images/'));
      } else if (currentSrc.startsWith('/images/')) {
        setCurrentSrc(currentSrc.replace('/images/', '/src/assets/images/'));
      } else {
        setImgError(true);
      }
    } else {
      setImgError(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = totalScroll / windowHeight;
      setScrollProgress(Math.min(100, Math.max(0, scroll * 100)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="min-h-screen pb-20">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-red-600 z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Back and Action Navigation Bar with descriptive Anchor Text */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 sticky top-18 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-700 hover:text-red-600 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to All Breakdowns</span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Copy shareable link"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share Story</span>
                </>
              )}
            </button>

            {onToggleSave && (
              <button
                onClick={(e) => onToggleSave(article.id, e)}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                title={isSaved ? 'Remove from reading list' : 'Save to reading list'}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{isSaved ? 'Saved' : 'Save Article'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SEO & AEO Metadata Bar (Transparency for Evaluation & Search Engines) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6">
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200/70 pb-2">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-red-600 text-[11px]">
              <KeyRound className="w-3.5 h-3.5" />
              <span>SEO Keywords &amp; URL Architecture</span>
            </div>
            <code className="text-[11px] bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-700 font-mono">
              {article.seo.canonicalPath}
            </code>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 pt-1">
            <div>
              <span className="font-semibold text-gray-900">Main Keyword: </span>
              <span className="text-red-700 font-bold bg-red-50 px-1.5 py-0.5 rounded">
                &ldquo;{article.seo.mainKeyword}&rdquo;
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-900">Related Keywords: </span>
              <span className="italic text-gray-700">
                &ldquo;{article.seo.relatedKeywords[0]}&rdquo;, &ldquo;{article.seo.relatedKeywords[1]}&rdquo;
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-8 space-y-6">
        {/* Category & Date Metadata */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600">
          <a
            href={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={(e) => e.preventDefault()}
            className="text-red-600 uppercase tracking-widest font-extrabold hover:underline"
          >
            {article.category}
          </a>
          <span aria-hidden="true">·</span>
          <span>{article.publishedDate}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-black text-gray-950 tracking-tight leading-[1.12] text-balance">
          {article.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal">
          {article.subtitle}
        </p>

        {/* Author Bylines */}
        <div className="pt-4 border-t border-gray-200/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 text-white font-editorial font-bold flex items-center justify-center text-sm shadow-xs">
              AB
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{article.author}</p>
              <p className="text-xs text-gray-500">{article.authorRole}</p>
            </div>
          </div>
          <div className="text-xs text-gray-400 font-medium hidden sm:block">
            BBA Digital Business Project Series
          </div>
        </div>
      </header>

      {/* Optimized Media Element: Compact image with descriptive alt text and lazy loading */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
        <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[16/9] max-h-[460px] shadow-sm border border-gray-200">
          {!imgError ? (
            <img
              src={currentSrc}
              alt={article.imageAlt}
              loading="lazy"
              decoding="async"
              width="960"
              height="540"
              onError={handleImageError}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div
              className={`w-full h-full bg-gradient-to-br ${article.fallbackGradient} flex flex-col justify-center items-center p-8 text-white text-center`}
            >
              <span className="text-xs uppercase tracking-widest font-extrabold opacity-75">
                Brand Breakdown Case Study
              </span>
              <h2 className="font-editorial text-3xl font-black mt-2 max-w-xl">
                {article.title}
              </h2>
            </div>
          )}
        </div>
        <p className="text-xs font-serif text-gray-500 italic mt-2.5 text-center">
          Fig. 1 — {article.imageAlt}.
        </p>
      </div>

      {/* Article Content Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="prose-editorial mx-auto">
          {article.sections.map((section, idx) => (
            <section key={idx} className="mb-10">
              {section.heading && (
                <div className="space-y-3">
                  <h2 className="flex items-baseline gap-2">
                    {section.isAeoQuestion && (
                      <span className="inline-block text-xs uppercase tracking-widest font-extrabold px-2 py-0.5 rounded bg-red-100 text-red-700 mr-2 align-middle font-sans">
                        AEO Q&amp;A
                      </span>
                    )}
                    <span>{section.heading}</span>
                  </h2>

                  {/* AEO Direct Answer Block for rapid Answer Engine extraction */}
                  {section.isAeoQuestion && section.directAnswer && (
                    <div className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl my-4 text-sm sm:text-base text-gray-800 leading-relaxed font-medium">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block mb-1">
                        Direct Answer Summary:
                      </span>
                      {section.directAnswer}
                    </div>
                  )}
                </div>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className={
                    idx === 0 && pIdx === 0
                      ? 'first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-red-600'
                      : ''
                  }
                >
                  {para}
                </p>
              ))}

              {/* Styled Pull Quote */}
              {section.pullQuote && (
                <blockquote>
                  &ldquo;{section.pullQuote}&rdquo;
                </blockquote>
              )}

              {/* Callout box */}
              {section.callout && (
                <div className="my-8 p-5 bg-red-50/70 border border-red-200/80 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                    <Lightbulb className="w-4 h-4" />
                    <span>{section.callout.title}</span>
                  </div>
                  <p className="text-sm text-gray-800 leading-relaxed font-normal">
                    {section.callout.text}
                  </p>
                </div>
              )}

              {/* Bullet points if any */}
              {section.bulletPoints && (
                <ul className="list-disc pl-5 space-y-2 text-gray-800 text-sm sm:text-base">
                  {section.bulletPoints.map((bp, bIdx) => (
                    <li key={bIdx}>{bp}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Section: Key Takeaways (3-5 concise bullets) */}
        <div className="mt-14 p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl font-bold text-gray-950">
                Key Takeaways
              </h2>
              <p className="text-xs text-gray-500">
                Core strategic principles from this breakdown
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-950 text-xs font-bold flex items-center justify-center mt-0.5">
                  {idx + 1}
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Section: What Marketers Can Learn (3-4 practical lessons) */}
        <div className="mt-8 p-6 sm:p-8 bg-gray-900 text-white rounded-2xl border border-gray-900 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 border-b border-gray-800 pb-4">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-editorial text-2xl font-bold text-white">
                What Marketers Can Learn
              </h2>
              <p className="text-xs text-gray-400">
                Actionable tactics for students, creators &amp; growth teams
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.marketingLessons.map((lesson, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-gray-800/80 border border-gray-700/80 space-y-1.5"
              >
                <div className="text-xs font-extrabold uppercase tracking-wider text-red-400">
                  Lesson 0{idx + 1}
                </div>
                <p className="text-sm text-gray-200 leading-relaxed font-normal">
                  {lesson}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Sources & References with verified outbound links */}
        <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-gray-600">
            <FileText className="w-4 h-4 text-red-600" />
            <span>Academic Sources &amp; Industry Outbound References</span>
          </div>
          <div className="space-y-2">
            {article.references.map((ref, idx) => (
              <div
                key={idx}
                className="text-xs text-gray-600 flex items-baseline gap-2 border-b border-gray-200/50 pb-2 last:border-b-0 last:pb-0"
              >
                <span className="font-bold text-gray-400">[{idx + 1}]</span>
                {ref.url ? (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-600 hover:underline inline-flex items-center gap-1 group text-gray-700"
                    title={`Read external research on "${ref.title}" from ${ref.source}`}
                  >
                    <strong className="text-gray-900 group-hover:text-red-600 font-semibold">{ref.title}</strong>
                    <span className="text-gray-500">— {ref.source} {ref.year && `(${ref.year})`}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-red-500 inline-block opacity-75 group-hover:opacity-100" />
                  </a>
                ) : (
                  <span>
                    <strong className="text-gray-800">{ref.title}</strong> — {ref.source}{' '}
                    {ref.year && `(${ref.year})`}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Author Academic Badge */}
        <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-red-600 text-white font-editorial text-xl font-bold flex items-center justify-center shadow-xs shrink-0">
            BB
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-editorial text-base font-bold text-gray-950">
              Published by Brand Breakdown Editorial Team
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Researched and authored by first-year BBA Digital Business students exploring market dynamics, brand positioning, and consumer psychology.
            </p>
          </div>
        </div>

        {/* Section: Read Next (3 Related Articles with descriptive anchor links) */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-gray-950">
                  Read Next
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Continue exploring related marketing &amp; business strategies
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <ArticleCard
                  key={rel.id}
                  article={rel}
                  onSelect={onSelectArticle}
                  isSaved={false}
                />
              ))}
            </div>

            {/* Contextual Internal Links with Descriptive Anchor Text */}
            <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-gray-600">
              <a
                href={`/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', `/category/${article.category.toLowerCase().replace(/\s+/g, '-')}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-red-600 hover:underline flex items-center gap-1.5"
                title={`Explore more ${article.category} marketing breakdowns`}
              >
                <span>Browse More {article.category} Case Studies</span>
                <Compass className="w-3.5 h-3.5 text-red-600" />
              </a>

              <a
                href="/brands"
                onClick={(e) => {
                  e.preventDefault();
                  window.history.pushState(null, '', '/brands');
                  window.dispatchEvent(new PopStateEvent('popstate'));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-red-600 hover:underline flex items-center gap-1.5"
                title="View all 12 company profiles in the Brand Strategy Directory"
              >
                <span>View All 12 Playbooks in the Brand Directory</span>
                <Compass className="w-3.5 h-3.5 text-gray-500" />
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
