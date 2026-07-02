import { Badge, BadgeText } from "@/components/ui/badge";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useState } from "react";
import { Image } from "expo-image";
import { Href, Link } from "expo-router";
import { BookOpen } from "lucide-react-native";
import { View } from "react-native";
import ImageViewing from "react-native-image-viewing";

type ChapterRef = {
  slug: string;
  title: string;
};

type DetailHeroProps = {
  thumbnail: string;
  title: string;
  description?: {
    alternativeTitle?: string;
    status?: string;
    type?: string;
    genres?: string[];
  };
  chapters?: {
    initial?: ChapterRef;
    latest?: ChapterRef;
  };
};

export function DetailHero({
  thumbnail,
  title,
  description,
  chapters,
}: DetailHeroProps) {
  const [isImageVisible, setIsImageVisible] = useState(false);

  return (
    <VStack className="z-10 mt-2 items-center border-b border-outline-100 px-4 pb-6">
      <View>
        <Pressable onPress={() => setIsImageVisible(true)}>
          <View className="mb-4 rounded-[16px] bg-background-50 shadow-soft-2">
            <Image
              source={{ uri: thumbnail }}
              style={{ width: 160, height: 230, borderRadius: 16 }}
              contentFit="cover"
            />
          </View>
        </Pressable>

        <Button className="mb-6 mt-2 h-9 border-outline-500 bg-primary-500">
          <Icon as={BookOpen} className="mr-2 h-4 w-4 text-typography-white" />
          <ButtonText className="text-sm font-medium text-typography-white">
            Bookmark
          </ButtonText>
        </Button>
      </View>

      <Text className="px-4 text-center text-2xl font-bold leading-tight text-typography-900">
        {title}
      </Text>
      {description?.alternativeTitle && (
        <Text className="mt-2 px-4 text-center text-[15px] text-typography-500">
          {description.alternativeTitle}
        </Text>
      )}

      <HStack className="mt-4 justify-center gap-2">
        {description?.status && (
          <Badge className="border-0 bg-primary-500 px-4 py-1">
            <BadgeText className="text-[11px] font-bold text-typography-white">
              {description.status.toUpperCase()}
            </BadgeText>
          </Badge>
        )}
        {description?.type && (
          <Badge className="border-0 bg-primary-500 px-4 py-1">
            <BadgeText className="text-[11px] font-bold text-typography-white">
              {description.type.toUpperCase()}
            </BadgeText>
          </Badge>
        )}
      </HStack>

      {description?.genres && (
        <HStack className="mt-3 flex-wrap justify-center gap-2 px-2">
          {description.genres.map((genre) => (
            <Badge
              key={genre}
              variant="outline"
              className="border-outline-500 px-3 py-1"
            >
              <BadgeText className="text-[11px] font-medium uppercase text-typography-500">
                {genre}
              </BadgeText>
            </Badge>
          ))}
        </HStack>
      )}

      <HStack className="mt-6 w-full max-w-[340px] justify-center gap-4">
        {chapters?.initial && (
          <Link
            href={`/read/${chapters.initial.slug}` as unknown as Href}
            asChild
          >
            <Button
              variant="outline"
              className="h-auto min-h-12 flex-1 border-outline-500 bg-background-0"
            >
              <ButtonText className="text-center font-bold text-typography-900">
                {chapters.initial.title || "First Chapter"}
              </ButtonText>
            </Button>
          </Link>
        )}
        {chapters?.latest && (
          <Link
            href={`/read/${chapters.latest.slug}` as unknown as Href}
            asChild
          >
            <Button className="h-auto min-h-12 flex-1 bg-primary-500">
              <ButtonText className="text-center font-bold text-typography-white">
                {chapters.latest.title || "Latest Chapter"}
              </ButtonText>
            </Button>
          </Link>
        )}
      </HStack>

      <ImageViewing
        images={[{ uri: thumbnail }]}
        imageIndex={0}
        visible={isImageVisible}
        onRequestClose={() => setIsImageVisible(false)}
      />
    </VStack>
  );
}
