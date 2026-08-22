import { create } from "zustand"
import * as SecureStore from "expo-secure-store"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import Toast from "react-native-toast-message"
import { authClient } from "@/src/libs/auth-client"

interface AuthState {
  isLoading: boolean
  isInitializing: boolean
  token: string | null
  userProfile: { name: string; email: string | null; photo: string | null } | null
  loadSession: () => Promise<void>
  handleGoogleLogin: () => Promise<void>
  handleLogout: () => Promise<void>
}

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  scopes: ["profile", "email"],
})

export const useAuth = create<AuthState>((set) => ({
  isLoading: false,
  isInitializing: true,
  token: null,
  userProfile: null,

  loadSession: async () => {
    const cookie = await authClient.getCookie()
    const profileStr = await SecureStore.getItemAsync("user_profile")

    let profile = null
    if (profileStr) {
      try {
        profile = JSON.parse(profileStr)
      } catch (e) {}
    }

    set({
      token: cookie || null,
      userProfile: profile,
      isInitializing: false,
    })
  },

  handleGoogleLogin: async () => {
    set({ isLoading: true })
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo: any = await GoogleSignin.signIn()

      const idToken = userInfo.data?.idToken || userInfo.idToken

      if (!idToken) throw new Error("Gagal mendapatkan idToken dari Google")

      const { data, error } = await authClient.signIn.social({
        provider: "google",
        idToken: { token: idToken },
      })

      if (!error && data && "user" in data) {
        const cookie = await authClient.getCookie()
        const profile = {
          name: data.user?.name || "User",
          email: data.user?.email || null,
          photo: data.user?.image || null,
        }
        await SecureStore.setItemAsync("user_profile", JSON.stringify(profile))

        set({ token: cookie || null, userProfile: profile })
        Toast.show({
          type: "success",
          text1: "Login Berhasil",
          text2: "Selamat datang kembali di Altkomik!",
          position: "top",
          topOffset: 50,
        })
      } else {
        console.error("Gagal login di sisi server:", error)
        Toast.show({
          type: "error",
          text1: "Login Gagal",
          text2: "Gagal masuk ke akun. Silakan coba lagi nanti.",
          position: "top",
          topOffset: 50,
        })
      }
    } catch (error) {
      console.log("[Google Login Error]:", error)
      Toast.show({
        type: "error",
        text1: "Login Gagal",
        text2: "Gagal masuk ke akun. Silakan coba lagi nanti.",
        position: "top",
        topOffset: 50,
      })
    } finally {
      set({ isLoading: false })
    }
  },

  handleLogout: async () => {
    try {
      await GoogleSignin.signOut()
    } catch (error) {
      console.error(error)
    }
    await authClient.signOut()
    await SecureStore.deleteItemAsync("user_profile")
    set({ token: null, userProfile: null })
  },
}))
