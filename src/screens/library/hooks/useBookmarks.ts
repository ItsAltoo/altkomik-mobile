import { BookmarkResponse } from "@/src/libs/types"
import useSWR from "swr"
import { LibraryRepository } from "../repository"

const EMPTY_RESPONSE: BookmarkResponse = { meta: { total: 0, page: 1, limit: 10 }, result: [] }

export const useBookmarks = (token: string | null, page: number, limit = 10) => {
  const getKey = () => {
    if (!token) return null
    return ["library-bookmarks", page, limit]
  }

  const fetcher = () => {
    return LibraryRepository.getBookmarks(page, limit)
  }

  const { data, ...rest } = useSWR(getKey, fetcher, {
    revalidateOnFocus: false,
    onSuccess: (fetchedData, key) => {
      if (fetchedData?.result?.length > 0) {
        LibraryRepository.syncBookmarks(fetchedData.result)
          .then((updatedData) => {
            if (updatedData?.result) {
              // Merge the updated data with the existing fetchedData to preserve 'meta' and 'thumbnail'
              const newData = {
                ...fetchedData,
                result: fetchedData.result.map((item) => {
                  const syncedItem = updatedData.result.find((s) => s.slug === item.slug)
                  return syncedItem ? { ...item, ...syncedItem } : item
                }),
              }
              rest.mutate(newData, { revalidate: false })
            }
          })
          .catch((err) => console.log("Background sync failed:", err))
      }
    },
  })

  const currentData = data ?? EMPTY_RESPONSE
  const total = currentData?.meta?.total ?? 0
  const totalPages = Math.ceil(total / limit)
  const hasMore = total > page * limit

  return {
    data: currentData,
    hasMore,
    totalPages,
    total,
    ...rest,
  }
}
