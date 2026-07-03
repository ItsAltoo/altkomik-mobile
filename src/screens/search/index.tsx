import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { ComicCard, ComicCardSkeleton } from "@/src/components/comic-card"
import { Footer } from "@/src/components/footer"
import { FlashList } from "@shopify/flash-list"
import { useLocalSearchParams } from "expo-router"
import { SearchX } from "lucide-react-native"
import { Dimensions, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSearchComics } from "./hooks/useSearchComics"

const { width } = Dimensions.get("window")
const numColumns = 2
// Calculating card width considering padding (px-4 = 16px each side) and gap between cards
const cardWidth = (width - 32 - 16) / numColumns

const SearchScreen = () => {
  const { q } = useLocalSearchParams<{ q: string }>()
  const query = q || ""
  const { data, isLoading, error } = useSearchComics(query)
  const insets = useSafeAreaInsets()

  const renderItem = ({ item }: { item: any }) => {
    if (isLoading) {
      return (
        <View className="mb-4">
          <ComicCardSkeleton style={{ width: cardWidth }} className="h-[360px]" />
        </View>
      )
    }

    return (
      <View className="mb-4">
        <ComicCard {...item} style={{ width: cardWidth }} className="h-[360px]" />
      </View>
    )
  }

  const renderEmptyComponent = () => {
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
  }

  return (
    <View className="flex-1 bg-background-0">
      <View className="px-4 pb-2 pt-4">
        <Text className="text-xl font-bold text-typography-900">
          {query ? `Hasil Pencarian: "${query}"` : "Cari Komik"}
        </Text>
      </View>

      <View className="flex-1 px-4">
        <FlashList
          data={isLoading ? Array.from({ length: 6 }).map((_, i) => ({ id: i })) : data}
          renderItem={renderItem}
          // @ts-ignore: estimatedItemSize is required by FlashList but types are sometimes broken
          estimatedItemSize={360}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 100, 100), paddingTop: 8 }}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={<Footer />}
        />
      </View>
    </View>
  )
}

export default SearchScreen
