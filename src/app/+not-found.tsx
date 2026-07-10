import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import { Stack, useRouter } from "expo-router"
import React from "react"
import { View } from "react-native"

export default function NotFoundScreen() {
  const router = useRouter()

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 items-center justify-center bg-background-0">
        <MascotEmptyState
          mascot="kita"
          title="Halaman Tidak Ditemukan"
          description="Sepertinya halaman yang kamu cari tidak ada atau sudah dipindahkan."
          size="lg"
          actionLabel="Kembali ke Beranda"
          onAction={() => router.replace("/")}
        />
      </View>
    </>
  )
}
