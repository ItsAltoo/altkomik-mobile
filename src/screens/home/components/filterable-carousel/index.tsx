import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { CardCarousel } from "@/src/components/card-carousel";
import { Comic } from "@/src/libs/types";
import { startTransition } from "react";
import { ScrollView, View } from "react-native";

type FilterableCarouselProps = {
  title: string;
  type: "all" | "manga" | "manhwa" | "manhua";
  setType: (type: "all" | "manga" | "manhwa" | "manhua") => void;
  data: Comic[] | undefined;
  isLoading: boolean;
};

const filterOptions = [
  { label: "Semua", value: "all" },
  { label: "Manga", value: "manga" },
  { label: "Manhwa", value: "manhwa" },
  { label: "Manhua", value: "manhua" },
] as const;

export const FilterableCarousel = ({
  title,
  type,
  setType,
  data,
  isLoading,
}: FilterableCarouselProps) => {
  return (
    <View>
      <HStack className="justify-between items-center mb-4">
        <Text className="text-xl font-bold text-typography-900 border-l-4 border-l-primary-500 pl-2">
          {title}
        </Text>
      </HStack>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4"
      >
        <HStack className="gap-2">
          {filterOptions.map((opt) => (
            <Pressable
              key={opt.value}
              onPress={() => {
                startTransition(() => {
                  setType(opt.value);
                });
              }}
              className={`px-4 py-1.5 rounded-full border ${
                type === opt.value
                  ? "bg-primary-500 border-primary-500"
                  : "bg-background-0 border-outline-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  type === opt.value
                    ? "text-typography-0"
                    : "text-typography-500"
                }`}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>

      <CardCarousel data={data || []} isLoading={isLoading} />
    </View>
  );
};
