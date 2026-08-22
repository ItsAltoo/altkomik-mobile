import { Icon } from "@/components/ui/icon"
import { Skeleton } from "@/components/ui/skeleton"
import { Image } from "expo-image"
import { AlertCircle } from "lucide-react-native"
import { useCallback, useState, memo } from "react"
import { Dimensions, View } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

const { width: SCREEN_WIDTH } = Dimensions.get("window")

const MIN_SCALE = 1
const MAX_SCALE = 4
const DOUBLE_TAP_SCALE = 2.5

type ComicImageProps = {
  source: { uri: string; headers?: Record<string, string> }
  onPress?: () => void
  onZoomChange?: (isZoomed: boolean) => void
}

export const ComicImage = memo(({ source, onPress, onZoomChange }: ComicImageProps) => {
  const [height, setHeight] = useState(SCREEN_WIDTH * 1.5)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)

  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const savedTranslateX = useSharedValue(0)
  const savedTranslateY = useSharedValue(0)
  const imageHeight = useSharedValue(SCREEN_WIDTH * 1.5)
  const zoomedFlag = useSharedValue(false)

  const handleZoomChange = useCallback(
    (zoomed: boolean) => {
      setIsZoomed(zoomed)
      onZoomChange?.(zoomed)
    },
    [onZoomChange],
  )

  const resetZoom = () => {
    "worklet"
    scale.value = withTiming(MIN_SCALE)
    translateX.value = withTiming(0)
    translateY.value = withTiming(0)
    savedScale.value = MIN_SCALE
    savedTranslateX.value = 0
    savedTranslateY.value = 0
    zoomedFlag.value = false
    runOnJS(handleZoomChange)(false)
  }

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      const nextScale = Math.min(Math.max(savedScale.value * e.scale, MIN_SCALE), MAX_SCALE)
      scale.value = nextScale
      if (nextScale > 1.01 && !zoomedFlag.value) {
        zoomedFlag.value = true
        runOnJS(handleZoomChange)(true)
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value
      if (scale.value <= MIN_SCALE + 0.01) {
        resetZoom()
        return
      }
      const maxTranslateX = (SCREEN_WIDTH * (scale.value - 1)) / 2
      const maxTranslateY = (imageHeight.value * (scale.value - 1)) / 2
      translateX.value = withTiming(Math.min(Math.max(translateX.value, -maxTranslateX), maxTranslateX))
      translateY.value = withTiming(Math.min(Math.max(translateY.value, -maxTranslateY), maxTranslateY))
      savedTranslateX.value = Math.min(Math.max(translateX.value, -maxTranslateX), maxTranslateX)
      savedTranslateY.value = Math.min(Math.max(translateY.value, -maxTranslateY), maxTranslateY)
    })

  const panGesture = Gesture.Pan()
    .enabled(isZoomed)
    .maxPointers(2)
    .onUpdate((e) => {
      const maxTranslateX = (SCREEN_WIDTH * (scale.value - 1)) / 2
      const maxTranslateY = (imageHeight.value * (scale.value - 1)) / 2
      translateX.value = Math.min(Math.max(savedTranslateX.value + e.translationX, -maxTranslateX), maxTranslateX)
      translateY.value = Math.min(Math.max(savedTranslateY.value + e.translationY, -maxTranslateY), maxTranslateY)
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value
      savedTranslateY.value = translateY.value
    })

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDuration(250)
    .onEnd(() => {
      if (scale.value > MIN_SCALE + 0.01) {
        resetZoom()
      } else {
        scale.value = withTiming(DOUBLE_TAP_SCALE)
        savedScale.value = DOUBLE_TAP_SCALE
        zoomedFlag.value = true
        runOnJS(handleZoomChange)(true)
      }
    })

  const singleTapGesture = Gesture.Tap()
    .maxDuration(250)
    .onEnd(() => {
      if (onPress) runOnJS(onPress)()
    })

  singleTapGesture.requireExternalGestureToFail(doubleTapGesture)

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    Gesture.Exclusive(doubleTapGesture, singleTapGesture),
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
  }))

  return (
    <GestureDetector gesture={composedGesture}>
      <View
        style={{ width: SCREEN_WIDTH, minHeight: height }}
        className="relative items-center justify-center bg-background-0"
        collapsable={false}
      >
        {loading && !error && <Skeleton variant="rounded" className="absolute size-full" />}
        {error && (
          <View className="absolute items-center justify-center p-4">
            <Icon as={AlertCircle} className="mb-2 size-8 text-error-500" />
          </View>
        )}
        <Animated.View style={[{ width: SCREEN_WIDTH, height }, animatedStyle]}>
          <Image
            source={source}
            style={{ width: SCREEN_WIDTH, height }}
            contentFit="fill"
            onLoad={(e) => {
              setLoading(false)
              const { width, height: imgHeight } = e.source
              if (width && imgHeight) {
                const newHeight = (SCREEN_WIDTH / width) * imgHeight
                setHeight(newHeight)
                imageHeight.value = newHeight
              }
            }}
            onError={() => {
              setLoading(false)
              setError(true)
            }}
          />
        </Animated.View>
      </View>
    </GestureDetector>
  )
})

ComicImage.displayName = "ComicImage"
