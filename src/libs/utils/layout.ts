import { Dimensions } from "react-native"

/**
 * Calculates the appropriate width for an item in a grid layout.
 *
 * @param numColumns Number of columns in the grid (default: 2)
 * @param horizontalPadding Total horizontal padding in the container (e.g., 32 for px-4 on both sides)
 * @param gap Gap between columns (e.g., 16)
 * @returns The width in pixels for each card
 */
export const getGridItemWidth = (numColumns = 2, horizontalPadding = 32, gap = 16) => {
  const { width } = Dimensions.get("window")
  // Subtracting total horizontal padding and the gap space between items
  return (width - horizontalPadding - gap) / numColumns
}
