import React from 'react';
import { Target, Layers, GraduationCap, CheckCircle2, BookOpen, Compass, Award } from 'lucide-react';

interface AboutPageProps {
  onExploreArticles: () => void;
  onOpenVercelGuide: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onExploreArticles,
  onOpenVercelGuide,
}) => {
  const topics = [
    { title: 'Brand Strategy', desc: 'Positioning, sensory assets, and distinctive identity moats.' },
    { title: 'Digital Marketing', desc: 'Performance ad engines, omni-channel flywheels, and SEO.' },
    { title: 'Social Media', desc: 'Meme culture, real-time reactive marketing, and community banter.' },
    { title: 'Business Models', desc: 'Quick commerce, agile supply chains, and unit economics.' },
    { title: 'Consumer Behaviour', desc: 'Emotional memory, heuristics, and buying psychology.' },
    { title: 'Technology', desc: 'AI personalization, dark-store routing algorithms, and fintech.' },
    { title: 'Gen Z Trends', desc: 'Lo-fi video, ad skepticism, and authentic creator partnerships.' },
  ];

  return (
    <div className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Editorial Header */}
      <div className="space-y-4">
        <div className="text-xs font-extrabold uppercase tracking-widest text-red-600 flex items-center gap-2">
          <span>Editorial Manifest</span>
          <span aria-hidden="true">·</span>
          <span>BBA Digital Business</span>
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight text-balance">
          Why Brand Breakdown?
        </h1>
        <p className="text-xl text-gray-700 leading-relaxed font-normal pt-2">
          Brand Breakdown is a student-led digital publication created to explore the strategies behind the brands we interact with every day. From advertising and influencer marketing to customer experience and business models, we break complex ideas into simple and relatable stories.
        </p>
      </div>

      {/* Mission Section */}
      <div className="p-8 sm:p-10 bg-white rounded-2xl border border-gray-200/90 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-red-600">
          <Target className="w-5 h-5" />
          <h2 className="text-xs uppercase font-extrabold tracking-widest">
            Our Mission
          </h2>
        </div>
        <blockquote className="font-editorial text-2xl sm:text-3xl font-bold text-gray-950 leading-snug">
          &ldquo;To make marketing and business concepts easier to understand through real-world brand stories.&rdquo;
        </blockquote>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          Too often, business school textbooks present marketing concepts through abstract diagrams and outdated jargon. Brand Breakdown grounds every framework in the brands students, founders, and consumers experience daily—from Zomato notifications to Zara supply runs.
        </p>
      </div>

      {/* What We Cover */}
      <div className="space-y-6">
        <div>
          <h2 className="font-editorial text-3xl font-black text-gray-950">
            What We Cover
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Core subject pillars explored across our editorial case studies
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-white rounded-xl border border-gray-200/90 shadow-xs flex items-start gap-3.5"
            >
              <div className="w-6 h-6 rounded-md bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                0{idx + 1}
              </div>
              <div className="space-y-0.5">
                <h3 className="font-editorial text-base font-bold text-gray-950">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Built as a BBA Digital Business Project */}
      <div className="p-8 sm:p-10 bg-gray-900 text-white rounded-2xl border border-gray-900 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-editorial text-2xl font-bold text-white">
              Built as a BBA Digital Business Project
            </h2>
            <p className="text-xs text-gray-400">
              Academic Rationale &amp; Curriculum Alignment
            </p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
          This digital publication was designed, developed, and authored as a capstone academic deliverable by a first-year Bachelor of Business Administration (BBA) Digital Business student.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700/80 space-y-1">
            <p className="text-xs font-bold uppercase text-red-400">Market Analysis</p>
            <p className="text-xs text-gray-300">
              Synthesizing secondary research from financial disclosures, WARC, and Harvard Business Review.
            </p>
          </div>
          <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700/80 space-y-1">
            <p className="text-xs font-bold uppercase text-red-400">Digital Publishing</p>
            <p className="text-xs text-gray-300">
              Mastering responsive content architecture, SEO metadata, and user experience for modern readers.
            </p>
          </div>
          <div className="p-4 bg-gray-800/80 rounded-xl border border-gray-700/80 space-y-1">
            <p className="text-xs font-bold uppercase text-red-400">Viva-Ready Knowledge</p>
            <p className="text-xs text-gray-300">
              Structured to clearly defend brand frameworks, marketing ROI, and omnichannel strategies during university evaluations.
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-gray-800">
          <button
            onClick={onExploreArticles}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Explore All 12 Breakdowns
          </button>
          <button
            onClick={onOpenVercelGuide}
            className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
          >
            View Vercel &amp; Local Setup Guide
          </button>
        </div>
      </div>
    </div>
  );
};
