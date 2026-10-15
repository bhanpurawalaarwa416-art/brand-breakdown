import { SeoMetadata } from '../types';

export interface SeoContext {
  type?: 'WebSite' | 'CollectionPage' | 'Article';
  image?: string;
  article?: {
    title: string;
    description: string;
    image: string;
    publishedDate: string;
    author: string;
    brandName?: string;
  };
}

export function updatePageSeo(seo: SeoMetadata, context?: SeoContext) {
  // Update Title
  document.title = seo.metaTitle;

  // Update or create Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seo.metaDescription);

  // Modern SEO best practice: Google does not use meta keywords for ranking.
  // Remove any legacy meta keywords tags to comply with guidelines.
  const existingKeywords = document.querySelector('meta[name="keywords"]');
  if (existingKeywords && existingKeywords.parentNode) {
    existingKeywords.parentNode.removeChild(existingKeywords);
  }

  // Update or create Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  const canonicalUrl = `${window.location.origin}${seo.canonicalPath}`;
  canonicalLink.setAttribute('href', canonicalUrl);

  // Update or create OpenGraph tags
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', seo.metaTitle);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', seo.metaDescription);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', canonicalUrl);

  let ogType = document.querySelector('meta[property="og:type"]');
  if (!ogType) {
    ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    document.head.appendChild(ogType);
  }
  ogType.setAttribute('content', context?.type === 'Article' ? 'article' : 'website');

  let ogSiteName = document.querySelector('meta[property="og:site_name"]');
  if (!ogSiteName) {
    ogSiteName = document.createElement('meta');
    ogSiteName.setAttribute('property', 'og:site_name');
    document.head.appendChild(ogSiteName);
  }
  ogSiteName.setAttribute('content', 'Brand Breakdown');

  // Update or create OpenGraph & Twitter Images
  const imageUrl = context?.image || context?.article?.image;
  if (imageUrl) {
    const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `${window.location.origin}${imageUrl}`;
    
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (!ogImg) {
      ogImg = document.createElement('meta');
      ogImg.setAttribute('property', 'og:image');
      document.head.appendChild(ogImg);
    }
    ogImg.setAttribute('content', fullImageUrl);

    let twitterImg = document.querySelector('meta[name="twitter:image"]');
    if (!twitterImg) {
      twitterImg = document.createElement('meta');
      twitterImg.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImg);
    }
    twitterImg.setAttribute('content', fullImageUrl);
  }

  // Update or create Twitter tags
  let twitterCard = document.querySelector('meta[name="twitter:card"]');
  if (!twitterCard) {
    twitterCard = document.createElement('meta');
    twitterCard.setAttribute('name', 'twitter:card');
    document.head.appendChild(twitterCard);
  }
  twitterCard.setAttribute('content', 'summary_large_image');

  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (!twitterTitle) {
    twitterTitle = document.createElement('meta');
    twitterTitle.setAttribute('name', 'twitter:title');
    document.head.appendChild(twitterTitle);
  }
  twitterTitle.setAttribute('content', seo.metaTitle);

  let twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (!twitterDesc) {
    twitterDesc = document.createElement('meta');
    twitterDesc.setAttribute('name', 'twitter:description');
    document.head.appendChild(twitterDesc);
  }
  twitterDesc.setAttribute('content', seo.metaDescription);

  // Dynamic Schema.org JSON-LD Structured Data
  let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dynamic-page-schema';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }

  let structuredData: object;
  if (context?.type === 'Article' && context.article) {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: context.article.title,
      description: seo.metaDescription,
      image: context.article.image.startsWith('http') ? context.article.image : `${window.location.origin}${context.article.image}`,
      datePublished: context.article.publishedDate,
      author: {
        '@type': 'Person',
        name: context.article.author,
        jobTitle: 'BBA Digital Business Scholar',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Brand Breakdown',
        url: window.location.origin,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      about: context.article.brandName ? {
        '@type': 'Brand',
        name: context.article.brandName,
      } : undefined,
    };
  } else if (context?.type === 'CollectionPage') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: seo.metaTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      publisher: {
        '@type': 'Organization',
        name: 'Brand Breakdown',
        url: window.location.origin,
      },
    };
  } else {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Brand Breakdown',
      headline: seo.metaTitle,
      description: seo.metaDescription,
      url: canonicalUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/?search={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Brand Breakdown',
        url: window.location.origin,
      },
    };
  }

  schemaScript.textContent = JSON.stringify(structuredData);
}
