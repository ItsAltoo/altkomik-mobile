import { useState } from "react"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { ChevronRight, Info, LogOut, Monitor, Moon, Sun } from "lucide-react-native"
import { LogoutDialog } from "@/src/components/dialogs/LogoutDialog"

type ProfileMenuProps = {
  themePref: "system" | "light" | "dark"
  handleTheme: (val: "system" | "light" | "dark") => void
  handleLogout: () => void
}

export const ProfileMenu = ({ themePref, handleTheme, handleLogout }: ProfileMenuProps) => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  return (
    <VStack space="md" className="mt-4">
      <Text className="text-lg font-bold text-typography-900">Pengaturan</Text>
      <VStack className="overflow-hidden rounded-xl border border-outline-100 bg-background-0 shadow-soft-1">
        {/* Theme Switcher */}
        <HStack className="items-center justify-between border-b border-outline-100 p-4">
          <HStack space="md" className="items-center">
            <Icon
              as={themePref === "dark" ? Moon : themePref === "light" ? Sun : Monitor}
              size="md"
              className="text-typography-700"
            />
            <Text className="font-medium text-typography-900">Tema Aplikasi</Text>
          </HStack>
          <HStack className="gap-1 rounded-full border border-outline-100 bg-background-50 p-1">
            <Pressable
              onPress={() => handleTheme("system")}
              className={`rounded-full p-1.5 transition-colors ${themePref === "system" ? "bg-primary-500 shadow-soft-1" : "active:bg-background-100"}`}
            >
              <Icon
                as={Monitor}
                size="sm"
                className={themePref === "system" ? "text-typography-0" : "text-typography-400"}
              />
            </Pressable>
            <Pressable
              onPress={() => handleTheme("light")}
              className={`rounded-full p-1.5 transition-colors ${themePref === "light" ? "bg-primary-500 shadow-soft-1" : "active:bg-background-100"}`}
            >
              <Icon
                as={Sun}
                size="sm"
                className={themePref === "light" ? "text-typography-0" : "text-typography-400"}
              />
            </Pressable>
            <Pressable
              onPress={() => handleTheme("dark")}
              className={`rounded-full p-1.5 transition-colors ${themePref === "dark" ? "bg-primary-500 shadow-soft-1" : "active:bg-background-100"}`}
            >
              <Icon
                as={Moon}
                size="sm"
                className={themePref === "dark" ? "text-typography-0" : "text-typography-400"}
              />
            </Pressable>
          </HStack>
        </HStack>

        {/* About App */}
        <Pressable className="flex-row items-center justify-between border-b border-outline-100 p-4 transition-colors active:bg-background-50">
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
