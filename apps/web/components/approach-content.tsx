'use client';

import { ApproachSelector } from '@/components/approach-selector';
import { AuditPromptCard } from '@/components/audit-prompt-card';
import { Checklist } from '@/components/checklist';
import {
  useApproachStore,
  useApproachHydration,
  resolveApproach,
} from '@/lib/stores/approach.store';
import type { AuditPrompt, ChecklistItem } from '@/lib/types/game';

interface ApproachContentProps {
  featureId: string;
  auditPrompts: {
    service: AuditPrompt[];
    diy: AuditPrompt[];
  };
  checklist: {
    service: ChecklistItem[];
    diy: ChecklistItem[];
  };
}

export function ApproachContent({
  featureId,
  auditPrompts,
  checklist,
}: ApproachContentProps) {
  useApproachHydration();

  const approach = useApproachStore(
    (state) => state.approaches[featureId] ?? 'unknown'
  );
  const setApproach = useApproachStore((state) => state.setApproach);
  const resolved = resolveApproach(approach);

  return (
    <div className="space-y-10">
      <ApproachSelector
        value={approach}
        onChange={(value) => setApproach(featureId, value)}
      />

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Audit Prompts</h2>
        <p className="text-muted-foreground">
          Copy these into your AI coding assistant to check your implementation.
        </p>
        <div className="space-y-4">
          {auditPrompts[resolved].map((auditPrompt) => (
            <AuditPromptCard key={auditPrompt.title} {...auditPrompt} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Checklist</h2>
        <Checklist
          featureId={featureId}
          approach={resolved}
          items={checklist[resolved]}
        />
      </section>
    </div>
  );
}
