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
  syncBookmarks: async (items: any[]): Promise<BookmarkResponse> => {
    const token = await SecureStore.getItemAsync("session_token")
    
    // Map items to match API_SEC.md POST /api/bookmarks/sync expected body
    const mappedItems = items.map((item) => ({
      id: item.id, // Included if it exists from the GET request
      title: item.title,
      slug: item.slug,
      status: item.status,
    }))

    const { data } = await axios.post<BookmarkResponse>(`${API_BASE_URL}/api/bookmarks/sync`, { items: mappedItems }, {
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
