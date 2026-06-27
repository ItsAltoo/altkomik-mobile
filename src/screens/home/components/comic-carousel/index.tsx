import { Box } from "@/components/ui/box";
import { FlatList } from "react-native";

import { RankingComic } from "../../types";
import { CarouselItem } from "./CarouselItem";
import { PaginationDots } from "./PaginationDots";
import { ComicCarouselSkeleton } from "./Skeleton";
import { useAutoSlide } from "./useAutoSlide";

type ComicCarouselProps = {
  data: RankingComic[];
  isLoading?: boolean;
  autoPlay?: boolean;
};

export const ComicCarousel = ({
  data,
  isLoading = false,
  autoPlay = true,
}: ComicCarouselProps) => {
  const { activeIndex, flatListRef, onScroll } = useAutoSlide(
    data?.length || 0,
    isLoading,
    autoPlay,
  );

  if (isLoading) {
    return <ComicCarouselSkeleton />;
  }

  if (!data || data.length === 0) return null;

  return (
    <Box className="w-full bg-background-0 pb-4">
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item, index) => item.slug || index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => <CarouselItem item={item} />}
      />

      <PaginationDots dataLength={data.length} activeIndex={activeIndex} />
    </Box>
  );
};
