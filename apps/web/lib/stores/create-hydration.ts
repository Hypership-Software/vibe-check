import { useEffect, useSyncExternalStore } from 'react';
import type { StoreApi } from 'zustand';

interface PersistApi {
  persist: {
    rehydrate: () => void | Promise<void>;
  };
}

export function createHydration<T>(store: StoreApi<T> & PersistApi) {
  let hydrated = false;
  const listeners = new Set<() => void>();

  function subscribeHydration(callback: () => void) {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  }

  function getHydrationSnapshot() {
    return hydrated;
  }

  function getServerSnapshot() {
    return false;
  }

  function useHydration() {
    useEffect(() => {
      if (!hydrated) {
        const result = store.persist.rehydrate();
        const markHydrated = () => {
          hydrated = true;
          listeners.forEach((listener) => listener());
        };
        if (result instanceof Promise) {
          result.then(markHydrated);
        } else {
          markHydrated();
        }
      }
    }, []);

    return useSyncExternalStore(
      subscribeHydration,
      getHydrationSnapshot,
      getServerSnapshot
    );
  }

  return { useHydration };
}
