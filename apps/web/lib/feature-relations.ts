import { FEATURES } from '@/lib/features';

const RELATIONS: Record<string, string[]> = {
  auth: ['payments', 'crm', 'email'],
  payments: ['auth', 'data-export', 'monitoring'],
  'file-uploads': ['auth', 'monitoring', 'search'],
  email: ['auth', 'push-notifications', 'background-jobs'],
  realtime: ['monitoring', 'push-notifications', 'auth'],
  search: ['analytics', 'ai', 'monitoring'],
  'background-jobs': ['monitoring', 'email', 'data-export'],
  'push-notifications': ['email', 'realtime', 'auth'],
  analytics: ['monitoring', 'search', 'feature-flags'],
  'data-export': ['auth', 'background-jobs', 'payments'],
  'feature-flags': ['analytics', 'monitoring', 'ai'],
  ai: ['monitoring', 'auth', 'search'],
  cms: ['search', 'file-uploads', 'auth'],
  monitoring: ['analytics', 'background-jobs', 'realtime'],
  comments: ['auth', 'push-notifications', 'search'],
  support: ['email', 'crm', 'push-notifications'],
  crm: ['email', 'analytics', 'auth'],
  scheduling: ['email', 'push-notifications', 'realtime'],
  maps: ['search', 'analytics', 'monitoring'],
};

const featureMap = new Map(FEATURES.map((feature) => [feature.id, feature]));

export function getRelatedFeatures(featureId: string) {
  const relatedIds = RELATIONS[featureId] ?? [];
  return relatedIds
    .map((id) => featureMap.get(id))
    .filter((feature) => feature !== undefined);
}
