import { Image } from "expo-image"
import { Link } from "expo-router"
import { Calendar, Clock, Eye, Tag } from "lucide-react-native"
import React from "react"
import { StyleSheet, View } from "react-native"

import { Badge, BadgeText } from "@/components/ui/badge"
import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"

import { ComicCardProps } from "./types"

export const ComicCard = ({
  title,
  thumbnail,
  slug,
  flag,
  status,
  type,
  chapters,
  latestChapter,
  latestChapterSlug,
  updateCount,
  variant = "default",
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

  const apiDetailLink = `/detail-comic/${slug}` as any
  const apiChapterLink = finalLatestChapterSlug ? (`/read/${finalLatestChapterSlug}` as any) : null

  const isValidImage = Boolean(thumbnail && thumbnail.startsWith("http") && !thumbnail.startsWith("https://komiku.org"))

  const isCompact = variant === "compact"
  const imageHeight = isCompact ? 150 : 180
  const titleLines = isCompact ? 1 : 2

  const hasMetadata = Boolean(timeAgo || views || release || genre)

  return (
    <Box
      className={`flex-1 overflow-hidden rounded-xl border border-outline-100 shadow-soft-1 ${className}`}
      style={style}
    >
      {/* IMAGE AREA */}
      <Link href={apiDetailLink} asChild>
        <Pressable
          className="relative w-full transition-transform duration-200 active:scale-[0.98]"
          style={{ height: imageHeight }}
        >
          {/* We wrap images in this View to ensure strict overflow hidden, preventing absoluteFill from bleeding */}
          <View className="absolute inset-0 overflow-hidden bg-background-50">
            {isValidImage ? (
              <>
                <Image
                  source={{ uri: thumbnail }}
                  style={[StyleSheet.absoluteFill, { opacity: 0.5 }]}
                  contentFit="cover"
                  blurRadius={15}
                  priority={priority ? "high" : "normal"}
                />
                <Image
                  source={{ uri: thumbnail }}
                  style={StyleSheet.absoluteFill}
                  contentFit="contain"
                  priority={priority ? "high" : "normal"}
                />
              </>
            ) : (
              <View className="flex-1 items-center justify-center bg-background-100">
                <Text className="text-xs font-medium text-typography-500">No Image</Text>
              </View>
            )}
          </View>

          {/* TOP LEFT BADGES */}
          <VStack className="absolute left-2 top-2 items-start gap-1">
            {finalLatestChapter && (
              <Badge
                variant="default"
                className="max-w-[120px] rounded-sm border border-outline-100 bg-background-0 px-1.5 py-0.5"
              >
                <BadgeText className="text-[9px] font-bold text-typography-900" numberOfLines={1}>
                  {finalLatestChapter}
                </BadgeText>
              </Badge>
            )}
            <HStack className="gap-1">
              {updateCount && (
                <Badge className="rounded-sm border-none bg-error-500 px-1.5 py-0.5 shadow-hard-5">
                  <BadgeText className="text-[9px] font-extrabold tracking-wider text-white">+{updateCount}</BadgeText>
                </Badge>
              )}
              {isColored && (
                <Badge className="rounded-sm border-none bg-[#F59E0B] px-1.5 py-0.5 shadow-hard-5">
                  <BadgeText className="text-[9px] font-bold uppercase tracking-wider text-white">Color</BadgeText>
                </Badge>
              )}
            </HStack>
          </VStack>

          {/* TOP RIGHT BADGES */}
          <VStack className="absolute right-2 top-2 items-end gap-1">
            {comicType && (
              <Badge variant="default" className="rounded-sm border-none bg-primary-500 px-1.5 py-0.5 shadow-hard-5">
                <BadgeText className="text-[9px] font-bold uppercase tracking-wider text-white">{comicType}</BadgeText>
              </Badge>
            )}
            {flag && (
              <Box className="overflow-hidden rounded-sm border border-outline-200 shadow-hard-5">
                <Image source={{ uri: flag }} style={{ width: 22, height: 16 }} contentFit="cover" />
              </Box>
            )}
          </VStack>
        </Pressable>
      </Link>

      {/* INFO AREA */}
      <Link href={apiDetailLink} asChild>
        <Pressable
          className="justify-between bg-background-0 p-2.5 transition-opacity active:opacity-80"
          style={{ height: isCompact ? 130 : 150 }}
        >
          <VStack className="gap-1.5">
            <Text
              numberOfLines={titleLines}
              className="text-sm font-extrabold leading-[18px] tracking-tight text-typography-900"
            >
              {title}
            </Text>

            {hasMetadata && (
              <VStack className="mt-0.5 gap-1">
                {timeAgo && (
                  <HStack className="items-center gap-1.5">
                    <Icon as={Clock} className="size-3 text-primary-500" color="rgb(179, 49, 241)" />
                    <Text className="text-xs font-medium text-typography-500" numberOfLines={1}>
                      {timeAgo}
                    </Text>
                  </HStack>
                )}
                {views && (
                  <HStack className="items-center gap-1.5">
                    <Icon as={Eye} className="size-3 text-primary-500" color="rgb(179, 49, 241)" />
                    <Text className="text-xs text-typography-500" numberOfLines={1}>
                      {views}
                    </Text>
                  </HStack>
                )}
                {release && (
                  <HStack className="items-center gap-1.5">
                    <Icon as={Calendar} className="size-3 text-primary-500" color="rgb(179, 49, 241)" />
                    <Text className="text-xs text-typography-500" numberOfLines={1}>
                      {release}
                    </Text>
                  </HStack>
                )}
                {genre && (
                  <HStack className="items-center gap-1.5">
                    <Icon as={Tag} className="size-3 text-primary-500" color="rgb(179, 49, 241)" />
                    <Text className="text-xs text-typography-500" numberOfLines={1}>
                      {genre}
                    </Text>
                  </HStack>
                )}
              </VStack>
            )}
          </VStack>

          <View>
            <Link href={apiChapterLink || apiDetailLink} asChild>
              <Button size="xs" variant="solid" className="h-7 w-full">
                <ButtonText className="text-xs">{apiChapterLink ? "Baca" : "Detail"}</ButtonText>
              </Button>
            </Link>
          </View>
        </Pressable>
      </Link>
    </Box>
  )
}
