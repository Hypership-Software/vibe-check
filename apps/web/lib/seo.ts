import type { Feature } from '@/lib/types/game';

const BASE_URL = 'https://vibe-check.cloud';
const SITE_NAME = 'Vibe Check';

export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function getWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description:
      'Open source Claude Code plugin that scans AI-generated codebases for hidden production risks across security, payments, auth, and more.',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/vibe-check-og.png`,
        width: 1200,
        height: 630,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/#check-your-app`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'vibe-check-cc',
    description:
      'CLI plugin for Claude Code that scans AI-generated codebases for hidden production risks across security, payments, auth, and more.',
    url: BASE_URL,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'macOS, Linux, Windows',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Vibe Check',
      url: 'https://github.com/KylerD/vibe-check',
    },
    softwareVersion: '1.3.0',
    downloadUrl: 'https://github.com/KylerD/vibe-check',
    screenshot: `${BASE_URL}/vibe-check-og.png`,
  };
}

export function getFaqJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function getFeatureArticleJsonLd(feature: Feature, featureContent?: {
  dangerZone?: { headline: string; hiddenComplexity: string; riskLevel: string };
  smartMove?: { recommendation: string; reasoning: string };
  didYouKnow?: { stat: string; source: string };
}) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${feature.name} — Production Readiness Guide for AI-Built Apps`,
    description: feature.shortDescription,
    url: `${BASE_URL}/features/${feature.id}`,
    image: `${BASE_URL}/vibe-check-og.png`,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/vibe-check-og.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/features/${feature.id}`,
    },
    about: {
      '@type': 'Thing',
      name: feature.name,
      description: feature.shortDescription,
    },
  };

  if (featureContent?.dangerZone) {
    jsonLd.articleBody = featureContent.dangerZone.hiddenComplexity;
  }

  return jsonLd;
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const HOME_FAQS = [
  {
    question: 'What is Vibe Check?',
    answer:
      'Vibe Check is a free, open-source toolkit for catching hidden production risks in AI-generated codebases. The CLI plugin for Claude Code scans your actual code across security, payments, authentication, and 16 other critical domains — then gives you the exact prompts to fix issues. The web app at vibe-check.cloud helps you explore what features your app needs and understand the risks involved before you start building.',
  },
  {
    question: 'What is vibe coding?',
    answer:
      'Vibe coding is the practice of building software primarily using AI coding assistants like Claude Code, Cursor, Lovable, Bolt, and v0. While these tools dramatically speed up development, they can miss critical production requirements around security, reliability, and compliance that experienced developers would catch.',
  },
  {
    question: 'How do I install the CLI plugin?',
    answer:
      'Install the Vibe Check CLI plugin by running "npx vibe-check-cc" in your terminal. This installs it as a Claude Code plugin. Then use "/vibe-check:check" within Claude Code to scan your codebase for production risks. No installation is needed for the web app — just visit vibe-check.cloud.',
  },
  {
    question: 'What does Vibe Check scan for?',
    answer:
      'The CLI plugin scans your codebase across 6 key domains: Security (authentication, authorization, data protection), Discoverability (SEO, metadata), Analytics (tracking, monitoring), Platform (infrastructure, deployment), Reliability (error handling, performance), and Legal (privacy, compliance). It covers 19 specific feature areas including auth, payments, file uploads, email, real-time features, and more. The web app covers the same domains through guided feature recommendations rather than code analysis.',
  },
  {
    question: 'Is Vibe Check free?',
    answer:
      'Yes, Vibe Check is completely free and open source. Both the CLI plugin and the web app are available at no cost. You can view the full source code on GitHub.',
  },
  {
    question: 'What AI coding tools does Vibe Check support?',
    answer:
      'The CLI plugin runs inside Claude Code and can scan any AI-generated codebase. The web app works with any workflow — describe what you built with Cursor, Lovable, Bolt, v0, ChatGPT, or any other tool and get tailored recommendations. Both adapt their guidance based on whether you used a service-based tool or a code-generation tool.',
  },
  {
    question: 'How is the CLI different from a linter or static analysis tool?',
    answer:
      'Traditional linters check code syntax and style. The Vibe Check CLI goes deeper — it evaluates architectural decisions, missing security patterns, production readiness gaps, and business logic risks that AI coding tools commonly miss. It provides actionable prompts you can paste directly into your AI tool to fix each issue.',
  },
  {
    question: 'When should I use the web app vs the CLI?',
    answer:
      'Use the web app at vibe-check.cloud when planning your app or exploring what features you need — it gives personalized risk assessments and recommendations without requiring any code. Use the CLI plugin when you have an existing codebase and want a deep scan with specific, actionable findings tied to your actual code.',
  },
];
