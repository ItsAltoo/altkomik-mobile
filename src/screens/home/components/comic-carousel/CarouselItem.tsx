import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Dimensions, StyleSheet } from "react-native";

import { Badge, BadgeText } from "@/components/ui/badge";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { RankingComic } from "../../types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type Props = {
  item: RankingComic;
};

export const CarouselItem = ({ item }: Props) => {
  const detailLink = `/detail/${item.slug}` as any;

  return (
    <Link href={detailLink} asChild>
      <Pressable
        className="active:opacity-95 transition-opacity"
        style={{ width: SCREEN_WIDTH, height: 280 }}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          priority="high"
        />

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.95)"]}
          locations={[0.2, 0.6, 1]}
          style={StyleSheet.absoluteFill}
        />

        <VStack className="absolute bottom-0 w-full p-4 pt-10 gap-2">
          <HStack className="gap-2 items-center">
            {item.rank && (
              <Badge className="bg-primary-500 border-none rounded-sm px-1.5 py-0.5 shadow-hard-5">
                <BadgeText className="text-[10px] font-bold text-white">
                  #{item.rank} Trending
                </BadgeText>
              </Badge>
            )}
            {item.status?.genre && (
              <Badge className="bg-background-0/20 backdrop-blur-md border border-outline-0/20 rounded-sm px-1.5 py-0.5">
                <BadgeText className="text-[10px] font-medium text-white">
                  {item.status.genre}
                </BadgeText>
              </Badge>
            )}
          </HStack>

          <Text
            className="text-xl font-extrabold text-white tracking-tight"
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <HStack className="items-center gap-3">
            {item.latestChapter && (
              <Text className="text-xs font-semibold text-primary-400">
                {item.latestChapter}
              </Text>
            )}
            {item.status?.views && (
              <Text className="text-xs font-medium text-typography-300">
                • {item.status.views}
              </Text>
            )}
          </HStack>
        </VStack>
      </Pressable>
    </Link>
  );
};
