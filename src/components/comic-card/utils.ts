/**
 * Reusable skeleton data array for FlashList to render 6 skeleton items.
 */
export const COMIC_SKELETON_DATA = Array.from({ length: 6 }).map((_, i) => ({ id: `skeleton-${i}` }))

/**
 * Type guard / helper to check if an item in the FlashList is a skeleton item.
 */
export const isComicSkeleton = (item: any): boolean => {
  return Boolean(item?.id && typeof item.id === "string" && item.id.startsWith("skeleton-"))
}
