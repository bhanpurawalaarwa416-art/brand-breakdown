import { SeoMetadata } from '../types';

export const PAGE_SEO: Record<string, SeoMetadata> = {
  home: {
    canonicalPath: '/',
    mainKeyword: 'brand marketing strategies',
    relatedKeywords: ['digital marketing case studies', 'business marketing breakdowns'],
    metaTitle: 'Brand Marketing Strategies & Stories | Brand Breakdown',
    metaDescription: 'Discover brand marketing strategies and case studies behind iconic companies like Nike, Zomato, and Apple in our student-led digital business publication.',
  },
  brands: {
    canonicalPath: '/brands',
    mainKeyword: 'brand strategy directory',
    relatedKeywords: ['popular brand case studies', 'iconic company playbooks'],
    metaTitle: 'Brand Strategy Directory & Case Studies | Brand Breakdown',
    metaDescription: 'Explore our brand strategy directory featuring in-depth marketing playbooks for Zomato, Nike, Swiggy, Zepto, Blinkit, Coca-Cola, Adidas, Netflix, and Apple.',
  },
  about: {
    canonicalPath: '/about',
    mainKeyword: 'BBA digital business marketing blog',
    relatedKeywords: ['brand breakdown student publication', 'practical marketing case studies'],
    metaTitle: 'About Brand Breakdown: Student Marketing Publication',
    metaDescription: 'Learn about Brand Breakdown, a BBA digital business marketing blog by student Arwa B. explaining brand strategies, consumer psychology, and market moats.',
  },
  'category-brand-stories': {
    canonicalPath: '/category/brand-stories',
    mainKeyword: 'brand storytelling case studies',
    relatedKeywords: ['brand identity strategy', 'emotional branding examples'],
    metaTitle: 'Brand Storytelling Case Studies | Brand Breakdown',
    metaDescription: 'Read brand storytelling case studies analyzing how Nike, Starbucks, Apple, Nykaa, and Adidas forge emotional identity to turn products into cultural movements.',
  },
  'category-marketing': {
    canonicalPath: '/category/marketing',
    mainKeyword: 'emotional marketing campaigns',
    relatedKeywords: ['distinctive brand assets', 'Share a Coke campaign psychology'],
    metaTitle: 'Emotional Marketing Campaigns & Tactics | Brand Breakdown',
    metaDescription: 'Explore emotional marketing campaigns, distinctive brand assets, and psychological triggers that turn everyday consumer brands into unforgettable market icons.',
  },
  'category-digital': {
    canonicalPath: '/category/digital',
    mainKeyword: 'digital super-app marketing',
    relatedKeywords: ['hyperlocal consumer convenience', 'algorithmic recommendation marketing'],
    metaTitle: 'Digital Super-App Marketing & Platforms | Brand Breakdown',
    metaDescription: 'Discover digital super-app marketing from Swiggy multi-service convenience ecosystem to Netflix machine-learning recommendation engines and streaming trends.',
  },
  'category-business': {
    canonicalPath: '/category/business',
    mainKeyword: 'retail business model case studies',
    relatedKeywords: ['quick commerce dark store economics', 'fast fashion agile supply chain'],
    metaTitle: 'Retail Business Model Case Studies | Brand Breakdown',
    metaDescription: 'Analyze retail business model case studies from Inditex Zara agile supply chains to Blinkit 10-minute micro-warehouse dark-store unit economics in India.',
  },
  'category-gen-z': {
    canonicalPath: '/category/gen-z',
    mainKeyword: 'Gen Z consumer marketing',
    relatedKeywords: ['10 minute grocery delivery marketing', 'youth culture brand strategy'],
    metaTitle: 'Gen Z Consumer Marketing & Playbooks | Brand Breakdown',
    metaDescription: 'Explore Gen Z consumer marketing strategies: how Zepto sub-90-second dark stores, purple aesthetic, and meme banter captured young urban Indian shoppers.',
  },
};
