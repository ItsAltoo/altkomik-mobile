import useSWR from "swr"
import { ProfileRepository } from "../repository"

export const useBookmarks = (token: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(token ? "bookmarks" : null, ProfileRepository.getBookmarks)

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
