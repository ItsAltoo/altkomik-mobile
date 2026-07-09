import axios from "axios"
import * as SecureStore from "expo-secure-store"
import { BookmarkResponse } from "@/src/libs/types"

const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL

export const LibraryRepository = {
  getBookmarks: async (page = 1, limit = 10): Promise<BookmarkResponse> => {
    const token = await SecureStore.getItemAsync("session_token")
    const { data } = await axios.get<BookmarkResponse>(`${API_BASE_URL}/api/bookmarks?page=${page}&limit=${limit}`, {
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
