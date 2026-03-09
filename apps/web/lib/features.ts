import type { Feature } from '@/lib/types/game';

export const FEATURES: Feature[] = [
  {
    id: 'auth',
    name: 'Authentication',
    shortDescription: 'Sign up, log in, password reset, 2FA',
  },
  {
    id: 'payments',
    name: 'Payments',
    shortDescription: 'One-time and recurring charges',
  },
  {
    id: 'file-uploads',
    name: 'File Uploads',
    shortDescription: 'Let users upload and store files',
  },
  {
    id: 'email',
    name: 'Email',
    shortDescription: 'Send transactional and marketing emails',
  },
  {
    id: 'realtime',
    name: 'Live Updates',
    shortDescription: 'Real-time sync without refreshing',
  },
  {
    id: 'search',
    name: 'Search',
    shortDescription: 'Find content across your app',
  },
  {
    id: 'background-jobs',
    name: 'Background Tasks',
    shortDescription: 'Process things without making users wait',
  },
  {
    id: 'push-notifications',
    name: 'Notifications',
    shortDescription: 'Push, email, and in-app alerts',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    shortDescription: 'Track what users do',
  },
  {
    id: 'data-export',
    name: 'Data Export',
    shortDescription: 'Let users download their data',
  },
  {
    id: 'feature-flags',
    name: 'Feature Flags',
    shortDescription: 'Control rollouts and run experiments',
  },
  {
    id: 'ai',
    name: 'AI Features',
    shortDescription: 'Add LLM/AI capabilities',
  },
  {
    id: 'cms',
    name: 'CMS',
    shortDescription: 'Manage marketing pages and blog content',
  },
  {
    id: 'monitoring',
    name: 'Monitoring',
    shortDescription: 'Error tracking and observability',
  },
  {
    id: 'comments',
    name: 'User Content',
    shortDescription: 'Comments, reviews, social features',
  },
  {
    id: 'support',
    name: 'Customer Support',
    shortDescription: 'Chat, help desk, and ticket management',
  },
  {
    id: 'crm',
    name: 'CRM',
    shortDescription: 'Track leads, deals, and customer relationships',
  },
  {
    id: 'scheduling',
    name: 'Scheduling',
    shortDescription: 'Bookings, appointments, and calendar management',
  },
  {
    id: 'maps',
    name: 'Maps & Location',
    shortDescription: 'Geolocation, mapping, and location-based features',
  },
];
