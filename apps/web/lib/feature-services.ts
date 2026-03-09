export const FEATURE_SERVICES: Record<string, { services: string[]; context: string }> = {
  'Authentication': {
    services: [
      'Clerk - modern auth with great DX, built-in UI components',
      'Auth0 - enterprise-ready, lots of integrations',
      'Supabase Auth - good if you\'re already using Supabase',
      'Firebase Auth - solid choice for mobile apps',
    ],
    context: 'Auth is the classic "never roll your own" - security is critical and edge cases (password reset, session management, 2FA) multiply fast.',
  },
  'Payments': {
    services: [
      'Stripe - industry standard, handles one-time and subscriptions',
      'Paddle - handles tax/VAT automatically, great for SaaS',
      'LemonSqueezy - simpler Paddle alternative, popular with indie devs',
    ],
    context: 'Payment processing involves PCI compliance, fraud detection, chargebacks, tax handling, and subscription logic (proration, dunning). The liability alone makes this a clear buy.',
  },
  'File Uploads': {
    services: [
      'UploadThing - modern, type-safe, built for Next.js',
      'Uploadcare - handles processing, optimization, and CDN',
      'Cloudinary - great if you need image/video transformations',
      'AWS S3 + presigned URLs - DIY but battle-tested',
    ],
    context: 'Uploads seem simple until you hit large files, resumable uploads, virus scanning, image optimization, and storage costs.',
  },
  'Email': {
    services: [
      'Resend - modern DX, React email templates',
      'Postmark - excellent deliverability for transactional',
      'SendGrid - established, good free tier',
      'Loops - built for SaaS, combines transactional + marketing',
    ],
    context: 'Email deliverability is a dark art. Getting into inboxes (not spam) requires domain reputation, authentication (SPF/DKIM), and bounce handling.',
  },
  'Live Updates': {
    services: [
      'Pusher - simple pub/sub, generous free tier',
      'Ably - more features for complex real-time needs',
      'Supabase Realtime - built-in if using Supabase',
      'Liveblocks - specifically for collaborative features',
      'PartyKit - edge-first, good for multiplayer/collab',
    ],
    context: 'WebSockets at scale need connection management, reconnection handling, and fan-out infrastructure.',
  },
  'Search': {
    services: [
      'Algolia - fast, great relevance, instant search UI',
      'Typesense - open source, self-hostable',
      'Meilisearch - another good open source option',
      'PostgreSQL full-text - often good enough for simple cases',
    ],
    context: 'Basic search is easy. Good search (typo tolerance, relevance ranking, facets, speed at scale) is specialized work.',
  },
  'Background Tasks': {
    services: [
      'Inngest - modern, event-driven, great DX',
      'Trigger.dev - similar to Inngest, good Next.js integration',
      'Vercel Cron + Queues - if you\'re on Vercel',
      'BullMQ + Redis - self-hosted, more control',
    ],
    context: 'Job queues need retry logic, failure handling, monitoring, and scaling.',
  },
  'Notifications': {
    services: [
      'Knock - modern notification infrastructure, multi-channel',
      'Novu - open source, handles push/email/SMS/in-app',
      'OneSignal - popular for push notifications',
      'Customer.io - good for lifecycle messaging',
    ],
    context: 'Notifications span multiple channels (push, email, SMS, in-app) with user preferences, batching, and delivery tracking.',
  },
  'Analytics': {
    services: [
      'PostHog - product analytics, open source option, session replay',
      'Mixpanel - event-based, good for product teams',
      'Amplitude - similar to Mixpanel, enterprise focus',
      'Plausible - privacy-focused, simple web analytics',
    ],
    context: 'Basic tracking is easy. Privacy compliance (GDPR), meaningful event design, and actionable insights require thought regardless of tool.',
  },
  'Data Export': {
    services: [
      'Build it - often simple enough at small scale',
      'Background job service (Inngest/Trigger.dev) - for large exports',
      'Retool - if you need admin tools anyway',
    ],
    context: 'Export complexity scales with data volume. Small exports are trivial; large ones need streaming, background processing, and format handling.',
  },
  'Feature Flags': {
    services: [
      'LaunchDarkly - enterprise standard, powerful targeting',
      'Flagsmith - open source option, self-hostable',
      'PostHog - feature flags + analytics in one',
      'Statsig - good for experimentation/A/B testing',
      'Vercel Edge Config - simple flags if on Vercel',
    ],
    context: 'Simple on/off flags are easy to build. Percentage rollouts, user targeting, A/B testing, and analytics integration add complexity.',
  },
  'AI Features': {
    services: [
      'Vercel AI SDK - great DX, handles streaming, multi-provider',
      'OpenAI API - simple for basic chat/completion',
      'Anthropic Claude API - strong for complex reasoning',
      'OpenRouter - single API for multiple models',
    ],
    context: 'Basic AI integration is surprisingly accessible. Complexity comes with RAG, fine-tuning, prompt management, and cost control at scale.',
  },
  'CMS': {
    services: [
      'Sanity - flexible, real-time, great developer experience',
      'Contentful - established, enterprise-ready',
      'Payload - open source, self-hosted, code-first',
      'Keystatic - git-based, good for marketing sites',
      'MDX + Next.js - simple blog/docs without a CMS',
    ],
    context: 'For a simple blog, MDX files might be enough. For marketing teams who need to edit content independently, a headless CMS pays off quickly.',
  },
  'Monitoring': {
    services: [
      'Sentry - error tracking, performance monitoring, session replay',
      'LogRocket - session replay focused, good for debugging UX issues',
      'Axiom - modern logging and analytics',
      'BetterStack - uptime monitoring + incident management',
      'Highlight.io - open source alternative to LogRocket',
    ],
    context: 'You need to know when things break before users tell you. Error tracking is table stakes; the question is how deep you go with performance monitoring, logging, and alerting.',
  },
  'User Content': {
    services: [
      'Build it - often straightforward for basic comments',
      'Disqus - drop-in comments (with tradeoffs)',
      'Moderation APIs (Perspective, OpenAI) - for content filtering',
      'Stream - if building social/feed features',
    ],
    context: 'Basic comments are simple. Moderation, spam prevention, threading, reactions, and notifications add complexity.',
  },
  'Customer Support': {
    services: [
      'Intercom - full-featured, chat + help center + tickets',
      'Crisp - lighter alternative to Intercom, good free tier',
      'Plain - modern, developer-focused support platform',
      'Zendesk - enterprise standard, very full-featured',
      'Help Scout - email-focused, simpler than Zendesk',
    ],
    context: 'A simple contact form works early on. As you grow, you\'ll want chat widgets, help centers, ticket management, and shared inboxes. The switch is usually worth it sooner than you think.',
  },
  'CRM': {
    services: [
      'HubSpot - generous free tier, scales to enterprise',
      'Attio - modern, flexible, great for startups',
      'Pipedrive - sales-focused, simple pipeline management',
      'Salesforce - enterprise standard (and complexity)',
      'Folk - lightweight, good for relationship-focused teams',
    ],
    context: 'A spreadsheet works surprisingly long. When you need deal stages, activity tracking, and team collaboration, a real CRM saves time. The question is how much process you actually need.',
  },
};
