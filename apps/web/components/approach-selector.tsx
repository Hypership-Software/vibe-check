'use client';

import { Button } from '@/components/ui/button';
import { Approach } from '@/lib/types/game';

interface ApproachSelectorProps {
  value: Approach;
  onChange: (value: Approach) => void;
}

const OPTIONS: Array<{ value: Approach; label: string }> = [
  { value: 'service', label: 'Using a service' },
  { value: 'diy', label: 'Building it myself' },
  { value: 'unknown', label: "I don't know" },
];

export function ApproachSelector({ value, onChange }: ApproachSelectorProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">How are you building this?</p>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={value === option.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {value === 'unknown' && (
        <p className="text-sm text-muted-foreground">
          Showing what to check when using a managed service
        </p>
      )}
    </div>
  );
}
