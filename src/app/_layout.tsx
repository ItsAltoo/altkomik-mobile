import { Stack } from "expo-router"
import { type ErrorBoundaryProps } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { View } from "react-native"
import Toast from "react-native-toast-message"

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider"
import { toastConfig } from "@/src/components/ui/ToastConfig"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import "../../global.css"

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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode="dark">
        <StatusBar hidden />
        <Stack screenOptions={{ headerShown: false }} />
        <Toast config={toastConfig} />
      </GluestackUIProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
