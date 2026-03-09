import { z } from 'zod';

export const FeatureMatchSchema = z.object({
  features: z.array(
    z.object({
      id: z.string(),
      reason: z.string(),
    })
  ),
});

export type FeatureMatch = z.infer<typeof FeatureMatchSchema>;
