import { Comic } from "@/src/libs/types"
import useSWR from "swr"
import { PopularParams, PopularRepository } from "../repository"

const EMPTY_ARRAY: Comic[] = []

export const usePopularComics = (filters: PopularParams) => {
  const getKey = () => {
    return ["popular-comics", filters.page || 1, filters.orderBy, filters.type]
  }

  const fetcher = () => {
    return PopularRepository.getPopularComics(filters)
  }

  const { data, ...rest } = useSWR(getKey, fetcher, {
    revalidateOnFocus: false,
  })

  const hasMore = data ? data.length >= 10 : true

  return {
    data: data ?? EMPTY_ARRAY,
    hasMore,
    ...rest,
  }
}
