import useSWR from "swr"
import { ProfileRepository } from "../repository"

const EMPTY_ARRAY: any[] = []

export const useBookmarks = (token: string | null) => {
  const { data, error, isLoading, mutate } = useSWR(token ? "bookmarks" : null, ProfileRepository.getBookmarks)

  return {
    data: data ?? EMPTY_ARRAY,
    error,
    isLoading,
    mutate,
  }
}
