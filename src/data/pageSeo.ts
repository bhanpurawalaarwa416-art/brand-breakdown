import { SeoMetadata } from '../types';

export const PAGE_SEO: Record<string, SeoMetadata> = {
  home: {
    canonicalPath: '/',
    mainKeyword: 'Brand case studies',
    relatedKeywords: ['Brand marketing strategies', 'Marketing case studies'],
    metaTitle: 'Brand Case Studies & Marketing Strategies | Brand Breakdown',
    metaDescription: 'Explore in-depth brand case studies, marketing case studies, and brand marketing strategies behind iconic companies like Nike, Zomato, Apple, and Swiggy.',
  },
  brands: {
    canonicalPath: '/brands',
    mainKeyword: 'Brand directory',
    relatedKeywords: ['Brand case studies', 'Company brand analysis'],
    metaTitle: 'Brand Directory: Case Studies & Brand Analysis | Brand Breakdown',
    metaDescription: "Browse our comprehensive brand directory featuring company brand analysis and in-depth brand case studies of the world's most innovative market leaders.",
  },
  about: {
    canonicalPath: '/about',
    mainKeyword: 'About Brand Breakdown',
    relatedKeywords: ['Brand marketing insights', 'Business case studies'],
    metaTitle: 'About Brand Breakdown: Brand Marketing Insights & Case Studies',
    metaDescription: 'Learn about Brand Breakdown, a student publication sharing brand marketing insights, practical business case studies, and consumer psychology teardowns.',
  },
  'category-brand-stories': {
    canonicalPath: '/category/brand-stories',
    mainKeyword: 'brand storytelling case studies',
    relatedKeywords: ['brand identity strategy', 'emotional branding examples'],
    metaTitle: 'Brand Storytelling Case Studies & Strategy | Brand Breakdown',
    metaDescription: 'Read brand storytelling case studies analyzing how Nike, Starbucks, Apple, and Nykaa forge emotional identity to turn products into cultural movements.',
  },
  'category-marketing': {
    canonicalPath: '/category/marketing',
    mainKeyword: 'emotional marketing campaigns',
    relatedKeywords: ['distinctive brand assets', 'brand positioning strategy'],
    metaTitle: 'Marketing Campaigns & Positioning Teardowns | Brand Breakdown',
    metaDescription: 'Explore marketing campaigns, distinctive brand assets, and brand positioning tactics that turn consumer brands like Coca-Cola into market icons.',
  },
  'category-digital': {
    canonicalPath: '/category/digital',
    mainKeyword: 'digital super-app marketing',
    relatedKeywords: ['hyperlocal consumer convenience', 'algorithmic recommendation marketing'],
    metaTitle: 'Digital Super-App Marketing & Streaming Models | Brand Breakdown',
    metaDescription: 'Discover digital marketing strategies from Swiggy multi-service convenience ecosystem to Netflix machine-learning personalization and streaming trends.',
  },
  'category-business': {
    canonicalPath: '/category/business',
    mainKeyword: 'retail business model case studies',
    relatedKeywords: ['quick commerce dark store economics', 'fast fashion agile supply chain'],
    metaTitle: 'Business Models & Supply Chain Case Studies | Brand Breakdown',
    metaDescription: 'Analyze retail business models and supply chain strategy from Zara agile apparel logistics to Blinkit 10-minute micro-warehouse dark-store economics.',
  },
  'category-gen-z': {
    canonicalPath: '/category/gen-z',
    mainKeyword: 'Gen Z consumer marketing',
    relatedKeywords: ['10 minute grocery delivery marketing', 'youth culture brand strategy'],
    metaTitle: 'Gen Z Marketing Strategy & Quick Commerce | Brand Breakdown',
    metaDescription: 'Explore Gen Z marketing strategies: how Zepto 10-minute quick commerce, purple aesthetic, and meme banter captured young urban Indian shoppers.',
  },
};
