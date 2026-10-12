import { SeoMetadata } from '../types';

export const PAGE_SEO: Record<string, SeoMetadata> = {
  home: {
    canonicalPath: '/',
    mainKeyword: 'brand marketing strategies',
    relatedKeywords: ['digital marketing blog', 'business case studies'],
    metaTitle: 'Brand Marketing Strategies & Stories | Brand Breakdown',
    metaDescription: 'Discover how iconic brands win customers through marketing, storytelling, and digital strategy in our student-led business publication.'
  },
  brands: {
    canonicalPath: '/brands',
    mainKeyword: 'popular brand case studies',
    relatedKeywords: ['brand strategy directory', 'iconic company breakdowns'],
    metaTitle: 'Popular Brand Case Studies & Directory | Brand Breakdown',
    metaDescription: 'Explore in-depth business playbooks and brand strategy breakdowns for Nike, Zomato, Starbucks, Apple, Zara, and leading innovators.'
  },
  about: {
    canonicalPath: '/about',
    mainKeyword: 'BBA digital business project',
    relatedKeywords: ['student marketing blog', 'brand breakdown mission'],
    metaTitle: 'Why Brand Breakdown? BBA Digital Project | Brand Breakdown',
    metaDescription: 'Learn about Brand Breakdown, a student-led publication by a BBA Digital Business student simplifying marketing strategies through real-world brand stories.'
  },
  'category-brand-stories': {
    canonicalPath: '/category/brand-stories',
    mainKeyword: 'brand storytelling case studies',
    relatedKeywords: ['brand identity strategies', 'emotional marketing examples'],
    metaTitle: 'Brand Storytelling Case Studies | Brand Breakdown',
    metaDescription: 'Analyze how Nike, Starbucks, Apple, and Nykaa craft emotional identities and brand storytelling to turn everyday products into cultural movements.'
  },
  'category-marketing': {
    canonicalPath: '/category/marketing',
    mainKeyword: 'digital marketing tactics',
    relatedKeywords: ['influencer marketing strategy', 'social media relevance'],
    metaTitle: 'Digital Marketing Tactics & Trends | Brand Breakdown',
    metaDescription: 'Master modern marketing tactics: influencer credibility, meme marketing, social media engagement, and psychological brand recall principles.'
  },
  'category-digital': {
    canonicalPath: '/category/digital',
    mainKeyword: 'AI in digital marketing',
    relatedKeywords: ['martech automation', 'predictive customer segmentation'],
    metaTitle: 'AI in Digital Marketing & MarTech | Brand Breakdown',
    metaDescription: 'Explore the transformation of digital marketing through artificial intelligence, dynamic creative optimization, and predictive martech analytics.'
  },
  'category-business': {
    canonicalPath: '/category/business',
    mainKeyword: 'quick commerce business models',
    relatedKeywords: ['agile retail supply chain', 'fast fashion economics'],
    metaTitle: 'Business Models & Supply Chains | Brand Breakdown',
    metaDescription: 'Unpack modern retail disruption from Inditex Zara fast-fashion velocity to 10-minute quick commerce dark stores like Blinkit and Zepto in India.'
  },
  'category-gen-z': {
    canonicalPath: '/category/gen-z',
    mainKeyword: 'Gen Z marketing trends',
    relatedKeywords: ['authentic creator economy', 'short-form video marketing'],
    metaTitle: 'Gen Z Marketing Trends & Consumer Habits | Brand Breakdown',
    metaDescription: 'Discover why Gen Z is transforming modern marketing through ad skepticism, lo-fi short-form video, ethical transparency, and participatory culture.'
  }
};
