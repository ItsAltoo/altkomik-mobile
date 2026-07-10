import { useState } from "react"
import { DetailRepository } from "../repository"
import { useBookmarkCheck } from "./useBookmarkCheck"

export const useToggleBookmark = (slug: string) => {
  const [isToggling, setIsToggling] = useState(false)
  const { isBookmarked, mutate } = useBookmarkCheck(slug)

  const toggleBookmark = async (comicData: {
    slug: string
    title: string
    thumbnail: string
    type: string
    status: string
  }) => {
    if (isToggling) return

    setIsToggling(true)
    try {
      if (isBookmarked) {
        await DetailRepository.removeBookmark(slug)
      } else {
        await DetailRepository.addBookmark(comicData)
      }

      // Update cache
      mutate()
    } catch (error) {
      console.error("Error toggling bookmark:", error)
    } finally {
      setIsToggling(false)
    }
  }

  return { toggleBookmark, isToggling }
}
