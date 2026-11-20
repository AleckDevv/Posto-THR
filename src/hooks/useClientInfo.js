import { useSyncExternalStore } from 'react';

const noopSubscribe = () => () => {};

/**
 * `false` no servidor e durante a hidratação; `true` depois.
 * Evita divergências de HTML entre o pré-render e o cliente.
 */
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

/** Respeita o modo "economia de dados" do navegador (Save-Data). */
export function useSaveData() {
  return useSyncExternalStore(
    noopSubscribe,
    () => Boolean(typeof navigator !== 'undefined' && navigator.connection?.saveData),
    () => false,
  );
}
