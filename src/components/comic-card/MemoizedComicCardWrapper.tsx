import React, { memo } from "react"
import { View } from "react-native"
import { getGridItemWidth } from "@/src/libs/utils/layout"
import { ComicCard } from "./ComicCard"
import { ComicCardSkeleton } from "./Skeleton"
import { isComicSkeleton } from "./utils"

const numColumns = 2
const cardWidth = getGridItemWidth(numColumns)
const cardStyle = { width: cardWidth }

export const MemoizedComicCardWrapper = memo(
  ({ item, isEven }: { item: any; isEven: boolean }) => {
    // FlashList divides the container into 2 columns.
    // We use padding on a full-width View to create the gap,
    // avoiding pixel-math rounding errors that cause empty columns.
    const paddingClass = isEven ? "pr-2" : "pl-2"

    if (isComicSkeleton(item)) {
      return (
        <View className={`mb-4 w-full ${paddingClass}`}>
          <ComicCardSkeleton />
        </View>
      )
    }

    return (
      <View className={`mb-4 w-full ${paddingClass}`}>
        <ComicCard {...item} />
      </View>
    )
  },
  (prev, next) => {
    if (isComicSkeleton(prev.item) && isComicSkeleton(next.item)) return true
    return prev.item?.slug === next.item?.slug && prev.isEven === next.isEven
  },
)

MemoizedComicCardWrapper.displayName = "MemoizedComicCardWrapper"
