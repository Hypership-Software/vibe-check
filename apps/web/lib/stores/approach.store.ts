import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { createHydration } from '@/lib/stores/create-hydration';
import { Approach } from '@/lib/types/game';

interface ApproachState {
  approaches: Record<string, Approach>;
  setApproach: (featureId: string, value: Approach) => void;
}

const approachStore = createStore<ApproachState>()(
  persist(
    (set) => ({
      approaches: {},
      setApproach: (featureId, value) =>
        set((state) => ({
          approaches: { ...state.approaches, [featureId]: value },
        })),
    }),
    { name: 'vibe-check-approach', skipHydration: true }
  )
);

export const useApproachStore = <T>(
  selector: (state: ApproachState) => T
): T => {
  return useStore(approachStore, selector);
};

export const { useHydration: useApproachHydration } = createHydration(approachStore);

export function resolveApproach(value: Approach | undefined): 'service' | 'diy' {
  if (value === 'diy') return 'diy';
  return 'service';
}
