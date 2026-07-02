import useSWR from "swr"
import { ReadRepository } from "../repository"

export const useReadComic = (slug: string) => {
  const { data, ...rest } = useSWR([slug, "read-comic"], () => ReadRepository.getReadComic(slug), {
    revalidateOnFocus: false,
  })

  return {
    data,
    ...rest,
  }
}
