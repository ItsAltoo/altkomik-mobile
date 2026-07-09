import { useReadingHistory } from "@/src/libs/store/useReadingHistory"
import { useMemo } from "react"

export const useHistoryPaginated = (page: number, limit = 10) => {
  const history = useReadingHistory((state) => state.history)

  const { paginatedList, totalCount, hasMore } = useMemo(() => {
    const historyEntries = Object.entries(history || {})
      .filter(([, progress]) => progress.lastReadChapter)
      .sort(([, a], [, b]) => (b.updatedAt || 0) - (a.updatedAt || 0))

    const totalCount = historyEntries.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedList = historyEntries.slice(startIndex, endIndex)
    const hasMore = totalCount > endIndex

    return {
      paginatedList,
      totalCount,
      hasMore,
    }
  }, [history, page, limit])

  return {
    data: paginatedList,
    totalCount,
    hasMore,
  }
}
