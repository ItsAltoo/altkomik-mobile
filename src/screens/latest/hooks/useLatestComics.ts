import { Comic } from "@/src/libs/types"
import useSWR from "swr"
import { LatestParams, LatestRepository } from "../repository"

const EMPTY_ARRAY: Comic[] = []

export const useLatestComics = (filters: LatestParams) => {
  const getKey = () => {
    // Create a key using all filter values.
    return [
      "latest-comics",
      filters.page || 1,
      filters.orderBy,
      filters.type,
      filters.genre,
      filters.genre2,
      filters.status,
    ]
  }

  const fetcher = () => {
    return LatestRepository.getLatestComics(filters)
  }

  const { data, isLoading, isValidating, error, mutate } = useSWR(getKey, fetcher, {
    revalidateOnFocus: false,
  })

  // Assuming the API returns 10 items per page. If it's less than 10, there's no next page.
  const hasMore = data ? data.length >= 10 : true

  return {
    data: data ?? EMPTY_ARRAY,
    isLoading: isLoading,
    isValidating: isValidating,
    hasMore,
    error,
    mutate,
  }
}
