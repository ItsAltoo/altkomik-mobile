import { useCallback, useRef, useState } from "react"
import type { NativeSyntheticEvent, NativeScrollEvent } from "react-native"

export const useScrollToTop = (threshold = 400) => {
  const listRef = useRef<any>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetY = event.nativeEvent.contentOffset.y
      if (offsetY > threshold && !showScrollTop) {
        setShowScrollTop(true)
      } else if (offsetY <= threshold && showScrollTop) {
        setShowScrollTop(false)
      }
    },
    [showScrollTop, threshold],
  )

  const scrollToTop = useCallback(() => {
    // For FlashList and FlatList
    if (listRef.current?.scrollToOffset) {
      listRef.current.scrollToOffset({ offset: 0, animated: true })
    }
    // Fallback for standard ScrollView
    else if (listRef.current?.scrollTo) {
      listRef.current.scrollTo({ y: 0, animated: true })
    }
  }, [])

  return {
    listRef,
    showScrollTop,
    handleScroll,
    scrollToTop,
  }
}
