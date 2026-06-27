import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";

type Props = {
  dataLength: number;
  activeIndex: number;
};

export const PaginationDots = ({ dataLength, activeIndex }: Props) => {
  if (dataLength === 0) return null;

  return (
    <HStack
      className="absolute bottom-6 w-full justify-center gap-1.5"
      pointerEvents="none"
    >
      {Array.from({ length: dataLength }).map((_, index) => (
        <Box
          key={index}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            activeIndex === index
              ? "w-6 bg-primary-500"
              : "w-1.5 bg-background-light/50"
          }`}
        />
      ))}
    </HStack>
  );
};
