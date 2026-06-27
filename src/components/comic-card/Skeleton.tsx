import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";

export const ComicCardSkeleton = ({
  className = "",
  style,
}: {
  className?: string;
  style?: any;
}) => {
  return (
    <Box
      style={style}
      className={`flex-1 bg-background-0 border border-outline-100 shadow-soft-1 rounded-xl overflow-hidden ${className}`}
    >
      {/* IMAGE PLACEHOLDER */}
      <Skeleton variant="sharp" className="w-full h-[180px]" />

      {/* CONTENT PLACEHOLDER */}
      <VStack className="p-3 gap-3 flex-1 justify-between bg-background-0">
        <VStack className="gap-2">
          <SkeletonText _lines={2} gap={2} className="h-3 w-4/5" />
        </VStack>

        <VStack className="mt-auto gap-3 pt-2">
          {/* Metadata Placeholders */}
          <VStack className="gap-2">
            <SkeletonText _lines={1} className="h-2 w-1/2" />
            <SkeletonText _lines={1} className="h-2 w-2/3" />
          </VStack>

          {/* Action Buttons Placeholders */}
          <HStack className="w-full gap-2">
            <Skeleton variant="rounded" className="flex-1 h-7 rounded-md" />
            <Skeleton variant="rounded" className="flex-1 h-7 rounded-md" />
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
