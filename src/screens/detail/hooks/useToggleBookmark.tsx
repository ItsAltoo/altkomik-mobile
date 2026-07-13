import { useState } from "react"
import Toast from "react-native-toast-message"
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
        Toast.show({
          type: "success",
          text1: "Bookmark Dihapus",
          text2: "Komik berhasil dihapus dari bookmark.",
          position: "top",
          topOffset: 50,
        })
      } else {
        await DetailRepository.addBookmark(comicData)
        Toast.show({
          type: "success",
          text1: "Bookmark Ditambahkan",
          text2: "Komik berhasil ditambahkan ke bookmark.",
          position: "top",
          topOffset: 50,
        })
      }

      // Update cache
      mutate()
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      Toast.show({
        type: "error",
        text1: "Gagal",
        text2: "Terjadi kesalahan saat mengubah bookmark.",
        position: "top",
        topOffset: 50,
      })
    } finally {
      setIsToggling(false)
    }
  }

  return { toggleBookmark, isToggling }
}
