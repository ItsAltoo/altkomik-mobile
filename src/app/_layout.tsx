import { Stack } from "expo-router"
import { type ErrorBoundaryProps } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View } from "react-native"
import Toast from "react-native-toast-message"

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { toastConfig } from "@/src/components/ui/ToastConfig"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import { SupportDialog } from "@/src/components/dialogs/SupportDialog"
import "../../global.css"

const SUPPORT_DIALOG_DELAY_MS = 400

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
})

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode="dark">
        <View className="flex-1 items-center justify-center bg-background-0">
          <MascotEmptyState
            mascot="ryo"
            title="Terjadi Kesalahan"
            description={error.message || "Aplikasi mengalami kesalahan tak terduga."}
            size="lg"
            actionLabel="Coba Lagi"
            onAction={retry}
          />
        </View>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  )
}

const RootLayout = () => {
  const [showSupportDialog, setShowSupportDialog] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowSupportDialog(true), SUPPORT_DIALOG_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode="dark">
        <StatusBar hidden />
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
        <SupportDialog isOpen={showSupportDialog} onClose={() => setShowSupportDialog(false)} />
      </GluestackUIProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
