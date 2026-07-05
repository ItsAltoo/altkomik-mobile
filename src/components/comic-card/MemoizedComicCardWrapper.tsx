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
    const marginClass = isEven ? "mr-2" : "ml-2"

    if (isComicSkeleton(item)) {
      return (
        <View className={`mb-4 ${marginClass}`}>
          <ComicCardSkeleton style={cardStyle} className="h-[440px]" />
        </View>
      )
    }

    return (
      <View className={`mb-4 ${marginClass}`}>
        <ComicCard {...item} style={cardStyle} className="h-[440px]" />
      </View>
    )
  },
  (prev, next) => {
    if (isComicSkeleton(prev.item) && isComicSkeleton(next.item)) return true
    return prev.item?.slug === next.item?.slug && prev.isEven === next.isEven
  },
)

MemoizedComicCardWrapper.displayName = "MemoizedComicCardWrapper"
