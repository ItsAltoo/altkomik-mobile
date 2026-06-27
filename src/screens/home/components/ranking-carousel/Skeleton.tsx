import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { useWindowDimensions } from "react-native";

export const ComicCarouselSkeleton = () => {
  const { width } = useWindowDimensions();
  const itemWidth = width - 32;

  return (
    <Box className="w-full bg-background-0 pb-4">
      <Box
        style={{ width: itemWidth, height: 280 }}
        className="relative overflow-hidden rounded-xl"
      >
        <Skeleton variant="sharp" className="w-full h-full absolute inset-0" />

        <Box className="absolute inset-0 bg-black/40" />

        <VStack className="absolute bottom-0 w-full p-4 gap-2">
          <HStack className="gap-2">
            <Skeleton variant="rounded" className="w-20 h-5 rounded-sm" />
            <Skeleton variant="rounded" className="w-16 h-5 rounded-sm" />
          </HStack>

          <VStack className="mt-1 gap-2">
            <SkeletonText _lines={1} className="h-5 w-3/4" />
            <SkeletonText _lines={1} className="h-5 w-1/2" />
          </VStack>

          <HStack className="gap-3 mt-1 items-center">
            <SkeletonText _lines={1} className="h-3 w-16" />
            <SkeletonText _lines={1} className="h-3 w-20" />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
