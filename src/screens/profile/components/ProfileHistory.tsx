import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { BookOpen, Play } from "lucide-react-native"
import { useHydration } from "@/src/libs/store/useReadingHistory"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import { ListRowSkeleton } from "@/src/components/skeleton/ListRowSkeleton"

type ProfileHistoryProps = {
  recentHistory: [string, any][]
  historyCount: number
}

export const ProfileHistory = ({ recentHistory, historyCount }: ProfileHistoryProps) => {
  const router = useRouter()
  const isHydrated = useHydration()

  return (
    <VStack space="md" className="mt-4">
      <HStack className="items-center justify-between">
        <Text className="text-lg font-bold text-typography-900">Riwayat Bacaan</Text>
        <Pressable onPress={() => router.push("/library")}>
          <Text className="text-sm font-medium text-primary-500">Lihat Semua</Text>
        </Pressable>
      </HStack>

      {!isHydrated ? (
        <ListRowSkeleton count={3} gap="sm" />
      ) : recentHistory.length > 0 ? (
        <VStack space="sm">
          {recentHistory.map(([comicSlug, progress]) => {
            const displayTitle =
              progress.title ||
              comicSlug
                .split("-")
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")

            const lastChapterSlug = progress.lastReadChapter
            const chapterMatch = lastChapterSlug.match(/chapter[- ](.+)$/i)
            const chapterDisplay = chapterMatch ? `Chapter ${chapterMatch[1]}` : lastChapterSlug

            return (
              <Pressable
                key={comicSlug}
                onPress={() => router.push(`/detail-comic/${comicSlug}`)}
                className="flex-row items-center justify-between rounded-lg border border-outline-100 bg-background-0 p-3 transition-colors shadow-soft-1 active:bg-background-50"
              >
                <HStack space="md" className="flex-1 items-center">
                  {progress.thumbnail ? (
                    <Image
                      source={{ uri: progress.thumbnail }}
                      style={{ width: 48, height: 64, borderRadius: 4 }}
                      contentFit="cover"
                    />
                  ) : (
                    <Box className="size-12 items-center justify-center rounded-lg bg-primary-50">
                      <Icon as={BookOpen} size="md" className="text-primary-500" />
                    </Box>
                  )}
                  <VStack className="flex-1">
                    <Text className="font-bold text-typography-900" numberOfLines={1}>
                      {displayTitle}
                    </Text>
                    <Text className="mt-0.5 text-xs text-typography-500" numberOfLines={1}>
                      Terakhir: {chapterDisplay}
                    </Text>
                    <Text className="mt-0.5 text-xs text-typography-400">
                      {progress.readChapters?.length || 0} chapter dibaca
                    </Text>
                  </VStack>
                </HStack>
                <Pressable
                  onPress={() => router.push(`/read/${progress.lastReadChapter}` as any)}
                  className="rounded-full bg-primary-500 p-2 active:bg-primary-600"
                >
                  <Icon as={Play} size="sm" className="text-typography-0" />
                </Pressable>
              </Pressable>
            )
          })}
          {historyCount > 5 && (
            <Text className="mt-1 text-center text-xs text-typography-400">dan {historyCount - 5} komik lainnya</Text>
          )}
        </VStack>
      ) : (
        <MascotEmptyState
          mascot="ryo"
          title="Belum ada Riwayat"
          description="Mulai baca komik untuk melihat riwayat di sini."
          size="sm"
        />
      )}
    </VStack>
  )
}
