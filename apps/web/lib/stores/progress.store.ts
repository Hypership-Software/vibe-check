import { createStore, useStore } from 'zustand';
import { persist } from 'zustand/middleware';
import { createHydration } from '@/lib/stores/create-hydration';

interface ProgressState {
  checkedItems: Record<string, string[]>;
  toggleItem: (featureId: string, item: string) => void;
  resetFeature: (featureId: string) => void;
}

const progressStore = createStore<ProgressState>()(
  persist(
    (set) => ({
      checkedItems: {},
      toggleItem: (featureId, item) =>
        set((state) => {
          const current = state.checkedItems[featureId] ?? [];
          const updated = current.includes(item)
            ? current.filter((checkedItem) => checkedItem !== item)
            : [...current, item];
          return {
            checkedItems: { ...state.checkedItems, [featureId]: updated },
          };
        }),
      resetFeature: (featureId) =>
        set((state) => {
          const updated = Object.fromEntries(
            Object.entries(state.checkedItems).filter(
              ([key]) => key !== featureId
            )
          );
          return { checkedItems: updated };
        }),
    }),
    { name: 'vibe-check-progress', skipHydration: true }
  )
);

export const useProgressStore = <T>(
  selector: (state: ProgressState) => T
): T => {
  return useStore(progressStore, selector);
};

export const { useHydration: useProgressHydration } = createHydration(progressStore);
