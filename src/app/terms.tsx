import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Stack } from "expo-router"
import React from "react"
import { ScrollView } from "react-native"

export default function TermsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ketentuan Layanan",
          headerShown: true,
          headerBackTitle: "Kembali",
        }}
      />
      <ScrollView className="flex-1 bg-background-0" contentContainerStyle={{ padding: 16 }}>
        <VStack space="md" className="pb-8">
          <Text className="text-xl font-bold text-typography-900">Ketentuan Layanan (Terms of Service)</Text>
          <Text className="mb-2 text-sm text-typography-500">
            Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}
          </Text>

          <Text className="text-base leading-relaxed text-typography-700">
            Dengan mengunduh, mengakses, atau menggunakan aplikasi AltKomik, Anda setuju untuk terikat oleh Syarat dan
            Ketentuan Layanan ini. Jika Anda tidak setuju dengan ketentuan ini, harap jangan gunakan aplikasi kami.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">1. Penggunaan Layanan</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Aplikasi AltKomik disediakan untuk penggunaan pribadi dan non-komersial. Anda setuju untuk tidak
            menyalahgunakan layanan ini, termasuk tetapi tidak terbatas pada mendistribusikan virus, melakukan scraping
            data besar-besaran, atau aktivitas lain yang dapat mengganggu operasi layanan.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">2. Konten dan Hak Cipta</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Semua gambar komik, karakter, logo, dan karya seni yang ditampilkan di aplikasi AltKomik adalah milik
            masing-masing pencipta, penerbit, dan pemegang hak cipta yang bersangkutan. AltKomik hanya bertindak sebagai
            agregator yang memfasilitasi akses bacaan bagi komunitas. Jika Anda adalah pemilik hak cipta dan ingin
            konten Anda dihapus, silakan hubungi kami melalui Discord.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">3. Akun Pengguna</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Beberapa fitur (seperti bookmark) mungkin memerlukan Anda untuk membuat akun. Anda bertanggung jawab untuk
            menjaga kerahasiaan informasi login Anda dan atas semua aktivitas yang terjadi di bawah akun Anda.
          </Text>

          <Text className="mt-2 text-lg font-bold text-typography-900">4. Penafian Tanggung Jawab</Text>
          <Text className="text-base leading-relaxed text-typography-700">
            Aplikasi ini disediakan &quot;sebagaimana adanya&quot;. AltKomik tidak memberikan jaminan bahwa layanan ini
            akan selalu tersedia tanpa gangguan atau bebas dari kesalahan teknis.
          </Text>
        </VStack>
      </ScrollView>
    </>
  )
}
