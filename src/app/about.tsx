import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Stack } from "expo-router"
import React from "react"
import { ScrollView } from "react-native"

export default function AboutScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Tentang Kami",
          headerShown: true,
          headerBackTitle: "Kembali",
        }}
      />
      <ScrollView className="flex-1 bg-background-0" contentContainerStyle={{ padding: 16 }}>
        <VStack space="md" className="pb-8">
          <Text className="text-xl font-bold text-typography-900">Tentang AltKomik</Text>

          <Text className="text-base leading-relaxed text-typography-700">
            Selamat datang di AltKomik, platform baca komik, manhwa, dan manhua berbahasa Indonesia terbaik dan
            terlengkap. Misi kami adalah menyediakan akses yang mudah dan cepat bagi para penggemar komik di seluruh
            Indonesia untuk menikmati serial favorit mereka di mana saja dan kapan saja.
          </Text>

          <Text className="text-base leading-relaxed text-typography-700">
            AltKomik dibangun oleh komunitas pecinta komik, untuk komunitas. Kami terus berusaha untuk meningkatkan
            pengalaman membaca Anda dengan menghadirkan antarmuka pengguna yang modern, fitur bookmark, riwayat bacaan,
            dan masih banyak lagi.
          </Text>

          <Text className="mt-4 text-xl font-bold text-typography-900">Hubungi Kami</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Kami sangat menghargai masukan, kritik, maupun saran dari Anda. Jika Anda menemukan masalah pada aplikasi
            atau memiliki ide untuk fitur baru, jangan ragu untuk bergabung dan berdiskusi di server Discord komunitas
            kami.
          </Text>

          <Text className="mt-8 text-center text-sm text-typography-500">Versi Aplikasi: 1.0.0</Text>
        </VStack>
      </ScrollView>
    </>
  )
}
