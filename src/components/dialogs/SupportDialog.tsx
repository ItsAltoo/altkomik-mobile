import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { DiscordIcon } from "@/src/components/icons/DiscordIcon"
import { DISCORD_URL, SAWERIA_URL } from "@/src/libs/constants/links"
import * as Linking from "expo-linking"
import { ChevronRight, Heart } from "lucide-react-native"

type SupportDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export const SupportDialog = ({ isOpen, onClose }: SupportDialogProps) => {
  const openLink = (url: string) => {
    onClose()
    Linking.openURL(url).catch((err) => console.error("Couldn't load page", err))
  }

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} size="md">
      <AlertDialogBackdrop />
      <AlertDialogContent className="p-4">
        <AlertDialogHeader>
          <Text className="text-lg font-semibold text-typography-950">Dukung Kami</Text>
          <AlertDialogCloseButton />
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3" contentContainerClassName="gap-3">
          <VStack className="overflow-hidden rounded-xl border border-outline-100">
            <Pressable
              onPress={() => openLink(SAWERIA_URL)}
              className="flex-row items-center justify-between border-b border-outline-100 bg-background-0 p-4 transition-colors active:bg-background-50"
            >
              <HStack space="md" className="flex-1 items-center">
                <Icon as={Heart} size="md" className="text-error-500" />
                <VStack className="flex-1 shrink">
                  <Text className="font-bold text-typography-900">Donasi via Saweria</Text>
                  <Text className="text-xs text-typography-500">Bantu biaya server & pengembangan aplikasi</Text>
                </VStack>
              </HStack>
              <Icon as={ChevronRight} size="sm" className="ml-2 text-typography-400" />
            </Pressable>

            <Pressable
              onPress={() => openLink(DISCORD_URL)}
              className="flex-row items-center justify-between bg-background-0 p-4 transition-colors active:bg-background-50"
            >
              <HStack space="md" className="flex-1 items-center">
                <Icon as={DiscordIcon} size="md" />
                <VStack className="flex-1 shrink">
                  <Text className="font-bold text-typography-900">Gabung Discord</Text>
                  <Text className="text-xs text-typography-500">Diskusi dan info update terbaru</Text>
                </VStack>
              </HStack>
              <Icon as={ChevronRight} size="sm" className="ml-2 text-typography-400" />
            </Pressable>
          </VStack>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialog>
  )
}
