import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { ComicCardSkeleton } from "@/src/components/comic-card";
import { Dimensions, ScrollView } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const SPACING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - 48) / 2;

type CardCarouselSkeletonProps = {
  title?: string;
};

export const CardCarouselSkeleton = ({ title }: CardCarouselSkeletonProps) => {
  return (
    <Box className="w-full min-h-[380px]">
      {title && (
        <Text className="text-xl font-bold text-typography-900 mb-4 border-l-4 border-l-primary-500 pl-2">
          {title}
        </Text>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: SPACING }}
      >
        <HStack style={{ gap: SPACING }}>
          {[1, 2, 3, 4].map((item) => (
            <ComicCardSkeleton
              key={item}
              style={{ width: CARD_WIDTH }}
              className="h-[360px]"
            />
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};
