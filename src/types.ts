export type Category = 'All' | 'Brand Stories' | 'Marketing' | 'Digital' | 'Business' | 'Gen Z';

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  pullQuote?: string;
  callout?: {
    title: string;
    text: string;
  };
  bulletPoints?: string[];
}

export interface ArticleReference {
  title: string;
  source: string;
  year?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Brand Stories' | 'Marketing' | 'Digital' | 'Business' | 'Gen Z';
  author: string;
  authorRole: string;
  publishedDate: string;
  readingTime: string;
  image: string;
  fallbackGradient: string;
  brandName?: string;
  summary: string;
  sections: ArticleSection[];
  keyTakeaways: string[];
  marketingLessons: string[];
  references: ArticleReference[];
  tags: string[];
  isFeatured?: boolean;
}

export interface BrandInfo {
  id: string;
  name: string;
  industry: string;
  tagline: string;
  description: string;
  keyStrategy: string;
  primaryColor: string;
  associatedArticleSlugs: string[];
  foundedYear: string;
  origin: string;
}
