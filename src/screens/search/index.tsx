import { Text } from "@/components/ui/text"
import { COMIC_SKELETON_DATA, ComicCard, ComicCardSkeleton, isComicSkeleton } from "@/src/components/comic-card"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import { Footer } from "@/src/components/footer"
import { FlashList } from "@shopify/flash-list"
import { useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { useSearchComics } from "./hooks/useSearchComics"

import { useListContainerStyle } from "@/src/libs/hooks/useListContainerStyle"
import { getGridItemWidth } from "@/src/libs/utils/layout"
import { useCallback } from "react"

const numColumns = 2
const cardWidth = getGridItemWidth(numColumns)
const cardStyle = { width: cardWidth }

const SearchScreen = () => {
  const { q } = useLocalSearchParams<{ q: string }>()
  const query = (Array.isArray(q) ? q[0] : q) || ""
  const { data, isLoading, error } = useSearchComics(query)

  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => {
    const isEven = index % numColumns === 0
    const marginClass = isEven ? "mr-2" : "ml-2"

    if (isComicSkeleton(item)) {
      return (
        <View className={`mb-4 ${marginClass}`}>
          <ComicCardSkeleton style={cardStyle} />
        </View>
      )
    }

    return (
      <View className={`mb-4 ${marginClass}`}>
        <ComicCard {...item} style={cardStyle} />
      </View>
    )
  }, [])

  const renderEmptyComponent = useCallback(() => {
    if (error) {
      return (
        <MascotEmptyState
          mascot="kita"
          title="Terjadi Kesalahan"
          description="Terjadi kesalahan saat memuat data pencarian."
          size="md"
        />
      )
    }

    if (!isLoading && data.length === 0) {
      return (
        <MascotEmptyState
          mascot="kita"
          title={query ? "Tidak Ditemukan" : "Cari Komik"}
          description={query ? `Tidak ada komik yang cocok dengan "${query}"` : "Ketik judul komik untuk mencari"}
          size="md"
        />
      )
    }

    return null
  }, [error, isLoading, data.length, query])

  const contentContainerStyle = useListContainerStyle()

  const listData = isLoading && data.length === 0 ? COMIC_SKELETON_DATA : data

  return (
    <View className="flex-1 bg-background-0">
      <View className="px-4 pb-2 pt-4">
        <Text className="text-xl font-bold text-typography-900">
          {query ? `Hasil Pencarian: "${query}"` : "Cari Komik"}
        </Text>
      </View>

      <View className="flex-1">
        <FlashList
          data={listData}
          renderItem={renderItem}
          // @ts-ignore: estimatedItemSize is required by FlashList but types are sometimes broken
          estimatedItemSize={350}
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
