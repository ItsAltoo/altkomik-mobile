import { HStack } from "@/components/ui/hstack"
import { Skeleton, SkeletonText } from "@/components/ui/skeleton"
import { VStack } from "@/components/ui/vstack"
import React, { memo } from "react"
import { View } from "react-native"

type ListRowSkeletonProps = {
  count?: number
  containerClassName?: string
  itemClassName?: string
  gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"
}

export const ListRowSkeleton = memo(
  ({ count = 5, containerClassName = "w-full", itemClassName = "", gap }: ListRowSkeletonProps) => {
    return (
      <VStack space={gap} className={containerClassName}>
        {Array.from({ length: count }).map((_, i) => (
          <View
            key={i}
            className={`flex-row items-center justify-between rounded-lg border border-outline-100 bg-background-0 p-3 shadow-soft-1 ${itemClassName}`}
          >
            <HStack space="md" className="flex-1 items-center">
              <Skeleton variant="rounded" style={{ width: 48, height: 64 }} />
              <VStack className="flex-1 justify-center gap-1.5">
                <SkeletonText _lines={1} style={{ height: 16, width: "75%" }} />
                <SkeletonText _lines={1} style={{ height: 12, width: "50%" }} />
                <SkeletonText _lines={1} style={{ height: 12, width: "33%" }} />
              </VStack>
            </HStack>
            <Skeleton variant="circular" style={{ width: 32, height: 32, marginLeft: 12 }} />
          </View>
        ))}
      </VStack>
    )
  },
)

ListRowSkeleton.displayName = "ListRowSkeleton"
