import { ApiResponse, ComicDetail, SimilarComic } from "@/src/libs/types"
import api from "@/src/libs/utils/api"
import axios from "axios"
import * as SecureStore from "expo-secure-store"

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
    const token = await SecureStore.getItemAsync("session_token")
    const { data } = await axios.get(`${process.env.EXPO_PUBLIC_BASE_API_URL}/api/bookmarks/check?slug=${slug}`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            Cookie: `next-auth.session-token=${token}; __Secure-next-auth.session-token=${token}`,
          }
        : {},
    })
    return data as { isBookmarked: boolean }
  },

  addBookmark: async (comicData: { slug: string; title: string; thumbnail: string; type: string; status: string }) => {
    const token = await SecureStore.getItemAsync("session_token")
    const { data } = await axios.post(`${process.env.EXPO_PUBLIC_BASE_API_URL}/api/bookmarks`, comicData, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            Cookie: `next-auth.session-token=${token}; __Secure-next-auth.session-token=${token}`,
          }
        : {},
    })
    return data
  },

  removeBookmark: async (slug: string) => {
    const token = await SecureStore.getItemAsync("session_token")
    const { data } = await axios.delete(`${process.env.EXPO_PUBLIC_BASE_API_URL}/api/bookmarks?slug=${slug}`, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
            Cookie: `next-auth.session-token=${token}; __Secure-next-auth.session-token=${token}`,
          }
        : {},
    })
    return data
  },
}
