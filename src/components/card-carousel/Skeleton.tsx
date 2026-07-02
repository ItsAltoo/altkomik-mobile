import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Text } from "@/components/ui/text"
import { ComicCardSkeleton } from "@/src/components/comic-card"
import { ScrollView, useWindowDimensions } from "react-native"

type CardCarouselSkeletonProps = {
  title?: string
}

export const CardCarouselSkeleton = ({ title }: CardCarouselSkeletonProps) => {
  const { width } = useWindowDimensions()
  const cardWidth = (width - 48) / 2

  return (
    <Box className="w-full">
      {title && (
        <Text className="mb-4 border-l-4 border-l-primary-500 pl-2 text-xl font-bold text-typography-900">{title}</Text>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="pr-4">
        <HStack className="gap-4">
          {[1, 2, 3, 4].map((item) => (
            <ComicCardSkeleton key={item} style={{ width: cardWidth }} className="h-[360px]" />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  )
}
