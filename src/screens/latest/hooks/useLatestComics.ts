import useSWRInfinite from "swr/infinite"
import { LatestParams, LatestRepository } from "../repository"

export const useLatestComics = (filters: LatestParams) => {
  const getKey = (pageIndex: number, previousPageData: any) => {
    // End of pagination detection
    if (previousPageData && !previousPageData.length) return null

    // Create a key using the page index and all filter values.
    // When any filter changes, this key changes, triggering a fresh fetch from page 1.
    return [
      "latest-comics",
      pageIndex + 1, // API pages are 1-indexed
      filters.orderBy,
      filters.type,
      filters.genre,
      filters.genre2,
      filters.status,
    ]
  }

  const fetcher = ([, page, orderBy, type, genre, genre2, status]: any) => {
    return LatestRepository.getLatestComics({
      page,
      orderBy,
      type,
      genre,
      genre2,
      status,
    })
  }

  const { data, size, setSize, isLoading, isValidating, error, mutate } = useSWRInfinite(getKey, fetcher, {
    revalidateOnFocus: false,
    revalidateFirstPage: false,
  })

  const flatData = data ? data.flat() : []
  const hasMore = data && data[data.length - 1]?.length > 0

  return {
    data: flatData,
    isLoading: isLoading || (isValidating && size === 1),
    isLoadingMore: isValidating && size > 1,
    hasMore,
    error,
    mutate,
    loadMore: () => {
      if (hasMore && !isValidating && !isLoading) {
        setSize(size + 1)
      }
    },
  }
}
