import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Frown } from "lucide-react-native"
import { View } from "react-native"
import React, { memo } from "react"

type LatestEmptyStateProps = {
  error: any
  isLoading: boolean
  dataLength: number
}

const EmptyStateComponent = ({ error, isLoading, dataLength }: LatestEmptyStateProps) => {
  if (error) {
    return (
      <View className="items-center justify-center py-20">
        <Text className="text-center text-error-500">Terjadi kesalahan saat memuat data komik.</Text>
      </View>
    )
  }

  if (!isLoading && dataLength === 0) {
    return (
      <View className="items-center justify-center py-20">
        <VStack className="items-center gap-4">
          <Icon as={Frown} size="xl" className="text-typography-400" />
          <Text className="text-center text-lg font-medium text-typography-500">
            Tidak ada komik yang sesuai dengan filter.
          </Text>
        </VStack>
      </View>
    )
  }

  return null
}

export const LatestEmptyState = memo(EmptyStateComponent)
