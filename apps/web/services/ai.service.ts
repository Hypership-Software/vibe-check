import { generateObject } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { ANTHROPIC_API_KEY } from '@/lib/config';
import { FEATURES } from '@/lib/features';

const anthropic = createAnthropic({ apiKey: ANTHROPIC_API_KEY });

const FeatureMatchSchema = z.object({
  features: z.array(
    z.object({
      id: z.string(),
      reason: z.string(),
    })
  ),
});

export type FeatureMatch = z.infer<typeof FeatureMatchSchema>;

const VALID_IDS = new Set(FEATURES.map((feature) => feature.id));

const FEATURE_LIST = FEATURES.map(
  (feature) => `- ${feature.id}: ${feature.name} (${feature.shortDescription})`
).join('\n');

const SYSTEM_PROMPT = `You help identify which software features a user's app will need, based on their description.

Given a user's app description, return the feature IDs that are relevant — ordered by importance (most critical first).

Only return features from this list:
${FEATURE_LIST}

Rules:
- Only include features that are clearly relevant or very likely needed based on the description
- Always include "auth" and "monitoring" if the app has any user-facing functionality
- Order by how critical the feature is to the described app
- The "reason" should be one short sentence explaining why this feature matters for their specific app
- Be generous but not absurd — if it's a marketplace, payments is obvious; if it's a blog, payments probably isn't`;

export async function matchFeatures(description: string): Promise<FeatureMatch> {
  const { object } = await generateObject({
    model: anthropic('claude-haiku-4-5-20251001'),
    schema: FeatureMatchSchema,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `What features does this app need?\n\n"${description}"`,
      },
    ],
  });

  object.features = object.features.filter(
    (feature) => VALID_IDS.has(feature.id)
  );

  return object;
}
