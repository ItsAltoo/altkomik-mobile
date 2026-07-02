import { Button, ButtonText } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Footer } from "@/src/components/footer"
import { Motion } from "@legendapp/motion"
import { FlashList } from "@shopify/flash-list"
import { useRouter } from "expo-router"
import { ArrowUp } from "lucide-react-native"
import { useRef, useState } from "react"
import { ActivityIndicator, Dimensions, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ComicImage } from "./components/ComicImage"
import { FloatingNav } from "./components/FloatingNav"
import { useReadComic } from "./hooks/useReadComic"

type ReadScreenProps = {
  slug: string
}

export const ReadScreen = ({ slug }: ReadScreenProps) => {
  const { data, isLoading, error } = useReadComic(slug)
  const [isNavVisible, setIsNavVisible] = useState(true)
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { width } = Dimensions.get("window")
  const flashListRef = useRef<any>(null)

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background-0">
        <ActivityIndicator size="large" color="#B331F1" />
        <Text className="mt-4 font-medium text-typography-500">Memuat Chapter...</Text>
      </View>
    )
  }

  if (error || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-background-950 p-4">
        <Text className="text-center font-bold text-error-500">Gagal memuat chapter.</Text>
        <Button size="md" variant="solid" action="primary" className="mt-4" onPress={() => router.back()}>
          <ButtonText>Kembali</ButtonText>
        </Button>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <VStack className="mt-8 px-2" style={{ paddingBottom: Math.max(insets.bottom + 100, 100) }}>
        <Text className="text-center font-bold text-typography-500">{data.title}</Text>
        <Footer />
      </VStack>
    )
  }

  const renderHeader = () => {
    return (
      <VStack className="px-2 pb-5 pt-8">
        <Text className="text-center font-bold text-typography-500">{data.title}</Text>
      </VStack>
    )
  }

  const scrollToTop = () => {
    flashListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  return (
    <View className="relative flex-1 bg-background-0">
      <FlashList
        ref={flashListRef}
        data={data.images}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ComicImage source={item} onPress={() => setIsNavVisible((prev) => !prev)} />}
        // @ts-ignore: estimatedItemSize is required by FlashList but types are sometimes broken
        estimatedItemSize={width * 1.5}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />

      <FloatingNav
        prevSlug={data.navigation.prev}
        nextSlug={data.navigation.next}
        listSlug={data.navigation.list}
        isVisible={isNavVisible}
        onScrollToTop={scrollToTop}
      />
    </View>
  )
}
