import { ApiResponse, ComicDetail, SimilarComic } from "@/src/libs/types"
import api from "@/src/libs/utils/api"
import axios from "axios"
import { authClient } from "@/src/libs/auth-client"

export const DetailRepository = {
  getDetail: async (slug: string) => {
    const { data } = await api.get<ApiResponse<ComicDetail>>(`/detail/${slug}`)
    return data.data
  },

  getSimilarComics: async (slug: string) => {
    const { data } = await api.get<ApiResponse<SimilarComic[]>>(`/detail/${slug}/similar-comics`)
    return data.data
  },

  checkBookmark: async (slug: string) => {
    const cookie = await authClient.getCookie()
    const { data } = await axios.get(`${process.env.EXPO_PUBLIC_BASE_API_URL}/api/bookmarks/check?slug=${slug}`, {
      headers: cookie ? { Cookie: cookie } : {},
    })
    return data as { isBookmarked: boolean }
  },

  addBookmark: async (comicData: { slug: string; title: string; thumbnail: string; type: string; status: string }) => {
    const cookie = await authClient.getCookie()
    const { data } = await axios.post(`${process.env.EXPO_PUBLIC_BASE_API_URL}/api/bookmarks`, comicData, {
      headers: cookie ? { Cookie: cookie } : {},
    })
    return data
  },

  removeBookmark: async (slug: string) => {
    const cookie = await authClient.getCookie()
    const { data } = await axios.delete(`${process.env.EXPO_PUBLIC_BASE_API_URL}/api/bookmarks?slug=${slug}`, {
      headers: cookie ? { Cookie: cookie } : {},
    })
    return data
  },
}
