import { Divider } from "@/components/ui/divider"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Bookmark, BookOpen, History } from "lucide-react-native"

type ProfileStatsProps = {
  bookmarksCount: number
  readChaptersCount: number
  historyCount: number
}

export const ProfileStats = ({ bookmarksCount, readChaptersCount, historyCount }: ProfileStatsProps) => {
  return (
    <HStack
      space="md"
      className="justify-between rounded-xl border border-outline-100 bg-background-50 p-4 shadow-soft-1"
    >
      <VStack className="flex-1 items-center">
        <HStack space="xs" className="mb-1 items-center">
          <Icon as={Bookmark} size="sm" className="text-primary-500" />
          <Text className="text-lg font-bold text-typography-900">{bookmarksCount}</Text>
        </HStack>
        <Text className="text-xs text-typography-500">Bookmark</Text>
      </VStack>
      <Divider orientation="vertical" className="h-full bg-outline-100" />
      <VStack className="flex-1 items-center">
        <HStack space="xs" className="mb-1 items-center">
          <Icon as={BookOpen} size="sm" className="text-success-500" />
          <Text className="text-lg font-bold text-typography-900">{readChaptersCount}</Text>
        </HStack>
        <Text className="text-xs text-typography-500">Dibaca</Text>
      </VStack>
      <Divider orientation="vertical" className="h-full bg-outline-100" />
      <VStack className="flex-1 items-center">
        <HStack space="xs" className="mb-1 items-center">
          <Icon as={History} size="sm" className="text-info-500" />
          <Text className="text-lg font-bold text-typography-900">{historyCount}</Text>
        </HStack>
        <Text className="text-xs text-typography-500">Riwayat</Text>
      </VStack>
    </HStack>
  )
}
