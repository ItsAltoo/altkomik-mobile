import { Image } from "expo-image"
import { Link } from "expo-router"
import { Calendar, Clock, Eye, Tag } from "lucide-react-native"
import { StyleSheet, View } from "react-native"
import React, { memo } from "react"

import { Badge, BadgeText } from "@/components/ui/badge"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"

import { ComicCardProps } from "./types"

export const ComicCard = memo(({
  title,
  description,
  thumbnail,
  slug,
  flag,
  status,
  type,
  chapters,
  latestChapter,
  latestChapterSlug,
  updateCount,
  priority = false,
  className = "",
  style,
}: ComicCardProps) => {
  const timeAgo = typeof status === "string" ? status : status?.timeAgo
  const views = typeof status !== "string" ? status?.views : undefined
  const isColored = typeof status !== "string" ? status?.isColored : false
  const comicType = type || (typeof status !== "string" ? status?.type : undefined)
  const release = typeof status !== "string" ? status?.release : undefined
  const genre = typeof status !== "string" ? status?.genre : undefined

  const finalLatestChapter = latestChapter || chapters?.latest?.title
  const finalLatestChapterSlug = latestChapterSlug || chapters?.latest?.slug
  const initialChapterSlug = chapters?.initial?.slug

  const apiDetailLink = `/detail-comic/${slug}` as any
  const apiChapterLink = finalLatestChapterSlug ? (`/read/${finalLatestChapterSlug}` as any) : null
  const apiInitialChapterLink = initialChapterSlug ? (`/read/${initialChapterSlug}` as any) : null

  const isValidImage = Boolean(thumbnail && thumbnail.startsWith("http") && !thumbnail.startsWith("https://komiku.org"))

  return (
    <Box
      className={`flex-1 overflow-hidden rounded-xl border border-outline-100 bg-background-0 shadow-soft-1 ${className}`}
      style={style}
    >
      <Link href={apiDetailLink} asChild>
        <Pressable className="relative h-[180px] w-full overflow-hidden bg-background-50 transition-transform duration-200 active:scale-[0.98]">
          {isValidImage ? (
            <Image
              source={{ uri: thumbnail }}
              style={StyleSheet.absoluteFill}
              contentFit="cover"
              priority={priority ? "high" : "normal"}
            />
          ) : (
            <View className="flex-1 items-center justify-center bg-background-100  ">
              <Text className="text-xs font-medium text-typography-500">No Image</Text>
            </View>
          )}

          {flag && (
            <Box className="absolute right-2 top-2 overflow-hidden rounded-sm border border-outline-800/30 shadow-hard-5  ">
              <Image source={{ uri: flag }} style={{ width: 22, height: 16 }} contentFit="cover" />
            </Box>
          )}

          {updateCount && (
            <Badge className="absolute left-2 top-2 rounded-sm border-none bg-error-500 px-1.5 py-0.5 shadow-hard-5">
              <BadgeText className="text-2xs font-extrabold tracking-wider text-white">{updateCount}</BadgeText>
            </Badge>
          )}

          {isColored && (
            <Badge
              className={`absolute ${updateCount ? "top-8" : "top-2"} left-2 rounded-sm border-none bg-[#F59E0B] px-1.5 py-0.5 shadow-hard-5`}
            >
              <BadgeText className="text-[9px] font-bold uppercase tracking-wider text-white">Color</BadgeText>
            </Badge>
          )}

          {finalLatestChapter && (
            <Badge
              variant="default"
              className="absolute bottom-2 left-2 max-w-[120px] rounded-sm border border-outline-100 bg-background-0/90 px-2 py-0.5 backdrop-blur-md"
            >
              <BadgeText className="text-2xs font-bold text-typography-900" numberOfLines={1}>
                {finalLatestChapter}
              </BadgeText>
            </Badge>
          )}

          {comicType && (
            <Badge
              variant="default"
              className="absolute bottom-2 right-2 rounded-sm border-none bg-primary-500 px-1.5 py-0.5"
            >
              <BadgeText className="text-[9px] font-bold uppercase tracking-wider text-white">{comicType}</BadgeText>
            </Badge>
          )}
        </Pressable>
      </Link>

      <VStack className="flex-1 justify-between gap-3 bg-background-0 p-3">
        <Link href={apiDetailLink} asChild>
          <Pressable className="w-full transition-opacity active:opacity-70">
            <Text
              numberOfLines={2}
              className="w-full text-sm font-extrabold leading-[18px] tracking-tight text-typography-900"
            >
              {title}
            </Text>
            {description && (
              <Text numberOfLines={2} className="mt-1 text-2xs leading-[14px] text-typography-500">
                {description}
              </Text>
            )}
          </Pressable>
        </Link>

        <VStack className="mt-auto gap-3 pt-2">
          <VStack className="gap-1.5">
            {timeAgo && (
              <HStack className="items-center gap-1.5">
                <Icon as={Clock} className="size-3.5 text-primary-500" />
                <Text className="text-[11px] font-medium text-typography-500" numberOfLines={1}>
                  {timeAgo}
                </Text>
              </HStack>
            )}
            {views && (
              <HStack className="items-center gap-1.5">
                <Icon as={Eye} className="size-3.5 text-primary-500" />
                <Text className="text-[11px] text-typography-500" numberOfLines={1}>
                  {views}
                </Text>
              </HStack>
            )}
            {release && (
              <HStack className="items-center gap-1.5">
                <Icon as={Calendar} className="size-3.5 text-primary-500" />
                <Text className="text-[11px] text-typography-500" numberOfLines={1}>
                  {release}
                </Text>
              </HStack>
            )}
            {genre && (
              <HStack className="items-center gap-1.5">
                <Icon as={Tag} className="size-3.5 text-primary-500" />
                <Text className="text-[11px] text-typography-500" numberOfLines={1}>
                  {genre}
                </Text>
              </HStack>
            )}
          </VStack>

          <VStack className="w-full gap-2">
            {apiInitialChapterLink && apiInitialChapterLink !== apiChapterLink && (
              <Link href={apiInitialChapterLink} asChild>
                <Button size="sm" variant="outline" className="border-outline-200">
                  <ButtonText className="text-typography-700">Read First</ButtonText>
                </Button>
              </Link>
            )}
            {apiChapterLink ? (
              <Link href={apiChapterLink} asChild>
                <Button size="sm" variant="solid">
                  <ButtonText>
                    {apiInitialChapterLink && apiInitialChapterLink !== apiChapterLink ? "Read Latest" : "Read Now"}
                  </ButtonText>
                </Button>
              </Link>
            ) : (
              <Link href={apiDetailLink} asChild>
                <Button size="sm" variant="solid">
                  <ButtonText>Details</ButtonText>
                </Button>
              </Link>
            )}
          </VStack>
        </VStack>
      </VStack>
    </Box>
  )
})

ComicCard.displayName = "ComicCard"
