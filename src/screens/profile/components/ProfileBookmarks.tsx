import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Spinner } from "@/components/ui/spinner"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { ChevronRight } from "lucide-react-native"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import { ListRowSkeleton } from "@/src/components/skeleton/ListRowSkeleton"

type ProfileBookmarksProps = {
  isLoading: boolean
  bookmarksList: any[]
  bookmarksCount: number
}

export const ProfileBookmarks = ({ isLoading, bookmarksList, bookmarksCount }: ProfileBookmarksProps) => {
  const router = useRouter()

  return (
    <VStack space="md" className="mt-4">
      <HStack className="items-center justify-between">
        <Text className="text-lg font-bold text-typography-900">Bookmark Anda</Text>
        <Pressable onPress={() => router.push("/library")}>
          <Text className="text-sm font-medium text-primary-500">Lihat Semua</Text>
        </Pressable>
      </HStack>

      {isLoading ? (
        <ListRowSkeleton count={5} gap="sm" />
      ) : bookmarksList.length > 0 ? (
        <VStack space="sm">
          {bookmarksList.slice(0, 5).map((bookmark: any) => (
            <Pressable
              key={bookmark.id}
              onPress={() => router.push(`/detail-comic/${bookmark.slug}`)}
              className="flex-row items-center justify-between rounded-lg border border-outline-100 bg-background-0 p-3 transition-colors shadow-soft-1 active:bg-background-50"
            >
              <HStack space="md" className="flex-1 items-center">
                <Image
                  source={{ uri: bookmark.thumbnail }}
                  style={{ width: 48, height: 64, borderRadius: 4 }}
                  contentFit="cover"
                />
                <VStack className="flex-1">
                  <Text className="font-bold text-typography-900" numberOfLines={1}>
                    {bookmark.title}
                  </Text>
                  <Text className="mt-0.5 text-xs text-typography-500" numberOfLines={1}>
                    {bookmark.type} • {bookmark.status}
                  </Text>
                  {bookmark.chapters?.latest && (
                    <Text className="mt-0.5 text-xs text-primary-500" numberOfLines={1}>
                      {bookmark.chapters.latest.title}
                    </Text>
                  )}
                </VStack>
              </HStack>
              <Icon as={ChevronRight} size="sm" className="text-typography-400" />
            </Pressable>
          ))}
          {bookmarksCount > 5 && (
            <Text className="mt-1 text-center text-xs text-typography-400">dan {bookmarksCount - 5} komik lainnya</Text>
          )}
        </VStack>
      ) : (
        <MascotEmptyState
          mascot="nijika"
          title="Belum ada Bookmark"
          description="Komik yang kamu simpan akan muncul di sini."
          size="sm"
        />
      )}
    </VStack>
  )
}
