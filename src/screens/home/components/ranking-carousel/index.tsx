import { Box } from "@/components/ui/box"
import { FlatList, useWindowDimensions } from "react-native"

import { Comic } from "@/src/libs/types"
import { CarouselItem } from "./CarouselItem"
import { PaginationDots } from "./PaginationDots"
import { ComicCarouselSkeleton } from "./Skeleton"
import { useAutoSlide } from "./useAutoSlide"

type ComicCarouselProps = {
  data: Comic[]
  isLoading?: boolean
  autoPlay?: boolean
}

export const ComicCarousel = ({ data, isLoading = false, autoPlay = true }: ComicCarouselProps) => {
  const { width } = useWindowDimensions()
  const itemWidth = width - 32 // px-4 padding = 32px

  const { activeIndex, flatListRef, onScroll } = useAutoSlide(data?.length || 0, isLoading, autoPlay, itemWidth)

  if (isLoading) {
    return <ComicCarouselSkeleton />
  }

  if (!data || data.length === 0) return null

  const getItemLayout = (_: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  })

  return (
    <Box className="w-full bg-background-0">
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => item.slug || index.toString()}
        horizontal
        snapToInterval={itemWidth}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => <CarouselItem item={item}/>}
        getItemLayout={getItemLayout}
      />

      <PaginationDots dataLength={data.length} activeIndex={activeIndex} />
    </Box>
  )
}
