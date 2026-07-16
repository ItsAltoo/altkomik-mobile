import { useState } from "react"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { ChevronRight, Info, LogOut } from "lucide-react-native"
import { LogoutDialog } from "@/src/components/dialogs/LogoutDialog"
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
