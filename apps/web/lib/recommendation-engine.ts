import { FEATURES } from '@/lib/features';
import { getFeatureContent } from '@/lib/content/loader';

export type Tool = 'lovable' | 'cursor' | 'bolt' | 'v0' | 'chatgpt' | 'claude-code';

export type ApproachHint = 'service' | 'diy';

export interface RecommendationResult {
  featureId: string;
  featureName: string;
  shortDescription: string;
  headline: string;
  riskLevel: 'moderate' | 'high' | 'critical';
  score: number;
  icon: string;
}

const KEYWORD_MAP: Record<string, string[]> = {
  auth: [
    'login', 'sign up', 'signup', 'sign in', 'signin', 'account', 'password',
    'users', 'profile', 'register', 'registration', 'oauth', 'sso',
    'authentication', 'session', '2fa', 'mfa', 'roles', 'permissions',
  ],
  payments: [
    'pay', 'payment', 'subscription', 'billing', 'stripe', 'marketplace',
    'store', 'cart', 'checkout', 'pricing', 'plan', 'credit card', 'invoice',
    'ecommerce', 'e-commerce', 'shop', 'purchase', 'buy', 'sell', 'revenue',
    'saas', 'freemium', 'premium', 'monetize',
  ],
  'file-uploads': [
    'upload', 'file', 'image', 'photo', 'video', 'document', 'attachment',
    'media', 'gallery', 'storage', 'pdf', 'avatar', 'resume', 'portfolio',
  ],
  email: [
    'email', 'mail', 'newsletter', 'invite', 'invitation', 'notification email',
    'welcome email', 'transactional', 'smtp', 'sendgrid', 'mailgun',
  ],
  realtime: [
    'chat', 'message', 'messaging', 'live', 'collaboration', 'sync',
    'real-time', 'realtime', 'websocket', 'multiplayer', 'feed',
    'activity feed', 'instant', 'presence', 'typing indicator',
  ],
  search: [
    'search', 'filter', 'find', 'lookup', 'autocomplete', 'typeahead',
    'full-text', 'browse', 'discover', 'explore', 'catalog', 'directory',
    'listing', 'listings',
  ],
  'background-jobs': [
    'background', 'queue', 'cron', 'scheduled', 'batch', 'processing',
    'import', 'export data', 'worker', 'pipeline', 'etl', 'scrape',
    'scraping', 'sync data', 'migration',
  ],
  'push-notifications': [
    'notification', 'push', 'alert', 'reminder', 'digest', 'notify',
    'bell', 'inbox',
  ],
  analytics: [
    'analytics', 'tracking', 'metrics', 'dashboard', 'reporting',
    'insights', 'funnel', 'conversion', 'events', 'usage',
  ],
  'data-export': [
    'export', 'download', 'csv', 'report', 'gdpr', 'data portability',
    'compliance', 'backup',
  ],
  'feature-flags': [
    'feature flag', 'toggle', 'rollout', 'experiment', 'a/b test',
    'ab test', 'canary', 'beta', 'early access',
  ],
  ai: [
    'ai', 'llm', 'gpt', 'claude', 'openai', 'chatbot', 'copilot',
    'assistant', 'generate', 'generative', 'machine learning', 'ml',
    'prompt', 'embedding', 'vector', 'rag', 'summarize', 'translate',
  ],
  cms: [
    'cms', 'blog', 'content', 'editor', 'wysiwyg', 'rich text',
    'markdown', 'landing page', 'marketing page', 'article', 'post',
    'publishing',
  ],
  monitoring: [
    'monitoring', 'error tracking', 'logging', 'observability', 'uptime',
    'alerting', 'sentry', 'datadog', 'health check', 'crash',
  ],
  comments: [
    'comment', 'review', 'rating', 'feedback', 'social', 'community',
    'forum', 'discussion', 'reply', 'like', 'vote', 'upvote',
    'user generated', 'ugc', 'moderation',
  ],
  support: [
    'support', 'help desk', 'helpdesk', 'ticket', 'customer service',
    'live chat', 'zendesk', 'intercom', 'faq', 'knowledge base',
    'contact us',
  ],
  crm: [
    'crm', 'lead', 'leads', 'deal', 'pipeline', 'sales', 'prospect',
    'contact management', 'customer relationship', 'outreach', 'follow up',
  ],
};

const ALWAYS_INCLUDE: Set<string> = new Set(['auth', 'monitoring']);

const RISK_BOOST: Record<string, number> = {
  critical: 2,
  high: 1,
  moderate: 0,
};

const TOOL_APPROACH_MAP: Record<Tool, ApproachHint> = {
  'lovable': 'service',
  'bolt': 'service',
  'v0': 'service',
  'cursor': 'diy',
  'chatgpt': 'diy',
  'claude-code': 'diy',
};

export function getApproachFromTools(tools: Tool[]): ApproachHint {
  const serviceCount = tools.filter((tool) => TOOL_APPROACH_MAP[tool] === 'service').length;
  const diyCount = tools.filter((tool) => TOOL_APPROACH_MAP[tool] === 'diy').length;
  return serviceCount >= diyCount ? 'service' : 'diy';
}

export function getRecommendations(
  description: string,
  maxResults: number = 7
): RecommendationResult[] {
  const lowerDescription = description.toLowerCase();
  const scores: Record<string, number> = {};

  for (const feature of FEATURES) {
    const keywords = KEYWORD_MAP[feature.id] ?? [];
    let score = 0;

    for (const keyword of keywords) {
      if (lowerDescription.includes(keyword)) {
        score += 1;
      }
    }

    const content = getFeatureContent(feature.name);
    const riskLevel = content?.dangerZone.riskLevel ?? 'moderate';

    if (ALWAYS_INCLUDE.has(feature.id) && description.trim().length > 0) {
      score = Math.max(score, 1);
    }

    score += RISK_BOOST[riskLevel] ?? 0;

    scores[feature.id] = score;
  }

  const results: RecommendationResult[] = FEATURES
    .map((feature) => {
      const content = getFeatureContent(feature.name);
      return {
        featureId: feature.id,
        featureName: feature.name,
        shortDescription: feature.shortDescription,
        headline: content?.dangerZone.headline ?? '',
        riskLevel: (content?.dangerZone.riskLevel ?? 'moderate') as RecommendationResult['riskLevel'],
        score: scores[feature.id] ?? 0,
        icon: '',
      };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);

  if (results.length === 0) {
    return getFallbackRecommendations(5);
  }

  return results.slice(0, maxResults);
}

function getFallbackRecommendations(count: number): RecommendationResult[] {
  const riskOrder = { critical: 0, high: 1, moderate: 2 };

  return FEATURES
    .map((feature) => {
      const content = getFeatureContent(feature.name);
      return {
        featureId: feature.id,
        featureName: feature.name,
        shortDescription: feature.shortDescription,
        headline: content?.dangerZone.headline ?? '',
        riskLevel: (content?.dangerZone.riskLevel ?? 'moderate') as RecommendationResult['riskLevel'],
        score: 0,
        icon: '',
      };
    })
    .sort((a, b) => riskOrder[a.riskLevel] - riskOrder[b.riskLevel])
    .slice(0, count);
}

export const TOOLS: { id: Tool; label: string }[] = [
  { id: 'lovable', label: 'Lovable' },
  { id: 'cursor', label: 'Cursor' },
  { id: 'bolt', label: 'Bolt' },
  { id: 'v0', label: 'v0' },
  { id: 'chatgpt', label: 'ChatGPT' },
  { id: 'claude-code', label: 'Claude Code' },
];
