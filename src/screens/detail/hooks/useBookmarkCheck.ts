import useSWR from "swr"
import { DetailRepository } from "../repository"

export const useBookmarkCheck = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR(slug ? `/api/bookmarks/check?slug=${slug}` : null, () =>
    DetailRepository.checkBookmark(slug),
  )

  return {
    isBookmarked: data?.isBookmarked || false,
    isLoading,
    isError: !!error,
    mutate,
  }
}
