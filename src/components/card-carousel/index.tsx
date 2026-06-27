import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { ComicCard, ComicCardProps } from "@/src/components/comic-card";
import { Dimensions, FlatList, View } from "react-native";
import { CardCarouselSkeleton } from "./Skeleton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SPACING = 16;
// Screen has px-4 (16px left + 16px right = 32px total).
// We want exactly 2 cards to fit in the available space.
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;
const SNAP_INTERVAL = CARD_WIDTH + SPACING;

type CardCarouselProps = {
  title?: string;
  data: ComicCardProps[];
  isLoading?: boolean;
};

export const CardCarousel = ({
  title,
  data,
  isLoading = false,
}: CardCarouselProps) => {
  if (isLoading) {
    return <CardCarouselSkeleton title={title} />;
  }

  if (!data || data.length === 0) return null;

  return (
    <Box className="w-full min-h-[380px]">
      {title && (
        <Text className="text-xl font-bold text-typography-900 mb-4 border-l-4 border-l-primary-500 pl-2">
          {title}
        </Text>
      )}
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        disableIntervalMomentum={true}
        snapToAlignment="start"
        keyExtractor={(item, index) => item.slug || index.toString()}
        contentContainerStyle={{ paddingRight: SPACING }}
        ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
        renderItem={({ item }) => (
          <ComicCard
            {...item}
            style={{ width: CARD_WIDTH, ...((item as any).style || {}) }}
            className={`h-[360px] ${item.className || ""}`}
          />
        )}
      />
    </Box>
  );
};
