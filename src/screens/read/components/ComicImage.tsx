import { Icon } from "@/components/ui/icon"
import { Skeleton } from "@/components/ui/skeleton"
import { Image } from "expo-image"
import { AlertCircle } from "lucide-react-native"
import { useState } from "react"
import { Dimensions, TouchableWithoutFeedback, View } from "react-native"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

export const ComicImage = ({
  source,
  onPress,
}: {
  source: { uri: string; headers?: Record<string, string> }
  onPress?: () => void
}) => {
  const [height, setHeight] = useState(SCREEN_WIDTH * 1.5)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{ width: SCREEN_WIDTH, minHeight: height }}
        className="relative items-center justify-center bg-background-0"
      >
        {loading && !error && <Skeleton variant="rounded" className="absolute size-full" />}
        {error && (
          <View className="absolute items-center justify-center p-4">
            <Icon as={AlertCircle} className="mb-2 size-8 text-error-500" />
          </View>
        )}
        <Image
          source={source}
          style={{ width: SCREEN_WIDTH, height }}
          contentFit="fill"
          onLoad={(e) => {
            setLoading(false)
            const { width, height: imgHeight } = e.source
            if (width && imgHeight) {
              setHeight((SCREEN_WIDTH / width) * imgHeight)
            }
          }}
          onError={() => {
            setLoading(false)
            setError(true)
          }}
          transition={300}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}
