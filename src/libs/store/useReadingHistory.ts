import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

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
    }),
    {
      name: "reading-history-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)
