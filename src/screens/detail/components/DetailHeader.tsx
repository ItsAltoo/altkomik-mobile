import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ArrowLeft, Share2 } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { DetailHeaderProps } from "../types";

export function DetailHeader({ thumbnail }: DetailHeaderProps) {
  return (
    <>
      <View className="absolute left-0 right-0 top-0 h-[260px] ">
        <Image
          source={{ uri: thumbnail }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          blurRadius={10}
        />
      </View>

      <HStack className="z-10 items-center justify-between px-3 pb-3 pt-6">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full bg-primary-500"
        >
          <Icon as={ArrowLeft} className="h-5 w-5 text-typography-white" />
        </Pressable>
        <Pressable className="h-12 w-12 items-center justify-center rounded-full bg-primary-500">
          <Icon as={Share2} className="h-5 w-5 text-typography-white" />
        </Pressable>
      </HStack>
    </>
  );
}
