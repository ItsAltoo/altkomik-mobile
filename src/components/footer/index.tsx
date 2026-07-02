import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import * as Linking from "expo-linking"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err))
  }

  return (
    <Box className="mt-6 w-full rounded-t-3xl border-t border-outline-100 bg-background-0 px-4 pt-8">
      <VStack className="items-center gap-6">
        <VStack className="items-center gap-2">
          <Image
            source={require("@/assets/images/noBg-altkomik-purple.png")}
            style={{ width: 120, height: 50 }}
            contentFit="cover"
            alt="AltKomik Logo"
          />
          <Text className="px-4 text-center text-sm font-medium text-typography-500">
            Baca komik, manhwa, dan manhua bahasa Indonesia terbaik dan terlengkap dengan mudah.
          </Text>
        </VStack>

        <HStack className="mt-2 flex-wrap justify-center gap-6">
          <Pressable
            onPress={() => handlePress("https://altkomik.com/about")}
            className="transition-opacity active:opacity-70"
          >
            <Text className="text-sm font-semibold text-typography-700">Tentang Kami</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress("https://altkomik.com/privacy")}
            className="transition-opacity active:opacity-70"
          >
            <Text className="text-sm font-semibold text-typography-700">Kebijakan Privasi</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress("https://altkomik.com/tos")}
            className="transition-opacity active:opacity-70"
          >
            <Text className="text-sm font-semibold text-typography-700">Ketentuan Layanan</Text>
          </Pressable>
        </HStack>

        <Box className="my-2 h-px w-full bg-outline-100" />

        <Text className="text-center text-xs font-medium text-typography-400">
          © {currentYear} AltKomik. All rights reserved.
        </Text>
      </VStack>
    </Box>
  )
}
