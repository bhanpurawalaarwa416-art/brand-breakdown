import React from 'react';
import { ArrowUp, Instagram, Linkedin, Twitter, Code2, GraduationCap } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectTab: (tab: string, categoryFilter?: Category) => void;
  onOpenVercelGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenVercelGuide }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-editorial text-2xl font-black text-gray-950">
                Brand Breakdown
              </span>
              <span className="w-2 h-2 rounded-full bg-red-600" />
            </div>

            <p className="font-editorial text-base italic text-gray-600 max-w-sm">
              &ldquo;Behind every great brand is a strategy. Let&apos;s break it down.&rdquo;
            </p>

            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              A student-led digital publication exploring branding, marketing frameworks, consumer behavior, and business models for modern learners and marketing enthusiasts.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-red-50 hover:text-red-600 text-gray-700 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium text-gray-600">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('brands')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Brands
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('home', 'Marketing')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Marketing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('home', 'Business')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-red-600 transition-colors cursor-pointer"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Project Credits & Deployment Guide Action */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-red-600" />
              <span>Project Evaluation</span>
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Developed as a First-Year BBA Digital Business semester project evaluating digital branding, content marketing, and modern frontend application development.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenVercelGuide}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-red-600" />
                <span>Vercel Deploy &amp; Run Guide</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Copyright & Scroll to Top */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 Brand Breakdown. Created as a BBA Digital Business project.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-gray-600 hover:text-red-600 font-semibold cursor-pointer group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
