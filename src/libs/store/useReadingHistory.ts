import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { useEffect, useState } from "react"

type ReadingProgress = {
  lastReadChapter: string
  readChapters: string[] // List of chapter slugs that have been read
  title?: string
  thumbnail?: string
  updatedAt?: number
}

type ReadingHistoryState = {
  history: Record<string, ReadingProgress>
  markAsRead: (comicSlug: string, chapterSlug: string) => void
  updateComicMeta: (comicSlug: string, title: string, thumbnail: string) => void
  getComicProgress: (comicSlug: string) => ReadingProgress | undefined
  deleteHistory: (comicSlug: string) => void
}

export const useReadingHistory = create<ReadingHistoryState>()(
  persist(
    (set, get) => ({
      history: {},
      markAsRead: (comicSlug, chapterSlug) =>
        set((state) => {
          const currentProgress = state.history[comicSlug] || { lastReadChapter: "", readChapters: [] }

          const updatedReadChapters = currentProgress.readChapters.includes(chapterSlug)
            ? currentProgress.readChapters
            : [...currentProgress.readChapters, chapterSlug]

          return {
            history: {
              ...state.history,
              [comicSlug]: {
                ...currentProgress,
                lastReadChapter: chapterSlug,
                readChapters: updatedReadChapters,
                updatedAt: Date.now(),
              },
            },
          }
        }),
      updateComicMeta: (comicSlug, title, thumbnail) =>
        set((state) => {
          const currentProgress = state.history[comicSlug]

          if (!currentProgress) return state // Do nothing if history doesn't exist yet

          return {
            history: {
              ...state.history,
              [comicSlug]: {
                ...currentProgress,
                title,
                thumbnail,
              },
            },
          }
        }),
      getComicProgress: (comicSlug) => get().history[comicSlug],
      deleteHistory: (comicSlug) =>
        set((state) => {
          const newHistory = { ...state.history }
          delete newHistory[comicSlug]
          return { history: newHistory }
        }),
    }),
    {
      name: "reading-history-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

export const useHydration = () => {
  const [hydrated, setHydrated] = useState(useReadingHistory.persist.hasHydrated())
  
  useEffect(() => {
    const unsub = useReadingHistory.persist.onFinishHydration(() => setHydrated(true))
    setHydrated(useReadingHistory.persist.hasHydrated())
    
    return () => {
      unsub()
    }
  }, [])
  
  return hydrated
}
