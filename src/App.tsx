import React, { useState, useEffect, useMemo } from 'react';
import { ARTICLES } from './data/articles';
import { BRANDS } from './data/brands';
import { Category, Article, BrandInfo } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedBreakdown } from './components/FeaturedBreakdown';
import { CategoryFilter } from './components/CategoryFilter';
import { ArticleCard } from './components/ArticleCard';
import { BrandDirectory } from './components/BrandDirectory';
import { ArticleDetail } from './components/ArticleDetail';
import { AboutPage } from './components/AboutPage';
import { SearchModal } from './components/SearchModal';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { VercelGuideModal } from './components/VercelGuideModal';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { ArrowRight, Compass, Sparkles, BookOpen, Layers } from 'lucide-react';

const CATEGORIES: Category[] = [
  'All',
  'Brand Stories',
  'Marketing',
  'Digital',
  'Business',
  'Gen Z',
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'brands' | 'about'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVercelGuideOpen, setIsVercelGuideOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);

  // Saved articles in local storage
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('brand_breakdown_saved');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brand_breakdown_saved', JSON.stringify(savedArticleIds));
    } catch {
      // storage unavailable
    }
  }, [savedArticleIds]);

  // URL sync & history support
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;

      if (path.startsWith('/articles/')) {
        const slug = path.replace('/articles/', '').replace(/\/$/, '');
        if (slug) {
          setActiveArticleSlug(slug);
          return;
        }
      }

      if (hash.startsWith('#article=')) {
        const slug = hash.replace('#article=', '');
        if (slug) {
          setActiveArticleSlug(slug);
          return;
        }
      }

      if (hash === '#brands' || path === '/brands') {
        setCurrentTab('brands');
        setActiveArticleSlug(null);
      } else if (hash === '#about' || path === '/about') {
        setCurrentTab('about');
        setActiveArticleSlug(null);
      } else {
        setActiveArticleSlug(null);
        setCurrentTab('home');
      }
    };

    handlePopState();
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSelectArticle = (slug: string) => {
    setActiveArticleSlug(slug);
    window.history.pushState(null, '', `/articles/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromArticle = () => {
    setActiveArticleSlug(null);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: string, categoryFilter?: Category) => {
    setActiveArticleSlug(null);
    if (tab === 'brands') {
      setCurrentTab('brands');
      window.history.pushState(null, '', '#brands');
    } else if (tab === 'about') {
      setCurrentTab('about');
      window.history.pushState(null, '', '#about');
    } else {
      setCurrentTab('home');
      window.history.pushState(null, '', '/');
      if (categoryFilter) {
        setSelectedCategory(categoryFilter);
      }
    }
  };

  const toggleSaveArticle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedArticleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Active article data
  const currentArticle = useMemo(() => {
    if (!activeArticleSlug) return null;
    return ARTICLES.find((a) => a.slug === activeArticleSlug) || ARTICLES[0];
  }, [activeArticleSlug]);

  // Featured article (Zomato)
  const featuredArticle = useMemo(() => {
    return ARTICLES.find((a) => a.slug === 'zomato-brand-experience') || ARTICLES[0];
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      All: ARTICLES.length,
      'Brand Stories': 0,
      Marketing: 0,
      Digital: 0,
      Business: 0,
      'Gen Z': 0,
    };
    ARTICLES.forEach((art) => {
      if (counts[art.category] !== undefined) {
        counts[art.category]++;
      }
    });
    return counts;
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return ARTICLES;
    return ARTICLES.filter((art) => art.category === selectedCategory);
  }, [selectedCategory]);

  // Related articles for current article
  const relatedArticles = useMemo(() => {
    if (!currentArticle) return [];
    return ARTICLES.filter(
      (a) => a.id !== currentArticle.id && (a.category === currentArticle.category || a.brandName)
    ).slice(0, 3);
  }, [currentArticle]);

  // Saved articles objects
  const savedArticles = useMemo(() => {
    return ARTICLES.filter((a) => savedArticleIds.includes(a.id));
  }, [savedArticleIds]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-gray-900 selection:bg-red-600 selection:text-white">
      {/* 1. Navigation Bar */}
      <Navbar
        currentTab={activeArticleSlug ? 'articles' : currentTab}
        onSelectTab={handleSelectTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        savedCount={savedArticleIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeArticleSlug && currentArticle ? (
          /* Dedicated Article View */
          <ArticleDetail
            article={currentArticle}
            relatedArticles={relatedArticles}
            onBack={handleBackFromArticle}
            onSelectArticle={handleSelectArticle}
            isSaved={savedArticleIds.includes(currentArticle.id)}
            onToggleSave={toggleSaveArticle}
          />
        ) : currentTab === 'brands' ? (
          /* Brands Directory Page */
          <BrandDirectory
            onSelectBrandArticles={(brand) => {
              if (brand.associatedArticleSlugs.length > 0) {
                handleSelectArticle(brand.associatedArticleSlugs[0]);
              }
            }}
            onOpenArticle={handleSelectArticle}
          />
        ) : currentTab === 'about' ? (
          /* About Page */
          <AboutPage
            onExploreArticles={() => handleSelectTab('home')}
            onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
          />
        ) : (
          /* Homepage: Following the exact 10-step order */
          <div>
            {/* 2. Hero section */}
            <HeroSection
              onExploreArticles={() => {
                const el = document.getElementById('latest-breakdowns');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreBrands={() => handleSelectTab('brands')}
              onSelectArticle={handleSelectArticle}
            />

            {/* 3. Featured article */}
            <FeaturedBreakdown
              article={featuredArticle}
              onReadArticle={handleSelectArticle}
            />

            {/* 4. Latest Breakdowns & 5. Category filter */}
            <section id="latest-breakdowns" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <CategoryFilter
                categories={CATEGORIES}
                activeCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                counts={categoryCounts}
              />

              {/* 6. Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onSelect={handleSelectArticle}
                    isSaved={savedArticleIds.includes(article.id)}
                    onToggleSave={toggleSaveArticle}
                  />
                ))}
              </div>
            </section>

            {/* 7. Popular Brands Spotlight Bar */}
            <section className="py-14 bg-white border-y border-gray-200/80">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-1">
                      Brand Directory Spotlight
                    </div>
                    <h2 className="font-editorial text-2xl sm:text-3xl font-black text-gray-950">
                      Popular Brands We Break Down
                    </h2>
                  </div>
                  <button
                    onClick={() => handleSelectTab('brands')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-900 hover:text-red-600 transition-colors cursor-pointer group"
                  >
                    <span>View All 12 Brands</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
                  {BRANDS.slice(0, 6).map((brand) => (
                    <div
                      key={brand.id}
                      onClick={() => {
                        if (brand.associatedArticleSlugs.length > 0) {
                          handleSelectArticle(brand.associatedArticleSlugs[0]);
                        } else {
                          handleSelectTab('brands');
                        }
                      }}
                      className="p-4 rounded-xl bg-gray-50 hover:bg-red-50/50 border border-gray-200/80 hover:border-red-200 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="space-y-1">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white mb-2"
                          style={{ backgroundColor: brand.primaryColor }}
                        >
                          {brand.name.slice(0, 2).toUpperCase()}
                        </div>
                        <h4 className="font-editorial text-base font-bold text-gray-950 group-hover:text-red-600 transition-colors">
                          {brand.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 line-clamp-1">
                          {brand.industry}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-red-600 pt-3 group-hover:underline flex items-center gap-1">
                        Breakdown &rarr;
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. Why Brand Breakdown? Teaser */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="p-8 sm:p-12 bg-white rounded-3xl border border-gray-200/90 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-widest text-red-600 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Academic Student Publication</span>
                  </div>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-black text-gray-950 leading-tight">
                    Making marketing concepts easy and interesting through real brand stories.
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-normal max-w-2xl">
                    Brand Breakdown was created as a college project by a first-year BBA Digital Business student to bridge the gap between abstract academic marketing theories and how companies like Zomato, Nike, and Apple actually win customers in the wild.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleSelectTab('about')}
                      className="inline-flex items-center gap-2 text-sm font-bold text-gray-950 hover:text-red-600 transition-colors cursor-pointer group"
                    >
                      <span>Read the Full Editorial Story</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Project Fast Facts
                  </div>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="font-medium text-gray-500">Program:</span>
                      <span className="font-bold">BBA Digital Business</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="font-medium text-gray-500">Edition:</span>
                      <span className="font-bold">Spring 2026</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                      <span className="font-medium text-gray-500">Original Case Studies:</span>
                      <span className="font-bold text-red-600">12 Breakdowns</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-500">Coverage:</span>
                      <span className="font-bold">Indian &amp; Global Brands</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 9. Newsletter Section */}
            <Newsletter />
          </div>
        )}
      </main>

      {/* 10. Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenVercelGuide={() => setIsVercelGuideOpen(true)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      {/* Saved Articles Modal */}
      <SavedArticlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArticles={savedArticles}
        onSelectArticle={handleSelectArticle}
        onRemoveSaved={(id) => {
          setSavedArticleIds((prev) => prev.filter((item) => item !== id));
        }}
      />

      {/* Vercel & Viva Guide Modal */}
      <VercelGuideModal
        isOpen={isVercelGuideOpen}
        onClose={() => setIsVercelGuideOpen(false)}
      />
    </div>
  );
}
