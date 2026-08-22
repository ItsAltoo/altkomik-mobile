import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { Link } from "expo-router"
import { StyleSheet } from "react-native"

import { Badge, BadgeText } from "@/components/ui/badge"
import { HStack } from "@/components/ui/hstack"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Comic } from "@/src/libs/types"

const ITEM_MARGIN_HORIZONTAL = 16 // mx-2 (8px) on both sides

type Props = {
  item: Comic
  cellWidth: number
}

export const CarouselItem = ({ item, cellWidth }: Props) => {
  const detailLink = `/detail-comic/${item.slug}` as any
  const itemWidth = cellWidth - ITEM_MARGIN_HORIZONTAL

  return (
    <Link href={detailLink} asChild>
      <Pressable
        className="mx-2 overflow-hidden rounded-xl transition-opacity active:opacity-95"
        style={{ width: itemWidth, height: 280 }}
      >
        <Image source={{ uri: item.thumbnail }} style={StyleSheet.absoluteFill} contentFit="cover" priority="high" />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.95)"]}
          locations={[0.2, 0.6, 1]}
          style={StyleSheet.absoluteFill}
        />

        <VStack className="absolute bottom-0 w-full gap-2 p-4 pt-10">
          <HStack className="items-center gap-2">
            {item.rank && (
              <Badge className="rounded-sm border-none bg-primary-500 px-1.5 py-0.5 shadow-hard-5">
                <BadgeText className="text-2xs font-bold text-white">#{item.rank} Trending</BadgeText>
              </Badge>
            )}
            {item.status?.genre && (
              <Badge className="rounded-sm border border-outline-0/20 bg-background-0/20 px-1.5 py-0.5 backdrop-blur-md">
                <BadgeText className="text-2xs font-medium text-white">{item.status.genre}</BadgeText>
              </Badge>
            )}
          </HStack>

          <Text className="text-xl font-extrabold tracking-tight text-white" numberOfLines={2}>
            {item.title}
          </Text>

          <HStack className="items-center gap-3">
            {item.latestChapter && <Text className="text-xs font-semibold text-primary-400">{item.latestChapter}</Text>}
            {item.status?.views && (
              <Text className="text-xs font-medium text-typography-300">• {item.status.views}</Text>
            )}
          </HStack>
        </VStack>
      </Pressable>
    </Link>
  )
}
