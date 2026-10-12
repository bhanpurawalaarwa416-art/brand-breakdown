import React, { useState } from 'react';
import { Search, Bookmark, Menu, X } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  currentTab: string;
  onNavigate: (path: string, categoryFilter?: Category) => void;
  onOpenSearch: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  savedCount,
  onOpenSaved,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (path: string, cat?: Category) => {
    onNavigate(path, cat);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/95 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
              title="Brand Breakdown Home"
            >
              <span className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 group-hover:text-red-600 transition-colors">
                Brand Breakdown
              </span>
              <span className="w-2 h-2 rounded-full bg-red-600 self-baseline mt-2.5 transition-transform group-hover:scale-125" />
            </a>
          </div>

          {/* Zone 2: Navigation Links with explicit anchor text & clean URLs */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-gray-700">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'home' ? 'text-red-600 font-bold' : ''
              }`}
              title="Home — All Brand Stories & Case Studies"
            >
              Home
            </a>
            <a
              href="/brands"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/brands');
              }}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'brands' ? 'text-red-600 font-bold' : ''
              }`}
              title="Popular Brand Directory & Playbooks"
            >
              Brands
            </a>
            <a
              href="/category/marketing"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/category/marketing', 'Marketing');
              }}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'category-marketing' ? 'text-red-600 font-bold' : ''
              }`}
              title="Marketing Tactics & Case Studies"
            >
              Marketing
            </a>
            <a
              href="/category/business"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/category/business', 'Business');
              }}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'category-business' ? 'text-red-600 font-bold' : ''
              }`}
              title="Business Models & Quick Commerce"
            >
              Business
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/about');
              }}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'about' ? 'text-red-600 font-bold' : ''
              }`}
              title="About Brand Breakdown BBA Digital Business Project"
            >
              About
            </a>
          </nav>

          {/* Zone 3: Actions with descriptive Anchor Text */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              aria-label="Search all brand breakdowns and articles"
              className="p-2 sm:px-3 sm:py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100/80 rounded-lg transition-colors flex items-center gap-2 cursor-pointer border border-transparent hover:border-gray-200"
            >
              <Search className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] text-gray-400 bg-gray-100 rounded border border-gray-200">
                /
              </kbd>
            </button>

            <button
              onClick={onOpenSaved}
              aria-label="View saved reading list"
              className="relative p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100/80 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4 text-gray-600" />
              <span className="hidden sm:inline">Saved</span>
              {savedCount > 0 && (
                <span className="w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              <span className="sr-only">Toggle Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu with clean links and anchor text */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-[#FAFAFA] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-1 gap-1">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/');
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                currentTab === 'home' ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              Home
            </a>
            <a
              href="/brands"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/brands');
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                currentTab === 'brands' ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              Brands
            </a>
            <a
              href="/category/marketing"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/category/marketing', 'Marketing');
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Marketing
            </a>
            <a
              href="/category/business"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/category/business', 'Business');
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Business
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/about');
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                currentTab === 'about' ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              About
            </a>
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 py-2.5 px-3 rounded-lg bg-gray-100 w-full justify-center"
            >
              <Search className="w-4 h-4 text-gray-600" />
              <span>Search All Breakdowns</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
