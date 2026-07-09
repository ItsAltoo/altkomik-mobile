import axios from "axios"
import * as SecureStore from "expo-secure-store"

const API_BASE_URL = process.env.EXPO_PUBLIC_BASE_API_URL

export const ProfileRepository = {
  loginWithGoogle: async (idToken: string) => {
    const { data } = await axios.post(`${API_BASE_URL}/api/mobile-auth`, { idToken })
    return data
  },
  getBookmarks: async () => {
    const token = await SecureStore.getItemAsync("session_token")
    const { data } = await axios.get(`${API_BASE_URL}/api/bookmarks`, {
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
