import { FeatureContent, FeatureContentSchema } from '@/lib/types/game';
import { FEW_SHOT_EXAMPLES } from '@/lib/content/examples';
import generatedContent from '@/lib/generated/features.json';

const parsedContent: Record<string, FeatureContent> = {};

for (const [featureName, rawContent] of Object.entries(
  generatedContent as Record<string, unknown>,
)) {
  const result = FeatureContentSchema.safeParse(rawContent);
  if (result.success) {
    parsedContent[featureName] = result.data;
  }
}

export function getFeatureContent(featureName: string): FeatureContent | null {
  return parsedContent[featureName] ?? FEW_SHOT_EXAMPLES[featureName] ?? null;
}
