import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { ChevronRight, LogIn } from "lucide-react-native"
import { useCallback, useState } from "react"
import { RefreshControl, View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { Footer } from "@/src/components/footer"
import { Pagination } from "@/src/components/pagination/Pagination"
import { ScrollToTopFab } from "@/src/components/ui/ScrollToTopFab"
import { useListContainerStyle } from "@/src/libs/hooks/useListContainerStyle"
import { useScrollToTop } from "@/src/libs/hooks/useScrollToTop"
import { ListEmptyState } from "@/src/components/empty-state/ListEmptyState"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import { useBookmarks } from "../hooks/useBookmarks"
import { useAuth } from "@/src/screens/profile/hooks/useAuth"
import { ListRowSkeleton } from "@/src/components/skeleton/ListRowSkeleton"

export const BookmarkListView = () => {
  const [page, setPage] = useState(1)
  const router = useRouter()

  const { token, isInitializing } = useAuth()
  const { listRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop()
  const { data, isLoading, hasMore, error, mutate } = useBookmarks(token, page)
  const [refreshing, setRefreshing] = useState(false)

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage)
      scrollToTop()
    },
    [scrollToTop],
  )

  const onRefresh = useCallback(async () => {
    if (!token) return
    setRefreshing(true)
    setPage(1)
    await mutate()
    setRefreshing(false)
  }, [mutate, token])

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <Pressable
          onPress={() => router.push(`/detail-comic/${item.slug}`)}
          className="mx-4 mb-3 flex-row items-center justify-between rounded-lg border border-outline-100 bg-background-0 p-3 transition-colors shadow-soft-1 active:bg-background-50"
        >
          <HStack space="md" className="flex-1 items-center">
            <Image
              source={{ uri: item.thumbnail }}
              style={{ width: 48, height: 64, borderRadius: 4 }}
              contentFit="cover"
            />
            <VStack className="flex-1">
              <Text className="font-bold text-typography-900" numberOfLines={1}>
                {item.title}
              </Text>
              <Text className="mt-0.5 text-xs text-typography-500" numberOfLines={1}>
                {item.type} • {item.status}
              </Text>
              {item.chapters?.latest && (
                <Text className="mt-0.5 text-xs text-primary-500" numberOfLines={1}>
                  {item.chapters.latest.title}
                </Text>
              )}
            </VStack>
          </HStack>
          <Icon as={ChevronRight} size="sm" className="text-typography-400" />
        </Pressable>
      )
    },
    [router],
  )

  const keyExtractor = useCallback((item: any) => item.slug, [])

  const renderEmptyComponent = useCallback(() => {
    if (isInitializing) return null
    if (!token) {
      return (
        <MascotEmptyState
          mascot="nijika"
          title="Masuk untuk melihat Bookmark"
          description="Silakan login melalui menu profil untuk mengakses daftar bookmark Anda."
          size="md"
        />
      )
    }
    if (isLoading) {
      return (
        <View className="pt-2">
          <ListRowSkeleton count={8} itemClassName="mb-3 mx-4" />
        </View>
      )
    }
    return <ListEmptyState error={error} isLoading={isLoading} dataLength={data.result.length} mascot="nijika" />
  }, [error, isLoading, data.result.length, token, isInitializing])

  const renderFooter = useCallback(
    () => (
      <VStack className="items-center pb-8 pt-4">
        {token && data.result.length > 0 && (
          <Pagination page={page} hasMore={!!hasMore} isLoading={isLoading} onPageChange={handlePageChange} />
        )}
        <Footer />
      </VStack>
    ),
    [page, hasMore, isLoading, handlePageChange, token, data.result.length],
  )

  const contentContainerStyle = useListContainerStyle(16, 100, 100, 0) // No horizontal padding here since it's on the items

  return (
    <View className="flex-1 bg-background-0">
      <View className="flex-1">
        <FlashList
          ref={listRef}
          data={data.result}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // @ts-ignore
          estimatedItemSize={90}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={contentContainerStyle}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" colors={["#8B5CF6"]} />
          }
        />
      </View>
      <ScrollToTopFab isVisible={showScrollTop} onPress={scrollToTop} />
    </View>
  )
}
