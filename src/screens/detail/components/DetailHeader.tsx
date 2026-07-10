import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Image } from "expo-image"
import { router } from "expo-router"
import { ArrowLeft, Share2 } from "lucide-react-native"
import { Share, StyleSheet, View } from "react-native"

import { DetailHeaderProps } from "../types"

export const DetailHeader = ({ thumbnail, title, slug }: DetailHeaderProps) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Baca ${title} di AltKomik: https://www.altkomik.me/detail/${slug}`,
      })
    } catch (error) {
      console.error("Share failed:", error)
    }
  }

  return (
    <>
      <View className="absolute inset-x-0 top-0 h-[260px] ">
        <Image source={{ uri: thumbnail }} style={StyleSheet.absoluteFill} contentFit="cover" blurRadius={10} />
      </View>

      <HStack className="z-10 items-center justify-between px-3 pb-3 pt-6">
        <Pressable
          onPress={() => router.back()}
          className="size-12 items-center justify-center rounded-full bg-primary-500 active:bg-primary-600"
        >
          <Icon as={ArrowLeft} className="size-5 text-typography-white" />
        </Pressable>
        <Pressable
          onPress={handleShare}
          className="size-12 items-center justify-center rounded-full bg-primary-500 active:bg-primary-600"
        >
          <Icon as={Share2} className="size-5 text-typography-white" />
        </Pressable>
      </HStack>
    </>
  )
}
