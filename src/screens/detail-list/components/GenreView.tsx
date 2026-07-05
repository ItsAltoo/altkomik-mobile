import { VStack } from "@/components/ui/vstack"
import { COMIC_SKELETON_DATA, MemoizedComicCardWrapper, isComicSkeleton } from "@/src/components/comic-card"
import { Footer } from "@/src/components/footer"
import { Pagination } from "@/src/components/pagination/Pagination"
import { useScrollToTop } from "@/src/libs/hooks/useScrollToTop"
import { ListEmptyState } from "@/src/components/empty-state/ListEmptyState"
import { ScrollToTopFab } from "@/src/components/ui/ScrollToTopFab"
import { useListContainerStyle } from "@/src/libs/hooks/useListContainerStyle"
import { FlashList } from "@shopify/flash-list"
import React, { useCallback, useState } from "react"
import { RefreshControl, View } from "react-native"
import { GenreFilters } from "./GenreFilters"
import { useGenreComics } from "../hooks/useGenreComics"
import { LatestParams } from "@/src/screens/latest/repository"

const numColumns = 2

export const GenreView = () => {
  const [filters, setFilters] = useState<LatestParams>({
    page: 1,
    type: "all",
    genre: "all",
    genre2: "all",
  })

  const { listRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop()
  const { data, isLoading, hasMore, error, mutate } = useGenreComics(filters)
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
      genre: "all",
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
    () => <ListEmptyState error={error} isLoading={isLoading} dataLength={data.length} />,
    [error, isLoading, data.length],
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
  const isInitialLoading = isLoading && data.length === 0
  const listData = isInitialLoading ? COMIC_SKELETON_DATA : data

  return (
    <View className="flex-1 bg-background-0">
      <GenreFilters filters={filters} setFilters={setFilters} />
      <View className="flex-1">
        <FlashList
          ref={listRef}
          data={listData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // @ts-ignore
          estimatedItemSize={456}
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
