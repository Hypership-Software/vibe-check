import { generateObject } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { ANTHROPIC_API_KEY } from '@/lib/config';
import { FeatureContentSchema, FeatureContent } from '@/lib/types/game';
import { FEATURE_SERVICES } from '@/lib/feature-services';
import { FEW_SHOT_EXAMPLES } from '@/lib/content/examples';

const anthropic = createAnthropic({ apiKey: ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are writing content for "vibe-check" — a free tool that helps people who built apps with AI (using tools like Cursor, Lovable, Bolt, or ChatGPT) understand what might go wrong before it actually does.

Your reader:
- Built a working app with AI in a few hours or days
- Has little or no programming background
- Doesn't know technical jargon — explain everything in plain English
- Is probably excited about what they built and doesn't want to be talked down to
- Needs to understand WHAT could go wrong and WHY it matters, not HOW to fix it at a code level

Your tone:
- Talk like a smart friend who's been through this before, not a lecturer
- Use everyday analogies — compare technical concepts to things people already understand
- Be honest and direct, but never condescending or alarmist
- Make the reader feel empowered ("here's what to watch for") not helpless ("you're screwed")
- Short sentences. No filler. Every word earns its place.

The "checklist" and "auditPrompts" fields each have two variants: "service" and "diy".

Service variant (for users who plugged in a service like Clerk, Stripe, Supabase):
- Checklist items should be things they can actually verify — plain yes/no questions, no jargon
- Audit prompts should help them check their integration is set up correctly
- Frame as "here's what to double-check in your setup"

DIY variant (for users whose AI tool built the feature from scratch):
- Checklist items should still be plain English but can reference what the code should be doing
- Audit prompts should be more thorough — the AI built it, now we're checking its homework
- Frame as "here's what your AI might have skipped"

Rules:
- NEVER use jargon without immediately explaining it in parentheses
- Failure scenarios should tell a story anyone can follow — "You launch, 500 people sign up, then THIS happens"
- Danger zone headlines should be punchy and instantly understandable
- Audit prompts are pasted into AI tools — they should be specific but written so a non-technical person understands what they're asking for
- Checklist items are pass/fail questions a normal person can answer — "Can someone see another user's data by changing the URL?" NOT "Implement row-level security policies"
- Common mistakes should describe what goes wrong in plain terms, not name specific algorithms or protocols
- Statistics should be real and sourced
- Smart move recommendations should be honest — if a service costs money, say so; if DIY is genuinely fine for small scale, say that too`;

function buildFewShotMessages(): Array<{ role: 'user' | 'assistant'; content: string }> {
  const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  for (const [featureName, content] of Object.entries(FEW_SHOT_EXAMPLES)) {
    const featureData = FEATURE_SERVICES[featureName];
    messages.push({
      role: 'user',
      content: buildUserPrompt(featureName, featureData),
    });
    messages.push({
      role: 'assistant',
      content: JSON.stringify(content, null, 2),
    });
  }

  return messages;
}

function buildUserPrompt(
  featureName: string,
  featureData?: { services: string[]; context: string },
): string {
  const servicesContext = featureData
    ? `\nKnown services for this feature:\n${featureData.services.map((service) => `- ${service}`).join('\n')}\n\nContext: ${featureData.context}`
    : '';

  return `Generate content for the feature: "${featureName}"${servicesContext}`;
}

export async function generateFeatureContent(featureName: string): Promise<FeatureContent> {
  const featureData = FEATURE_SERVICES[featureName];
  const fewShotMessages = buildFewShotMessages();

  const { object } = await generateObject({
    model: anthropic('claude-sonnet-4-5-20250929'),
    schema: FeatureContentSchema,
    system: SYSTEM_PROMPT,
    messages: [
      ...fewShotMessages,
      {
        role: 'user',
        content: buildUserPrompt(featureName, featureData),
      },
    ],
  });

  return object;
}

export async function generateAllFeatureContent(): Promise<Record<string, FeatureContent>> {
  const featureNames = Object.keys(FEATURE_SERVICES);
  const results: Record<string, FeatureContent> = {};

  for (const [featureName, content] of Object.entries(FEW_SHOT_EXAMPLES)) {
    results[featureName] = content;
  }

  const featuresToGenerate = featureNames.filter(
    (featureName) => !FEW_SHOT_EXAMPLES[featureName],
  );

  const BATCH_SIZE = 3;
  for (let i = 0; i < featuresToGenerate.length; i += BATCH_SIZE) {
    const batch = featuresToGenerate.slice(i, i + BATCH_SIZE);
    const batchResults = await Promise.all(
      batch.map(async (featureName) => {
        const content = await generateFeatureContent(featureName);
        return { featureName, content };
      }),
    );

    for (const { featureName, content } of batchResults) {
      results[featureName] = content;
    }
  }

  return results;
}
