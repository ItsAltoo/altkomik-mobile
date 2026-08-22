import { useState } from "react"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { ChevronRight, Heart, Info, LogOut } from "lucide-react-native"
import { LogoutDialog } from "@/src/components/dialogs/LogoutDialog"
import { SAWERIA_URL } from "@/src/libs/constants/links"
import * as Linking from "expo-linking"
import { useRouter } from "expo-router"

type ProfileMenuProps = {
  handleLogout: () => void
}

export const ProfileMenu = ({ handleLogout }: ProfileMenuProps) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)
  const router = useRouter()

  return (
    <VStack space="md" className="mt-4">
      <Text className="text-lg font-bold text-typography-900">Pengaturan</Text>
      <VStack className="overflow-hidden rounded-xl border border-outline-100 bg-background-0 shadow-soft-1">
        {/* About App */}
        <Pressable
          onPress={() => router.push("/about")}
          className="flex-row items-center justify-between border-b border-outline-100 p-4 transition-colors active:bg-background-50"
        >
          <HStack space="md" className="items-center">
            <Icon as={Info} size="md" className="text-typography-700" />
            <Text className="font-medium text-typography-900">Tentang Aplikasi</Text>
          </HStack>
          <HStack space="sm" className="items-center">
            <Text className="text-xs text-typography-400">v1.0.0</Text>
            <Icon as={ChevronRight} size="sm" className="text-typography-400" />
          </HStack>
        </Pressable>

        {/* Support */}
        <Pressable
          onPress={() => Linking.openURL(SAWERIA_URL).catch((err) => console.error("Couldn't load page", err))}
          className="flex-row items-center justify-between border-b border-outline-100 p-4 transition-colors active:bg-background-50"
        >
          <HStack space="md" className="items-center">
            <Icon as={Heart} size="md" className="text-error-500" />
            <Text className="font-medium text-typography-900">Dukung Kami</Text>
          </HStack>
          <Icon as={ChevronRight} size="sm" className="text-typography-400" />
        </Pressable>

        {/* Logout */}
        <Pressable
          onPress={() => setShowLogoutDialog(true)}
          className="flex-row items-center p-4 transition-colors active:bg-error-50"
        >
          <HStack space="md" className="items-center">
            <Icon as={LogOut} size="md" className="text-error-500" />
            <Text className="font-bold text-error-500">Keluar</Text>
          </HStack>
        </Pressable>
      </VStack>

      <LogoutDialog isOpen={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} onConfirm={handleLogout} />
    </VStack>
  )
}
