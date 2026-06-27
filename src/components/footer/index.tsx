import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import * as Linking from "expo-linking";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handlePress = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err),
    );
  };

  return (
    <Box className="w-full bg-background-0 px-4 pt-8 pb-32 mt-6 rounded-t-3xl border-t border-outline-100">
      <VStack className="gap-6 items-center">
        <VStack className="items-center gap-2">
          <Image
            source={require("@/assets/images/noBg-altkomik-purple.png")}
            style={{ width: 120, height: 50 }}
            contentFit="cover"
            alt="AltKomik Logo"
          />
          <Text className="text-sm font-medium text-typography-500 text-center px-4">
            Baca komik, manhwa, dan manhua bahasa Indonesia terbaik dan
            terlengkap dengan mudah.
          </Text>
        </VStack>

        <HStack className="gap-6 flex-wrap justify-center mt-2">
          <Pressable
            onPress={() => handlePress("https://altkomik.com/about")}
            className="active:opacity-70 transition-opacity"
          >
            <Text className="text-sm font-semibold text-typography-700">
              Tentang Kami
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress("https://altkomik.com/privacy")}
            className="active:opacity-70 transition-opacity"
          >
            <Text className="text-sm font-semibold text-typography-700">
              Kebijakan Privasi
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handlePress("https://altkomik.com/tos")}
            className="active:opacity-70 transition-opacity"
          >
            <Text className="text-sm font-semibold text-typography-700">
              Ketentuan Layanan
            </Text>
          </Pressable>
        </HStack>

        <Box className="w-full h-[1px] bg-outline-100 my-2" />

        <Text className="text-xs font-medium text-typography-400 text-center">
          © {currentYear} AltKomik. All rights reserved.
        </Text>
      </VStack>
    </Box>
  );
};
