import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, ArrowUpRight } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string, categoryFilter?: Category) => void;
  onOpenSearch: () => void;
  savedCount: number;
  onOpenSaved: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSearch,
  savedCount,
  onOpenSaved,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string, cat?: Category) => {
    onSelectTab(tab, cat);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAFA]/95 backdrop-blur-md border-b border-gray-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left group flex items-center gap-2 cursor-pointer focus:outline-none"
            >
              <span className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 group-hover:text-red-600 transition-colors">
                Brand Breakdown
              </span>
              <span className="w-2 h-2 rounded-full bg-red-600 self-baseline mt-2.5 transition-transform group-hover:scale-125" />
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-gray-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'home' ? 'text-red-600 font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('brands')}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'brands' ? 'text-red-600 font-bold' : ''
              }`}
            >
              Brands
            </button>
            <button
              onClick={() => handleNavClick('home', 'Marketing')}
              className="transition-colors hover:text-red-600 cursor-pointer"
            >
              Marketing
            </button>
            <button
              onClick={() => handleNavClick('home', 'Business')}
              className="transition-colors hover:text-red-600 cursor-pointer"
            >
              Business
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`transition-colors hover:text-red-600 cursor-pointer ${
                currentTab === 'about' ? 'text-red-600 font-bold' : ''
              }`}
            >
              About
            </button>
          </nav>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSearch}
              aria-label="Search articles and brands"
              className="p-2 sm:px-3 sm:py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-100/80 rounded-lg transition-colors flex items-center gap-2 cursor-pointer border border-transparent hover:border-gray-200"
            >
              <Search className="w-4 h-4 text-gray-600" />
              <span className="hidden sm:inline text-xs font-semibold text-gray-500">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] text-gray-400 bg-gray-100 rounded border border-gray-200">
                /
              </kbd>
            </button>

            <button
              onClick={onOpenSaved}
              aria-label="Saved reading list"
              className="relative p-2 text-gray-700 hover:text-red-600 hover:bg-gray-100/80 rounded-lg transition-colors cursor-pointer"
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4 text-gray-600" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-[#FAFAFA] px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-1 gap-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                currentTab === 'home' ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('brands')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                currentTab === 'brands' ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              Brands
            </button>
            <button
              onClick={() => handleNavClick('home', 'Marketing')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Marketing
            </button>
            <button
              onClick={() => handleNavClick('home', 'Business')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-100 cursor-pointer"
            >
              Business
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold cursor-pointer ${
                currentTab === 'about' ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              About
            </button>
          </div>

          <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="flex items-center gap-2 text-sm font-semibold text-gray-700 py-2 px-3 rounded-lg bg-gray-100 w-full justify-center"
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
