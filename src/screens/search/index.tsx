import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { ComicCard, ComicCardSkeleton } from "@/src/components/comic-card"
import { Footer } from "@/src/components/footer"
import { FlashList } from "@shopify/flash-list"
import { useLocalSearchParams } from "expo-router"
import { SearchX } from "lucide-react-native"
import { View } from "react-native"
import { useSearchComics } from "./hooks/useSearchComics"

import { getGridItemWidth } from "@/src/libs/utils/layout"
import { useListContainerStyle } from "@/src/libs/hooks/useListContainerStyle"
import { useCallback } from "react"

const numColumns = 2
const cardWidth = getGridItemWidth(numColumns)
const cardStyle = { width: cardWidth }

// Extracted skeleton data to prevent re-creation on every render
const SKELETON_DATA = Array.from({ length: 6 }).map((_, i) => ({ id: `skeleton-${i}` }))

const SearchScreen = () => {
  const { q } = useLocalSearchParams<{ q: string }>()
  const query = q || ""
  const { data, isLoading, error } = useSearchComics(query)

  const renderItem = useCallback(({ item }: { item: any }) => {
    if (item.id && typeof item.id === "string" && item.id.startsWith("skeleton-")) {
      return (
        <View className="mb-4">
          <ComicCardSkeleton style={cardStyle} className="h-[360px]" />
        </View>
      )
    }

    return (
      <View className="mb-4">
        <ComicCard {...item} style={cardStyle} className="h-[360px]" />
      </View>
    )
  }, [])

  const renderEmptyComponent = useCallback(() => {
    if (error) {
      return (
        <View className="items-center justify-center py-20">
          <Text className="text-center text-error-500">Terjadi kesalahan saat memuat data pencarian.</Text>
        </View>
      )
    }

    if (!isLoading && data.length === 0) {
      return (
        <View className="items-center justify-center py-20">
          <VStack className="items-center gap-4">
            <Icon as={SearchX} size="xl" className="text-typography-400" />
            <Text className="text-center text-lg font-medium text-typography-500">
              {query ? `Tidak ada komik yang cocok dengan "${query}"` : "Ketik judul komik untuk mencari"}
            </Text>
          </VStack>
        </View>
      )
    }

    return null
  }, [error, isLoading, data.length, query])

  const contentContainerStyle = useListContainerStyle()

  const listData = isLoading && data.length === 0 ? SKELETON_DATA : data

  return (
    <View className="flex-1 bg-background-0">
      <View className="px-4 pb-2 pt-4">
        <Text className="text-xl font-bold text-typography-900">
          {query ? `Hasil Pencarian: "${query}"` : "Cari Komik"}
        </Text>
      </View>

      <View className="flex-1 px-4">
        <FlashList
          data={listData}
          renderItem={renderItem}
          // @ts-ignore: estimatedItemSize is required by FlashList but types are sometimes broken
          estimatedItemSize={360}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={<Footer />}
        />
      </View>
    </View>
  )
}

export default SearchScreen
