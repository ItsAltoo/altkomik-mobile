import { Comic } from "@/src/libs/types"
import { LatestParams, LatestRepository } from "@/src/screens/latest/repository"
import useSWR from "swr"

const EMPTY_ARRAY: Comic[] = []

export const useGenreComics = (filters: LatestParams) => {
  const getKey = () => {
    // Create a key using all filter values.
    return ["genre-comics", filters.page || 1, filters.type, filters.genre, filters.genre2]
  }

  const fetcher = () => {
    return LatestRepository.getLatestComics(filters)
  }

  const { data, ...rest } = useSWR(getKey, fetcher, {
    revalidateOnFocus: false,
  })

  // Assuming the API returns 10+ items per page. If it's less than 10, there's no next page.
  const hasMore = data ? data.length >= 10 : true

  return {
    data: data ?? EMPTY_ARRAY,
    hasMore,
    ...rest,
  }
}
