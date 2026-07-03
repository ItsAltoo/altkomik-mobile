import { SearchComic } from "@/src/libs/types"
import useSWR from "swr"
import { SearchRepository } from "../repository"

const EMPTY_ARRAY: SearchComic[] = []

export const useSearchComics = (query: string) => {
  const { data, mutate, ...rest } = useSWR(
    query ? ["search-comics", query] : null,
    () => SearchRepository.searchComics(query),
    { revalidateOnFocus: false },
  )

  return {
    data: data ?? EMPTY_ARRAY,
    mutate,
    ...rest,
  }
}
