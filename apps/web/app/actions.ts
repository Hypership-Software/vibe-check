'use server';

import { matchFeatures } from '@/services/ai.service';
import { getFeatureContent } from '@/lib/content/loader';
import { FEATURES } from '@/lib/features';
import type { RecommendationResult } from '@/lib/recommendation-engine';

const MAX_DESCRIPTION_LENGTH = 1000;

export async function checkApp(description: string): Promise<RecommendationResult[]> {
  const trimmed = description.trim();

  if (trimmed.length === 0) {
    return [];
  }

  if (trimmed.length > MAX_DESCRIPTION_LENGTH) {
    throw new Error(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`);
  }

  const { features: matched } = await matchFeatures(trimmed);

  const featureMap = new Map(FEATURES.map((feature) => [feature.id, feature]));

  return matched
    .map((match) => {
      const feature = featureMap.get(match.id);
      if (!feature) return null;

      const content = getFeatureContent(feature.name);
      const riskLevel = content?.dangerZone.riskLevel ?? 'moderate';

      return {
        featureId: feature.id,
        featureName: feature.name,
        shortDescription: feature.shortDescription,
        headline: content?.dangerZone.headline ?? '',
        riskLevel: riskLevel as RecommendationResult['riskLevel'],
        score: 0,
        icon: '',
      };
    })
    .filter((result): result is RecommendationResult => result !== null);
}
