import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { BookOpen, Play, Trash2 } from "lucide-react-native"
import { useCallback, useState } from "react"
import { View } from "react-native"
import { FlashList } from "@shopify/flash-list"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { Footer } from "@/src/components/footer"
import { Pagination } from "@/src/components/pagination/Pagination"
import { ScrollToTopFab } from "@/src/components/ui/ScrollToTopFab"
import { useListContainerStyle } from "@/src/libs/hooks/useListContainerStyle"
import { useScrollToTop } from "@/src/libs/hooks/useScrollToTop"
import { ListEmptyState } from "@/src/components/empty-state/ListEmptyState"
import { useHistoryPaginated } from "../hooks/useHistoryPaginated"
import { useReadingHistory, useHydration } from "@/src/libs/store/useReadingHistory"
import { ListRowSkeleton } from "@/src/components/skeleton/ListRowSkeleton"

export const HistoryListView = () => {
  const [page, setPage] = useState(1)
  const router = useRouter()
  
  const { listRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop()
  const { data, hasMore, totalCount } = useHistoryPaginated(page)
  const deleteHistory = useReadingHistory((state) => state.deleteHistory)
  const isHydrated = useHydration()

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage)
      scrollToTop()
    },
    [scrollToTop],
  )

  const renderRightActions = (comicSlug: string) => {
    return (
      <Pressable
        onPress={() => deleteHistory(comicSlug)}
        className="mb-3 ml-2 flex-row items-center justify-center rounded-lg bg-error-500 px-6 active:bg-error-600"
      >
        <Icon as={Trash2} size="xl" className="text-typography-0" />
      </Pressable>
    )
  }

  const renderItem = useCallback(({ item }: { item: [string, any] }) => {
    const [comicSlug, progress] = item
    
    const displayTitle = progress.title || comicSlug
      .split("-")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    const lastChapterSlug = progress.lastReadChapter
    const chapterMatch = lastChapterSlug.match(/chapter[- ](.+)$/i)
    const chapterDisplay = chapterMatch ? `Chapter ${chapterMatch[1]}` : lastChapterSlug

    return (
      <View className="px-4">
        <Swipeable
          renderRightActions={() => renderRightActions(comicSlug)}
          overshootRight={false}
          containerStyle={{ overflow: "visible" }}
        >
          <Pressable
            onPress={() => router.push(`/detail-comic/${comicSlug}`)}
            className="mb-3 flex-row items-center justify-between rounded-lg border border-outline-100 bg-background-0 p-3 shadow-soft-1 transition-colors active:bg-background-50"
          >
            <HStack space="md" className="flex-1 items-center">
              {progress.thumbnail ? (
                <Image
                  source={{ uri: progress.thumbnail }}
                  style={{ width: 48, height: 64, borderRadius: 4 }}
                  contentFit="cover"
                />
              ) : (
                <Box className="size-12 items-center justify-center rounded-lg bg-primary-50">
                  <Icon as={BookOpen} size="md" className="text-primary-500" />
                </Box>
              )}
              <VStack className="flex-1">
                <Text className="font-bold text-typography-900" numberOfLines={1}>
                  {displayTitle}
                </Text>
                <Text className="mt-0.5 text-xs text-typography-500" numberOfLines={1}>
                  Terakhir: {chapterDisplay}
                </Text>
                <Text className="mt-0.5 text-xs text-typography-400">
                  {progress.readChapters?.length || 0} chapter dibaca
                </Text>
              </VStack>
            </HStack>
            <Pressable
              onPress={() => router.push(`/read/${progress.lastReadChapter}` as any)}
              className="ml-3 rounded-full bg-primary-500 p-2 active:bg-primary-600"
            >
              <Icon as={Play} size="sm" className="text-typography-0" />
            </Pressable>
          </Pressable>
        </Swipeable>
      </View>
    )
  }, [router, deleteHistory])

  const keyExtractor = useCallback((item: [string, any]) => item[0], [])

  const renderEmptyComponent = useCallback(() => {
    if (!isHydrated) {
      return (
        <View className="pt-2">
          <ListRowSkeleton count={8} itemClassName="mb-3 mx-4" />
        </View>
      )
    }
    return <ListEmptyState error={null} isLoading={false} dataLength={totalCount} />
  }, [totalCount, isHydrated])

  const renderFooter = useCallback(
    () => (
      <VStack className="items-center pb-8 pt-4">
        {totalCount > 0 && (
          <Pagination
            page={page}
            hasMore={!!hasMore}
            isLoading={false}
            onPageChange={handlePageChange}
          />
        )}
        <Footer />
      </VStack>
    ),
    [page, hasMore, handlePageChange, totalCount],
  )

  const contentContainerStyle = useListContainerStyle(16, 100, 100, 0)

  return (
    <View className="flex-1 bg-background-0">
      <View className="flex-1">
        <FlashList
          ref={listRef}
          data={data}
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
        />
      </View>
      <ScrollToTopFab isVisible={showScrollTop} onPress={scrollToTop} />
    </View>
  )
}
