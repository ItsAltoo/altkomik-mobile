import axios from "axios"
import * as SecureStore from "expo-secure-store"

export const ProfileRepository = {
  loginWithGoogle: async (idToken: string) => {
    // Post directly to the Next.js backend auth endpoint
    const { data } = await axios.post("https://www.altkomik.me/api/mobile-auth", { idToken })
    return data
  },
  getBookmarks: async () => {
    const token = await SecureStore.getItemAsync("session_token")
    const { data } = await axios.get("https://www.altkomik.me/api/bookmarks", {
      headers: token ? { Cookie: `next-auth.session-token=${token}` } : {},
    })
    return data
  },
}
