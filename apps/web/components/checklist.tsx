'use client';

import { useCallback } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  useProgressStore,
  useProgressHydration,
} from '@/lib/stores/progress.store';
import type { ChecklistItem } from '@/lib/types/game';

interface ChecklistProps {
  featureId: string;
  approach: 'service' | 'diy';
  items: ChecklistItem[];
}

const EMPTY: string[] = [];

export function Checklist({ featureId, approach, items }: ChecklistProps) {
  const progressKey = `${featureId}:${approach}`;
  const hydrated = useProgressHydration();
  const checkedItems = useProgressStore(
    useCallback(
      (state) => state.checkedItems[progressKey] ?? EMPTY,
      [progressKey]
    )
  );
  const toggleItem = useProgressStore((state) => state.toggleItem);

  const checkedCount = hydrated ? checkedItems.length : 0;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {checkedCount}/{items.length} completed
      </p>
      <div className="space-y-3">
        {items.map((checklistItem) => {
          const isChecked = hydrated && checkedItems.includes(checklistItem.item);
          return (
            <label
              key={checklistItem.item}
              className="flex items-start gap-3 cursor-pointer"
            >
              <Checkbox
                checked={isChecked}
                onCheckedChange={() =>
                  toggleItem(progressKey, checklistItem.item)
                }
                className="mt-0.5"
              />
              <div className="flex-1 flex items-start gap-2">
                <span
                  className={`text-sm ${isChecked ? 'line-through text-muted-foreground' : ''}`}
                >
                  {checklistItem.item}
                </span>
                <Badge variant="outline" className="shrink-0 text-xs">
                  {checklistItem.category}
                </Badge>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
