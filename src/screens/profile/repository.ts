import axios from "axios"
import { authClient } from "@/src/libs/auth-client"

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL

export const ProfileRepository = {
  getBookmarks: async () => {
    const cookie = await authClient.getCookie()
    const { data } = await axios.get(`${API_BASE_URL}/api/bookmarks`, {
      headers: cookie ? { Cookie: cookie } : {},
    })
    return data
  },
}
