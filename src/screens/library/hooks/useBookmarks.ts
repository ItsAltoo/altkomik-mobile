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
  })

  const hasMore = data ? data.meta.total > page * limit : true

  return {
    data: data ?? EMPTY_RESPONSE,
    hasMore,
    ...rest,
  }
}
