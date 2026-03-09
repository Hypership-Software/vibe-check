import { z } from 'zod';

export interface Feature {
  id: string;
  name: string;
  shortDescription: string;
}

export const AuditPromptSchema = z.object({
  title: z.string(),
  prompt: z.string(),
  category: z.enum(['security', 'performance', 'reliability', 'cost', 'data']),
  whyItMatters: z.string(),
});

export const ChecklistItemSchema = z.object({
  item: z.string(),
  category: z.enum(['security', 'reliability', 'performance', 'data']),
});

export type Approach = 'service' | 'diy' | 'unknown';

export const FeatureContentSchema = z.object({
  dangerZone: z.object({
    headline: z.string(),
    hiddenComplexity: z.string(),
    failureScenario: z.string(),
    riskLevel: z.enum(['moderate', 'high', 'critical']),
    timeToBreak: z.string(),
    commonMistakes: z.array(z.string()),
  }),
  auditPrompts: z.object({
    service: z.array(AuditPromptSchema),
    diy: z.array(AuditPromptSchema),
  }),
  smartMove: z.object({
    recommendation: z.enum(['fix-it', 'use-a-service', 'depends']),
    reasoning: z.string(),
    services: z.array(z.object({
      name: z.string(),
      description: z.string(),
      freeTier: z.string(),
    })),
    tradeoffs: z.string(),
  }),
  checklist: z.object({
    service: z.array(ChecklistItemSchema),
    diy: z.array(ChecklistItemSchema),
  }),
  didYouKnow: z.object({
    stat: z.string(),
    source: z.string(),
  }),
});

export type FeatureContent = z.infer<typeof FeatureContentSchema>;
export type AuditPrompt = z.infer<typeof AuditPromptSchema>;
export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;
