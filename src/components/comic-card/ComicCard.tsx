import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Calendar, Clock, Eye, Tag } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

import { ComicCardProps } from "./types";

export const ComicCard = ({
  title,
  description,
  thumbnail,
  slug,
  flag,
  status,
  chapters,
  latestChapter,
  latestChapterSlug,
  priority = false,
  className = "",
  style,
}: ComicCardProps) => {
  const timeAgo = status?.timeAgo;
  const views = status?.views;
  const isColored = status?.isColored;
  const comicType = status?.type;
  const release = status?.release;
  const genre = status?.genre;

  const finalLatestChapter = latestChapter || chapters?.latest?.title;
  const finalLatestChapterSlug = latestChapterSlug || chapters?.latest?.slug;
  const initialChapterSlug = chapters?.initial?.slug;

  const apiDetailLink = `/detail/${slug}` as any;
  const apiChapterLink = finalLatestChapterSlug
    ? (`/read/${finalLatestChapterSlug}` as any)
    : null;
  const apiInitialChapterLink = initialChapterSlug
    ? (`/read/${initialChapterSlug}` as any)
    : null;

  const isValidImage = Boolean(
    thumbnail &&
    thumbnail.startsWith("http") &&
    !thumbnail.startsWith("https://komiku.org"),
  );

  return (
    <Box
      className={`flex-1 bg-background-0 border border-outline-100 shadow-soft-1 rounded-xl overflow-hidden ${className}`}
      style={style}
    >
      {/* IMAGE CONTAINER */}
      <Link href={apiDetailLink} asChild>
        <Pressable className="w-full h-[180px] relative overflow-hidden bg-background-50 active:scale-[0.98] transition-transform duration-200">
          {isValidImage ? (
            <>
              {/* Foreground Image */}
              <Image
                source={{ uri: thumbnail }}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                priority={priority ? "high" : "normal"}
              />
              {/* Dark Gradient Overlay for premium text contrast */}
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.2)", "rgba(0,0,0,0.9)"]}
                locations={[0, 0.6, 1]}
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
            </>
          ) : (
            <View className="flex-1 items-center justify-center bg-background-100">
              <Text className="text-xs font-medium text-typography-500">
                No Image
              </Text>
            </View>
          )}

          {/* Top-Right: Country Flag */}
          {flag && (
            <Box className="absolute top-2 right-2 rounded-sm overflow-hidden shadow-hard-5 border border-outline-800/30">
              <Image
                source={{ uri: flag }}
                style={{ width: 22, height: 16 }}
                contentFit="cover"
              />
            </Box>
          )}

          {/* Top-Left: Colored Badge */}
          {isColored && (
            <Badge className="absolute top-2 left-2 bg-[#F59E0B] border-none rounded-sm px-1.5 py-0.5">
              <BadgeText className="text-[9px] font-bold uppercase tracking-wider text-white">
                Color
              </BadgeText>
            </Badge>
          )}

          {/* Bottom-Left: Chapter Badge */}
          {finalLatestChapter && (
            <Badge
              variant="default"
              className="absolute bottom-2 left-2 bg-background-0/90 backdrop-blur-md px-2 py-0.5 rounded-sm border border-outline-100 max-w-[120px]"
            >
              <BadgeText
                className="text-[10px] font-bold text-typography-900"
                numberOfLines={1}
              >
                {finalLatestChapter}
              </BadgeText>
            </Badge>
          )}

          {/* Bottom-Right: Comic Type */}
          {comicType && (
            <Badge
              variant="default"
              className="absolute bottom-2 right-2 bg-primary-500 border-none rounded-sm px-1.5 py-0.5"
            >
              <BadgeText className="text-[9px] font-bold uppercase tracking-wider text-white">
                {comicType}
              </BadgeText>
            </Badge>
          )}
        </Pressable>
      </Link>

      {/* CONTENT CONTAINER */}
      <VStack className="p-3 gap-3 flex-1 justify-between bg-background-0">
        <Link href={apiDetailLink} asChild>
          <Pressable className="w-full active:opacity-70 transition-opacity">
            <Text
              numberOfLines={2}
              className="w-full font-extrabold text-sm leading-[18px] text-typography-900 tracking-tight"
            >
              {title}
            </Text>
            {description && (
              <Text
                numberOfLines={2}
                className="text-[10px] leading-[14px] text-typography-500 mt-1"
              >
                {description}
              </Text>
            )}
          </Pressable>
        </Link>

        <VStack className="mt-auto gap-3 pt-2">
          {/* Metadata */}
          <VStack className="gap-1.5">
            {timeAgo && (
              <HStack className="items-center gap-1.5">
                <Icon as={Clock} className="text-primary-500 w-3.5 h-3.5" />
                <Text
                  className="text-[11px] font-medium text-typography-500"
                  numberOfLines={1}
                >
                  {timeAgo}
                </Text>
              </HStack>
            )}
            {views && (
              <HStack className="items-center gap-1.5">
                <Icon as={Eye} className="text-primary-500 w-3.5 h-3.5" />
                <Text
                  className="text-[11px] text-typography-500"
                  numberOfLines={1}
                >
                  {views}
                </Text>
              </HStack>
            )}
            {release && (
              <HStack className="items-center gap-1.5">
                <Icon as={Calendar} className="text-primary-500 w-3.5 h-3.5" />
                <Text
                  className="text-[11px] text-typography-500"
                  numberOfLines={1}
                >
                  {release}
                </Text>
              </HStack>
            )}
            {genre && (
              <HStack className="items-center gap-1.5">
                <Icon as={Tag} className="text-primary-500 w-3.5 h-3.5" />
                <Text
                  className="text-[11px] text-typography-500"
                  numberOfLines={1}
                >
                  {genre}
                </Text>
              </HStack>
            )}
          </VStack>

          {/* Quick Actions: Read */}
          <HStack className="w-full gap-2">
            {apiInitialChapterLink &&
              apiInitialChapterLink !== apiChapterLink && (
                <Link href={apiInitialChapterLink} asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 h-7 px-1 rounded-md border-outline-200"
                  >
                    <ButtonText className="text-[10px] font-bold text-typography-700">
                      Read First
                    </ButtonText>
                  </Button>
                </Link>
              )}
            {apiChapterLink ? (
              <Link href={apiChapterLink} asChild>
                <Button
                  size="sm"
                  variant="solid"
                  className="flex-1 h-7 px-1 rounded-md"
                >
                  <ButtonText className="text-[10px] font-bold">
                    {apiInitialChapterLink &&
                    apiInitialChapterLink !== apiChapterLink
                      ? "Read Latest"
                      : "Read Now"}
                  </ButtonText>
                </Button>
              </Link>
            ) : (
              // Fallback if no chapter link
              <Link href={apiDetailLink} asChild>
                <Button
                  size="sm"
                  variant="solid"
                  className="flex-1 h-7 px-1 rounded-md"
                >
                  <ButtonText className="text-[10px] font-bold">
                    Details
                  </ButtonText>
                </Button>
              </Link>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};
