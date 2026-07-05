import { ComicListGroup } from "@/src/libs/types"
import useSWR from "swr"
import { ComicListParams, ComicListRepository } from "../repository"

const EMPTY_GROUP: ComicListGroup = { heading: "Memuat...", list: [] }

export const useComicList = (filters: ComicListParams) => {
  const getKey = () => {
    // Create a key using all filter values.
    return ["comic-list", filters.page || 1, filters.type, filters.letter]
  }

  const fetcher = () => {
    return ComicListRepository.getComicList(filters)
  }

  const { data, ...rest } = useSWR(getKey, fetcher, {
    revalidateOnFocus: false,
  })

  // Assuming the API returns 10+ items per page. If it's less than 10, there's no next page.
  const hasMore = data ? data.list.length >= 10 : true

  return {
    data: data ?? EMPTY_GROUP,
    hasMore,
    ...rest,
  }
}
