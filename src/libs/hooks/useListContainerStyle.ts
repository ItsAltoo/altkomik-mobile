import { useMemo } from "react"
import { useSafeAreaInsets } from "react-native-safe-area-context"

/**
 * Custom hook to generate a memoized contentContainerStyle for lists.
 * It automatically handles safe area bottom insets.
 *
 * @param paddingTop The top padding for the list (default: 8)
 * @param bottomPaddingOffset The extra padding added to the bottom inset (default: 100)
 * @param minBottomPadding The absolute minimum bottom padding (default: 100)
 * @returns A memoized style object for contentContainerStyle
 */
export const useListContainerStyle = (
  paddingTop = 8,
  bottomPaddingOffset = 100,
  minBottomPadding = 100,
  paddingHorizontal = 16,
) => {
  const insets = useSafeAreaInsets()

  return useMemo(
    () => ({
      paddingBottom: Math.max(insets.bottom + bottomPaddingOffset, minBottomPadding),
      paddingTop,
      paddingHorizontal,
    }),
    [insets.bottom, paddingTop, bottomPaddingOffset, minBottomPadding, paddingHorizontal],
  )
}
