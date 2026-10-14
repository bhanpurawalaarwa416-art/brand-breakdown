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

  // Update or create Meta Keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.setAttribute('name', 'keywords');
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.setAttribute('content', [seo.mainKeyword, ...seo.relatedKeywords].join(', '));

  // Update or create Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  const canonicalUrl = `${window.location.origin}${seo.canonicalPath}`;
  canonicalLink.setAttribute('href', canonicalUrl);

  // Update OpenGraph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', seo.metaTitle);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', seo.metaDescription);

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (!ogUrl) {
    ogUrl = document.createElement('meta');
    ogUrl.setAttribute('property', 'og:url');
    document.head.appendChild(ogUrl);
  }
  ogUrl.setAttribute('content', canonicalUrl);

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

  // Update Twitter tags
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', seo.metaTitle);

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', seo.metaDescription);

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
    };
  }

  schemaScript.textContent = JSON.stringify(structuredData);
}
