import { Box } from "@/components/ui/box"
import { Text } from "@/components/ui/text"
import { ComicCard, ComicCardProps } from "@/src/components/comic-card"
import { FlatList, useWindowDimensions } from "react-native"
import { CardCarouselSkeleton } from "./Skeleton"

type CardCarouselProps<T extends ComicCardProps = ComicCardProps> = {
  title?: string
  data: T[]
  isLoading?: boolean
}

export function CardCarousel<T extends ComicCardProps>({ title, data, isLoading = false }: CardCarouselProps<T>) {
  const { width } = useWindowDimensions()

  // Screen has px-4 (16px left + 16px right = 32px total).
  // We want exactly 2 cards to fit in the available space.
  const cardWidth = (width - 48) / 2
  const snapInterval = cardWidth + 14 // 16px spacing (w-4)

  const baseCardStyle = { width: cardWidth }

  if (isLoading) {
    return <CardCarouselSkeleton title={title} />
  }

  if (!data || data.length === 0) return null

  const renderItem = ({ item }: { item: T }) => {
    // Avoid inline style object to make React.memo work perfectly
    const customStyle = (item as any).style
    const finalStyle = customStyle ? { width: cardWidth, ...customStyle } : baseCardStyle

    return <ComicCard {...item} variant="compact" style={finalStyle} className={`${item.className || ""}`} />
  }

  const renderSeparator = () => <Box className="w-4" />

  return (
    <Box className="w-full">
      {title && (
        <Text className="mb-4 border-l-4 border-l-primary-500 pl-2 text-xl font-bold text-typography-900">{title}</Text>
      )}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        snapToAlignment="start"
        keyExtractor={(item, index) => item.slug || index.toString()}
        contentContainerClassName="pr-4"
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </Box>
  )
}
