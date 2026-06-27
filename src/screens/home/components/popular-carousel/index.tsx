import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { CardCarousel } from "@/src/components/card-carousel";
import { startTransition } from "react";
import { ScrollView, View } from "react-native";
import { Comic } from "@/src/libs/types";

type PopularCarouselProps = {
  popularType: "all" | "manga" | "manhwa" | "manhua";
  setPopularType: (type: "all" | "manga" | "manhwa" | "manhua") => void;
  popularData: Comic[] | undefined;
  isLoadingPopular: boolean;
};

const filterOptions = [
  { label: "Semua", value: "all" },
  { label: "Manga", value: "manga" },
  { label: "Manhwa", value: "manhwa" },
  { label: "Manhua", value: "manhua" },
] as const;

export const PopularCarousel = ({
  popularType,
  setPopularType,
  popularData,
  isLoadingPopular,
}: PopularCarouselProps) => {
  return (
    <View className="mt-6">
      <HStack className="justify-between items-center mb-4">
        <Text className="text-xl font-bold text-typography-900 border-l-4 border-l-primary-500 pl-2">
          Populer
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
                  setPopularType(opt.value);
                });
              }}
              className={`px-4 py-1.5 rounded-full border ${
                popularType === opt.value
                  ? "bg-primary-500 border-primary-500"
                  : "bg-background-0 border-outline-200"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  popularType === opt.value
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

      <CardCarousel data={popularData || []} isLoading={isLoadingPopular} />
    </View>
  );
};
