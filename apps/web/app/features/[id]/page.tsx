import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { FEATURES } from '@/lib/features';
import { FEATURE_ICONS } from '@/lib/feature-icons';
import { getFeatureContent } from '@/lib/content/loader';
import { SiteHeader } from '@/components/game/game-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ApproachContent } from '@/components/approach-content';

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURES.map((feature) => ({ id: feature.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const feature = FEATURES.find((feature) => feature.id === id);
  if (!feature) return {};
  return {
    title: `${feature.name} - vibe-check`,
    description: feature.shortDescription,
  };
}

export default async function FeaturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feature = FEATURES.find((feature) => feature.id === id);
  if (!feature) notFound();

  const content = getFeatureContent(feature.name);
  const icon = FEATURE_ICONS[feature.id] ?? '📦';

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader backHref="/" backLabel="All features" />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="mb-8 flex items-center gap-4">
            <span className="text-4xl">{icon}</span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {feature.name}
              </h1>
              <p className="text-muted-foreground">{feature.shortDescription}</p>
            </div>
          </div>

          {!content ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Content coming soon for this feature.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-10">
              <DangerZoneSection dangerZone={content.dangerZone} />
              <Separator />
              <ApproachContent
                featureId={id}
                auditPrompts={content.auditPrompts}
                checklist={content.checklist}
              />
              <Separator />
              <SmartMoveSection smartMove={content.smartMove} />
              <Separator />
              <DidYouKnowSection didYouKnow={content.didYouKnow} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function DangerZoneSection({
  dangerZone,
}: {
  dangerZone: {
    headline: string;
    hiddenComplexity: string;
    failureScenario: string;
    riskLevel: string;
    timeToBreak: string;
    commonMistakes: string[];
  };
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Danger Zone</h2>
        <Badge variant="destructive">{dangerZone.riskLevel} risk</Badge>
      </div>

      <p className="text-lg font-medium">{dangerZone.headline}</p>

      <p className="text-muted-foreground">{dangerZone.hiddenComplexity}</p>

      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="py-4">
          <p className="text-sm font-medium text-destructive mb-2">
            Failure scenario
          </p>
          <p className="text-sm">{dangerZone.failureScenario}</p>
        </CardContent>
      </Card>

      <div>
        <p className="mb-3 text-sm font-medium">Common mistakes</p>
        <ul className="space-y-2">
          {dangerZone.commonMistakes.map((mistake) => (
            <li key={mistake} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
              <span className="text-muted-foreground">{mistake}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-sm text-muted-foreground">
        Time to break: {dangerZone.timeToBreak}
      </p>
    </section>
  );
}

function SmartMoveSection({
  smartMove,
}: {
  smartMove: {
    recommendation: string;
    reasoning: string;
    services: Array<{
      name: string;
      description: string;
      freeTier: string;
    }>;
    tradeoffs: string;
  };
}) {
  const recommendationLabel = {
    'fix-it': 'Fix it yourself',
    'use-a-service': 'Use a service',
    depends: 'It depends',
  }[smartMove.recommendation] ?? smartMove.recommendation;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Smart Move</h2>
        <Badge>{recommendationLabel}</Badge>
      </div>

      <p className="text-muted-foreground">{smartMove.reasoning}</p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {smartMove.services.map((service) => (
          <Card key={service.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {service.description}
              </p>
              <p className="mt-2 text-sm font-medium">{service.freeTier}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-muted">
        <CardContent className="py-4">
          <p className="text-sm font-medium mb-1">Tradeoffs</p>
          <p className="text-sm text-muted-foreground">{smartMove.tradeoffs}</p>
        </CardContent>
      </Card>
    </section>
  );
}

function DidYouKnowSection({
  didYouKnow,
}: {
  didYouKnow: { stat: string; source: string };
}) {
  return (
    <section>
      <Card>
        <CardContent className="py-6">
          <p className="text-sm font-medium mb-2">Did you know?</p>
          <p className="text-sm">{didYouKnow.stat}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Source: {didYouKnow.source}
          </p>
        </CardContent>
      </Card>
    </section>
  );
}
