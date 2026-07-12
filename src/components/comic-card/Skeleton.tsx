import { Box } from "@/components/ui/box"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
import { VStack } from "@/components/ui/vstack"
import React, { memo } from "react"

import { ComicCardVariant } from "./types"

type ComicCardSkeletonProps = {
  className?: string
  style?: any
  variant?: ComicCardVariant
}

export const ComicCardSkeleton = memo(({ className = "", style, variant = "default" }: ComicCardSkeletonProps) => {
  const isCompact = variant === "compact"
  const imageHeight = isCompact ? 150 : 180

  return (
    <Box
      style={style}
      className={`flex-1 overflow-hidden rounded-xl border border-outline-100 shadow-soft-1 ${className}`}
    >
      {/* IMAGE PLACEHOLDER */}
      <Skeleton variant="sharp" className="w-full bg-background-200" style={{ height: imageHeight }} />

      {/* INFO AREA PLACEHOLDER */}
      <VStack className="justify-between bg-background-0 p-2.5" style={{ height: isCompact ? 130 : 150 }}>
        <VStack className="w-full gap-2">
          <SkeletonText _lines={isCompact ? 1 : 2} gap={2} className="h-3 w-4/5 bg-background-700" />
          <SkeletonText _lines={1} className="mt-1 h-2 w-1/2 bg-background-700" />
          <SkeletonText _lines={1} className="h-2 w-2/3 bg-background-700" />
        </VStack>

        <Skeleton variant="rounded" className="h-7 w-full rounded-md bg-background-700" />
      </VStack>
    </Box>
  )
})

ComicCardSkeleton.displayName = "ComicCardSkeleton"
