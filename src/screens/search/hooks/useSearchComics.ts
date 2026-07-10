import { SearchComic } from "@/src/libs/types"
import useSWR from "swr"
import { SearchRepository } from "../repository"

const EMPTY_ARRAY: SearchComic[] = []

export const useSearchComics = (query: string) => {
  const { data, mutate, ...rest } = useSWR(
    query ? ["search-comics", query] : null,
    async ([_, q]) => {
      if (!SearchRepository) {
        console.error("SearchRepository is undefined")
        return []
      }
      return await SearchRepository.searchComics(q)
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 500,
      keepPreviousData: true,
    },
  )

  return {
    data: data ?? EMPTY_ARRAY,
    mutate,
    ...rest,
  }
}
