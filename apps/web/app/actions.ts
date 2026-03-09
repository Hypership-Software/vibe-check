'use server';

import { aiService } from '@/services/ai.service';
import { getFeatureContent } from '@/lib/content/loader';
import { FEATURES } from '@/lib/features';
import { prettifyError } from '@/lib/utils';
import {
  getRecommendations,
  type RecommendationResult,
} from '@/lib/recommendation-engine';
import { CheckAppSchema } from '@/models/recommendation-schema';

type CheckAppResult =
  | { success: true; recommendations: RecommendationResult[] }
  | { success: false; error: string };

export async function checkApp(
  description: string,
  tools: string[] = []
): Promise<CheckAppResult> {
  const validated = CheckAppSchema.safeParse({ description, tools });

  if (!validated.success) {
    return { success: false, error: prettifyError(validated.error) };
  }

  const { description: trimmedDescription, tools: validatedTools } = validated.data;

  try {
    const result = await aiService.matchFeatures(trimmedDescription, validatedTools);
    const matched = result?.features ?? [];

    if (matched.length === 0) {
      return {
        success: false,
        error: 'That doesn\'t look like an app description. Try something like "A marketplace for freelance designers with payments and messaging".',
      };
    }

    const featureMap = new Map(FEATURES.map((feature) => [feature.id, feature]));

    const recommendations = matched
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

    return { success: true, recommendations };
  } catch {
    return { success: true, recommendations: getRecommendations(trimmedDescription) };
  }
}
