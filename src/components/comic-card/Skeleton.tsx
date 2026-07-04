import { Box } from "@/components/ui/box"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
import { VStack } from "@/components/ui/vstack"
import React, { memo } from "react"

export const ComicCardSkeleton = memo(({ className = "", style }: { className?: string; style?: any }) => {
  return (
    <Box
      style={style}
      className={`flex-1 overflow-hidden rounded-xl border border-outline-100 bg-background-0 shadow-soft-1 ${className}`}
    >
      {/* IMAGE PLACEHOLDER */}
      <Skeleton variant="sharp" className="h-[180px] w-full bg-background-200" />

      {/* CONTENT PLACEHOLDER */}
      <VStack className="flex-1 justify-between gap-3 bg-background-0 p-3">
        <VStack className="gap-2">
          <SkeletonText _lines={2} gap={2} className="h-3 w-4/5 bg-background-200" />
        </VStack>

        <VStack className="mt-auto gap-3 pt-2">
          {/* Metadata Placeholders */}
          <VStack className="gap-2">
            <SkeletonText _lines={1} className="h-2 w-1/2 bg-background-200" />
            <SkeletonText _lines={1} className="h-2 w-2/3 bg-background-200" />
          </VStack>

          {/* Action Buttons Placeholders */}
          <VStack className="w-full gap-2">
            <Skeleton variant="rounded" className="h-7 w-full rounded-md bg-background-200" />
            <Skeleton variant="rounded" className="h-7 w-full rounded-md bg-background-200" />
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
})

ComicCardSkeleton.displayName = "ComicCardSkeleton"
