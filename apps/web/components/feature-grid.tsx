import Link from 'next/link';
import { FEATURES } from '@/lib/features';
import { FEATURE_ICONS } from '@/lib/feature-icons';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">All Features</h2>
        <p className="mt-3 text-muted-foreground">
          {FEATURES.length} common features, each with hidden risks and audit
          prompts you can paste straight into your AI tool.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => {
          const icon = FEATURE_ICONS[feature.id] ?? '📦';
          return (
            <Link key={feature.id} href={`/features/${feature.id}`}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{icon}</span>
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <CardTitle className="text-base">{feature.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.shortDescription}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
