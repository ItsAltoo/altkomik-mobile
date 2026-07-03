import useSWR from "swr"
import { GenreItem, LatestRepository } from "../repository"

const EMPTY_ARRAY: GenreItem[] = []

export const useGenres = () => {
  const { data, ...rest } = useSWR("genres", LatestRepository.getGenres, { revalidateOnFocus: false })

  return {
    data: data ?? EMPTY_ARRAY,
    ...rest,
  }
}
