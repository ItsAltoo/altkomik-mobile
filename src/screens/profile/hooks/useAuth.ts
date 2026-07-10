import { create } from "zustand"
import * as SecureStore from "expo-secure-store"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { ProfileRepository } from "../repository"

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
  scopes: ["profile", "email"],
})

export const useAuth = create<AuthState>((set) => ({
  isLoading: false,
  isInitializing: true,
  token: null,
  userProfile: null,

  loadSession: async () => {
    const val = await SecureStore.getItemAsync("session_token")
    const profileStr = await SecureStore.getItemAsync("user_profile")

    let profile = null
    if (profileStr) {
      try {
        profile = JSON.parse(profileStr)
      } catch (e) {}
    }

    set({
      token: val,
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
      const user = userInfo.data?.user || userInfo.user

      if (!idToken) throw new Error("Gagal mendapatkan idToken dari Google")

      const data = await ProfileRepository.loginWithGoogle(idToken)
      if (data.success && data.token) {
        await SecureStore.setItemAsync("session_token", data.token)

        const profile = { name: user?.name || "User", email: user?.email || null, photo: user?.photo || null }
        await SecureStore.setItemAsync("user_profile", JSON.stringify(profile))

        set({ token: data.token, userProfile: profile })
      } else {
        console.error("Gagal login di sisi server:", data)
      }
    } catch (error) {
      console.error(error)
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
    await SecureStore.deleteItemAsync("session_token")
    await SecureStore.deleteItemAsync("user_profile")
    set({ token: null, userProfile: null })
  },
}))
