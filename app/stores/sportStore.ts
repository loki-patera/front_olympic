import { create } from 'zustand'

/**
 * Interface `SportStore` définissant l'état de l'épreuve sportive sélectionnée pour le hook Zustand {@link useSportStore}.
 * 
 * @property sport - L'épreuve sportive actuellement sélectionnée (ou `null` si aucune n'est sélectionnée).
 * @property setSport - Fonction pour mettre à jour l'épreuve sportive sélectionnée.
 */
export interface SportStore {
  sport: string | null,
  setSport(newSport: string): void
}

/**
 * Hook Zustand `useSportStore` pour gérer l'état de l'épreuve sportive sélectionnée.
 *
 * @example
 * ```tsx
 * const { sport, setSport } = useSportStore()
 * setSport('Football')
 * ```
 */
export const useSportStore = create<SportStore>((set) => ({
  sport: null,
  setSport: (newSport) => set({ sport: newSport })
}))