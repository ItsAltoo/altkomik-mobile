import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Stack } from "expo-router"
import React from "react"
import { ScrollView } from "react-native"

export default function PrivacyScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Kebijakan Privasi",
          headerShown: true,
          headerBackTitle: "Kembali",
        }}
      />
      <ScrollView className="flex-1 bg-background-0" contentContainerStyle={{ padding: 16 }}>
        <VStack space="md" className="pb-8">
          <Text className="text-xl font-bold text-typography-900">Kebijakan Privasi</Text>
          <Text className="mb-2 text-sm text-typography-500">
            Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
          </Text>

          <Text className="text-base leading-relaxed text-typography-700">
            Privasi Anda penting bagi kami. Kebijakan Privasi ini menjelaskan bagaimana AltKomik mengumpulkan,
            menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan aplikasi kami.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">1. Informasi yang Kami Kumpulkan</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Saat Anda menggunakan AltKomik, kami dapat mengumpulkan informasi tertentu secara otomatis, termasuk alamat
            IP, jenis perangkat, sistem operasi, dan data penggunaan (seperti komik yang dibaca atau di-bookmark). Jika
            Anda memilih untuk masuk (login) menggunakan penyedia pihak ketiga (seperti Google atau Discord), kami akan
            menerima informasi profil dasar seperti nama dan alamat email.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">2. Penggunaan Informasi</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Informasi yang dikumpulkan digunakan semata-mata untuk menyediakan, memelihara, dan meningkatkan layanan
            kami. Kami menggunakan data Anda untuk menyimpan preferensi (seperti bookmark dan riwayat bacaan) serta
            memberikan rekomendasi konten yang lebih baik.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">3. Keamanan Data</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Kami mengimplementasikan berbagai langkah keamanan untuk menjaga keamanan informasi pribadi Anda. Namun,
            perlu diingat bahwa tidak ada metode transmisi melalui internet atau metode penyimpanan elektronik yang 100%
            aman dan andal, sehingga kami tidak dapat menjamin keamanan mutlaknya.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">4. Perubahan Kebijakan</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami menyarankan Anda untuk meninjau
            halaman ini secara berkala untuk setiap perubahan. Perubahan pada Kebijakan Privasi ini berlaku efektif
            ketika diunggah di halaman ini.
          </Text>
        </VStack>
      </ScrollView>
    </>
  )
}
