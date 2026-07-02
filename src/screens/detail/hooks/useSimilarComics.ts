import { SimilarComic } from "@/src/libs/types"
import useSWR from "swr"
import { DetailRepository } from "../repository"

const EMPTY_ARRAY: SimilarComic[] = []

export const useSimilarComics = (slug: string) => {
  const { data, ...rest } = useSWR([slug, "similar-comics"], () => DetailRepository.getSimilarComics(slug), {
    revalidateOnFocus: false,
  })

  return {
    data: data || EMPTY_ARRAY,
    ...rest,
  }
}
