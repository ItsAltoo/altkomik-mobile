import { Badge, BadgeText } from "@/components/ui/badge"
import { Button, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import { Href, Link, useRouter } from "expo-router"
import { BookOpen, LogIn, X } from "lucide-react-native"
import { useState } from "react"
import { ActivityIndicator, View } from "react-native"
import ImageViewing from "react-native-image-viewing"
import { SafeAreaView } from "react-native-safe-area-context"
import { useBookmarkCheck } from "../hooks/useBookmarkCheck"
import { useToggleBookmark } from "../hooks/useToggleBookmark"
import { useAuth } from "@/src/screens/profile/hooks/useAuth"

type ChapterRef = {
  slug: string
  title: string
}

type DetailHeroProps = {
  thumbnail: string
  title: string
  slug: string
  comicData: {
    slug: string
    title: string
    thumbnail: string
    type: string
    status: string
  }
  description?: {
    alternativeTitle?: string
    status?: string
    type?: string
    genres?: string[]
  }
  chapters?: {
    initial?: ChapterRef
    latest?: ChapterRef
  }
}

export const DetailHero = ({ thumbnail, title, description, chapters, slug, comicData }: DetailHeroProps) => {
  const [isImageVisible, setIsImageVisible] = useState(false)
  const { isBookmarked, isLoading } = useBookmarkCheck(slug)
  const { toggleBookmark, isToggling } = useToggleBookmark(slug)
  const { token } = useAuth()
  const router = useRouter()

  return (
    <VStack className="z-10 mt-2 items-center border-b border-outline-100 px-4 pb-6">
      <View>
        <Pressable onPress={() => setIsImageVisible(true)}>
          <View className="mb-4 rounded bg-background-50 shadow-soft-2">
            <Image
              source={{ uri: thumbnail }}
              style={{ width: 160, height: 230, borderRadius: 6 }}
              contentFit="cover"
            />
          </View>
        </Pressable>

        {!token ? (
          <Button
            size="sm"
            className="mb-6 mt-2"
            onPress={() => router.push("/profile" as Href)}
          >
            <Icon as={LogIn} className="mr-2 size-4 text-typography-white" />
            <ButtonText className="text-typography-white">Sign In</ButtonText>
          </Button>
        ) : (
          <Button
            size="sm"
            className={`mb-6 mt-2 ${isBookmarked ? "bg-success-500" : ""}`}
            onPress={() => toggleBookmark(comicData)}
            disabled={isLoading || isToggling}
          >
            {isLoading || isToggling ? (
              <ActivityIndicator size="small" color="#FFFFFF" className="mr-2" />
            ) : (
              <Icon as={BookOpen} className="mr-2 size-4 text-typography-white" />
            )}
            <ButtonText className=" text-typography-white">{isBookmarked ? "Bookmarked" : "Bookmark"}</ButtonText>
          </Button>
        )}
      </View>

      <Text className="px-4 text-center text-2xl font-bold leading-tight text-typography-900">{title}</Text>
      {description?.alternativeTitle && (
        <Text className="mt-2 px-4 text-center text-[15px] text-typography-500">{description.alternativeTitle}</Text>
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
            <Badge key={genre} variant="outline" className="border-outline-500 px-3 py-1">
              <BadgeText className="text-[11px] font-medium uppercase text-typography-900">{genre}</BadgeText>
            </Badge>
          ))}
        </HStack>
      )}

      <HStack className="mt-6 w-full max-w-[340px] justify-center gap-4">
        {chapters?.initial && (
          <Link href={`/read/${chapters.initial.slug}` as unknown as Href} asChild>
            <Button size="md" variant="outline" className="flex-1 border-outline-500 bg-background-0">
              <ButtonText className="text-center font-bold text-typography-900">
                {chapters.initial.title || "First Chapter"}
              </ButtonText>
            </Button>
          </Link>
        )}
        {chapters?.latest && (
          <Link href={`/read/${chapters.latest.slug}` as unknown as Href} asChild>
            <Button size="md" className="flex-1 bg-primary-500">
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
        HeaderComponent={() => (
          <SafeAreaView edges={["top"]} className="items-end px-4 pt-4">
            <Pressable
              onPress={() => setIsImageVisible(false)}
              className="size-10 items-center justify-center rounded-full bg-background-900/50 active:bg-background-900/70"
            >
              <Icon as={X} className="size-6 text-typography-white" />
            </Pressable>
          </SafeAreaView>
        )}
      />
    </VStack>
  )
}
