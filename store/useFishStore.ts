import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FishAnalysis } from '@/types/fish'

export interface FishHistoryItem {
  id: string
  image: string
  analysis: FishAnalysis
  timestamp: number
}

interface FishStore {
  history: FishHistoryItem[]
  addToHistory: (image: string, analysis: FishAnalysis) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
}

export const useFishStore = create<FishStore>()(
  persist(
    (set) => ({
      history: [],
      
      addToHistory: (image, analysis) =>
        set((state) => ({
          history: [
            {
              id: Date.now().toString(),
              image,
              analysis,
              timestamp: Date.now(),
            },
            ...state.history,
          ].slice(0, 50), // 최대 50개만 저장
        })),
      
      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'fish-history-storage', // localStorage 키
    }
  )
)