import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import React, { memo } from "react"
import { View } from "react-native"

export type MascotType = "gotou" | "nijika" | "kita" | "ryo"

type MascotEmptyStateProps = {
  mascot: MascotType
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  size?: "sm" | "md" | "lg"
}

const mascotImages = {
  gotou: require("@/assets/mascot/Gotou.png"),
  nijika: require("@/assets/mascot/Nijika.png"),
  kita: require("@/assets/mascot/Kita.png"),
  ryo: require("@/assets/mascot/Ryo.png"),
}

const sizeConfig = {
  sm: {
    imageSize: 100,
    titleSize: "text-md",
    descSize: "text-xs",
    padding: "py-4",
  },
  md: {
    imageSize: 150,
    titleSize: "text-lg",
    descSize: "text-sm",
    padding: "py-10",
  },
  lg: {
    imageSize: 200,
    titleSize: "text-xl",
    descSize: "text-base",
    padding: "py-16",
  },
}

const MascotEmptyStateComponent = ({
  mascot,
  title,
  description,
  actionLabel,
  onAction,
  size = "md",
}: MascotEmptyStateProps) => {
  const config = sizeConfig[size]
  const imageSource = mascotImages[mascot]

  return (
    <View className={`items-center justify-center px-6 ${config.padding}`}>
      <VStack className="w-full items-center gap-4">
        <Image
          source={imageSource}
          style={{ width: config.imageSize, height: config.imageSize }}
          contentFit="contain"
          transition={200}
        />

        <VStack className="items-center gap-1">
          <Text className={`text-center font-bold text-typography-900 ${config.titleSize}`}>{title}</Text>
          {description && <Text className={`text-center text-typography-500 ${config.descSize}`}>{description}</Text>}
        </VStack>

        {actionLabel && onAction && (
          <Button onPress={onAction} size="md" className="mt-2 rounded-xl bg-primary-500 active:bg-primary-600">
            <ButtonText className="font-medium text-typography-0">{actionLabel}</ButtonText>
          </Button>
        )}
      </VStack>
    </View>
  )
}

export const MascotEmptyState = memo(MascotEmptyStateComponent)
