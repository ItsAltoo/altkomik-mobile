import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { ComicCard, ComicCardSkeleton } from "@/src/components/comic-card"
import { useListContainerStyle } from "@/src/libs/hooks/useListContainerStyle"
import { getGridItemWidth } from "@/src/libs/utils/layout"
import { FlashList } from "@shopify/flash-list"
import { ArrowUp } from "lucide-react-native"
import { useCallback, useMemo, useRef, useState } from "react"
import { RefreshControl, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { LatestEmptyState } from "./components/LatestEmptyState"
import { LatestFilters } from "./components/LatestFilters"
import { LatestFooter } from "./components/LatestFooter"
import { useLatestComics } from "./hooks/useLatestComics"
import { LatestParams } from "./repository"

const numColumns = 2
const cardWidth = getGridItemWidth(numColumns)
const cardStyle = { width: cardWidth }

// Extracted skeleton data to prevent re-creation on every render
const SKELETON_DATA = Array.from({ length: 6 }).map((_, i) => ({ id: `skeleton-${i}` }))

const LatestScreen = () => {
  const insets = useSafeAreaInsets()
  const [filters, setFilters] = useState<LatestParams>({
    type: "all",
    orderBy: "modified",
    status: "all",
    genre: "all",
    genre2: "all",
  })

  const listRef = useRef<any>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { data, isLoading, isLoadingMore, hasMore, loadMore, error, mutate } = useLatestComics(filters)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await mutate()
    setRefreshing(false)
  }, [mutate])

  const handleScroll = useCallback(
    (event: any) => {
      const offsetY = event.nativeEvent.contentOffset.y
      if (offsetY > 400 && !showScrollTop) {
        setShowScrollTop(true)
      } else if (offsetY <= 400 && showScrollTop) {
        setShowScrollTop(false)
      }
    },
    [showScrollTop],
  )

  const scrollToTop = useCallback(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true })
  }, [])

  const renderItem = useCallback(({ item }: { item: any }) => {
    if (item.id && typeof item.id === "string" && item.id.startsWith("skeleton-")) {
      return (
        <View className="mb-4">
          <ComicCardSkeleton style={cardStyle} className="h-[440px]" />
        </View>
      )
    }

    return (
      <View className="mb-4">
        <ComicCard {...item} style={cardStyle} className="h-[440px]" />
      </View>
    )
  }, [])

  const renderEmptyComponent = useCallback(
    () => <LatestEmptyState error={error} isLoading={isLoading} dataLength={data.length} />,
    [error, isLoading, data.length],
  )

  const renderFooter = useCallback(
    () => <LatestFooter isLoadingMore={isLoadingMore} hasMore={!!hasMore} dataLength={data.length} />,
    [isLoadingMore, hasMore, data.length],
  )

  // Memoize FlashList style using shared hook
  const contentContainerStyle = useListContainerStyle()

  // Memoize FAB style
  const fabStyle = useMemo(
    () => ({
      bottom: Math.max(insets.bottom + 24, 100),
    }),
    [insets.bottom],
  )

  // Use skeleton data if loading and no existing data
  const listData = isLoading && data.length === 0 ? SKELETON_DATA : data

  return (
    <View className="flex-1 bg-background-0">
      <LatestFilters filters={filters} setFilters={setFilters} />
      <View className="flex-1 px-4">
        <FlashList
          ref={listRef}
          data={listData}
          renderItem={renderItem}
          // @ts-ignore
          estimatedItemSize={440}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={contentContainerStyle}
          ListEmptyComponent={renderEmptyComponent}
          ListFooterComponent={renderFooter}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#8B5CF6" colors={["#8B5CF6"]} />
          }
        />
      </View>

      {showScrollTop && (
        <Pressable
          onPress={scrollToTop}
          style={fabStyle}
          className="absolute right-4 z-50 rounded-full bg-primary-500 p-3 transition-opacity shadow-hard-5 active:opacity-70"
        >
          <Icon as={ArrowUp} size="xl" className="text-typography-0" />
        </Pressable>
      )}
    </View>
  )
}

export default LatestScreen
