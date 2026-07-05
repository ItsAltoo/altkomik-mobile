import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { ArrowUp } from "lucide-react-native"
import React, { memo, useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

type ScrollToTopFabProps = {
  isVisible: boolean
  onPress: () => void
}

const ScrollToTopFabComponent = ({ isVisible, onPress }: ScrollToTopFabProps) => {
  const insets = useSafeAreaInsets()

  // Calculate dynamic bottom position to avoid the custom tab bar
  const fabStyle = useMemo(
    () => ({
      bottom: Math.max(insets.bottom + 24, 100),
    }),
    [insets.bottom],
  )

  if (!isVisible) return null

  return (
    <Pressable
      onPress={onPress}
      style={fabStyle}
      className="absolute right-4 z-50 rounded-full bg-primary-500 p-3 transition-opacity shadow-hard-5 active:opacity-70"
    >
      <Icon as={ArrowUp} size="xl" className="text-typography-0" />
    </Pressable>
  )
}

export const ScrollToTopFab = memo(ScrollToTopFabComponent)
