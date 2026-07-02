import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type ReadingProgress = {
  lastReadChapter: string
  readChapters: string[] // List of chapter slugs that have been read
}

type ReadingHistoryState = {
  history: Record<string, ReadingProgress>
  markAsRead: (comicSlug: string, chapterSlug: string) => void
  getComicProgress: (comicSlug: string) => ReadingProgress | undefined
}

export const useReadingHistory = create<ReadingHistoryState>()(
  persist(
    (set, get) => ({
      history: {},
      markAsRead: (comicSlug, chapterSlug) =>
        set((state) => {
          const currentProgress = state.history[comicSlug] || { lastReadChapter: "", readChapters: [] }

          // Add chapter to readChapters array if it's not already there
          const updatedReadChapters = currentProgress.readChapters.includes(chapterSlug)
            ? currentProgress.readChapters
            : [...currentProgress.readChapters, chapterSlug]

          return {
            history: {
              ...state.history,
              [comicSlug]: {
                lastReadChapter: chapterSlug,
                readChapters: updatedReadChapters,
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
