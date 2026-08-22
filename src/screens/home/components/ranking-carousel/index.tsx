import { Box } from "@/components/ui/box"
import { useCallback, useState } from "react"
import { useWindowDimensions } from "react-native"
import { Carousel } from "react-native-reanimated-carousel"

import { Comic } from "@/src/libs/types"
import { CarouselItem } from "./CarouselItem"
import { PaginationDots } from "./PaginationDots"
import { ComicCarouselSkeleton } from "./Skeleton"

type ComicCarouselProps = {
  data: Comic[]
  isLoading?: boolean
  autoPlay?: boolean
}

export const ComicCarousel = ({ data, isLoading = false, autoPlay = true }: ComicCarouselProps) => {
  const { width } = useWindowDimensions()
  const itemWidth = width - 32 // px-4 padding = 32px
  const [activeIndex, setActiveIndex] = useState(0)

  const onSnapToItem = useCallback((index: number) => setActiveIndex(index), [])

  if (isLoading) {
    return <ComicCarouselSkeleton />
  }

  if (!data || data.length === 0) return null

  return (
    <Box className="w-full bg-background-0">
      <Carousel
        style={{ width: itemWidth, height: 280 }}
        data={data}
        loop={data.length > 1}
        autoplay={autoPlay && data.length > 1}
        autoplayInterval={4000}
        onSnapToItem={onSnapToItem}
        renderItem={({ item }) => <CarouselItem item={item} cellWidth={itemWidth} />}
      />

      <PaginationDots dataLength={data.length} activeIndex={activeIndex} />
    </Box>
  )
}
