import { VStack } from "@/components/ui/vstack"
import { COMIC_SKELETON_DATA, MemoizedComicCardWrapper, isComicSkeleton } from "@/src/components/comic-card"
import { Footer } from "@/src/components/footer"
import { Pagination } from "@/src/components/pagination/Pagination"
import { ScrollToTopFab } from "@/src/components/ui/ScrollToTopFab"
import { useListContainerStyle } from "@/src/libs/hooks/useListContainerStyle"
import { useScrollToTop } from "@/src/libs/hooks/useScrollToTop"
import { ListEmptyState } from "@/src/components/empty-state/ListEmptyState"
import { FlashList } from "@shopify/flash-list"
import { useCallback, useState } from "react"
import { RefreshControl, View } from "react-native"
import { useComicList } from "../hooks/useComicList"
import { ComicListParams } from "../repository"
import { ComicListFilters } from "./ComicListFilters"

const numColumns = 2

export const ComicListView = () => {
  const [filters, setFilters] = useState<ComicListParams>({
    page: 1,
    type: "all",
    letter: "all",
  })

  const { listRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop()
  const { data, isLoading, hasMore, error, mutate } = useComicList(filters)
  const [refreshing, setRefreshing] = useState(false)

  const handlePageChange = useCallback(
    (newPage: number) => {
      setFilters((prev) => ({ ...prev, page: newPage }))
      scrollToTop()
    },
    [scrollToTop],
  )

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    setFilters({
      page: 1,
      type: "all",
      letter: "all",
    })
    await mutate()
    setRefreshing(false)
  }, [mutate])

  const renderItem = useCallback(({ item, index }: { item: any; index: number }) => {
    const isEven = index % numColumns === 0
    return <MemoizedComicCardWrapper item={item} isEven={isEven} />
  }, [])

  const keyExtractor = useCallback((item: any, index: number) => {
    return isComicSkeleton(item) ? `skeleton-${index}` : item.slug
  }, [])

  const renderEmptyComponent = useCallback(
    () => <ListEmptyState error={error} isLoading={isLoading} dataLength={data.list.length} mascot="kita" />,
    [error, isLoading, data.list.length],
  )

  const renderFooter = useCallback(
    () => (
      <VStack className="items-center pb-8 pt-4">
        <Pagination
          page={filters.page || 1}
          hasMore={!!hasMore}
          isLoading={isLoading}
          onPageChange={handlePageChange}
        />
        <Footer />
      </VStack>
    ),
    [filters.page, hasMore, isLoading, handlePageChange],
  )

  // Memoize FlashList style using shared hook
  const contentContainerStyle = useListContainerStyle()

  // Use skeleton data if loading and no existing data
  const isInitialLoading = isLoading && data.list.length === 0
  const listData = isInitialLoading ? COMIC_SKELETON_DATA : data.list

  return (
    <View className="flex-1 bg-background-0">
      <ComicListFilters filters={filters} setFilters={setFilters} heading={data.heading} />
      <View className="flex-1">
        <FlashList
          ref={listRef}
          data={listData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // @ts-ignore
          estimatedItemSize={350}
          numColumns={numColumns}
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
