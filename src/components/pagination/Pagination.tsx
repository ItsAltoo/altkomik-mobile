import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import React, { memo } from "react"
import { View } from "react-native"

type PaginationProps = {
  page: number
  hasMore: boolean
  isLoading: boolean
  totalPages?: number
  onPageChange: (page: number) => void
}

const MAX_VISIBLE_PAGES = 5

const PaginationComponent = ({ page, hasMore, isLoading, totalPages, onPageChange }: PaginationProps) => {
  let startPage = Math.max(1, page - (MAX_VISIBLE_PAGES - 2))
  let endPage = startPage + MAX_VISIBLE_PAGES - 1

  if (!hasMore) {
    endPage = page
    startPage = Math.max(1, endPage - (MAX_VISIBLE_PAGES - 1))
  } else if (totalPages !== undefined && endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - (MAX_VISIBLE_PAGES - 1))
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  return (
    <View className="w-full">
      <HStack className="w-full items-center justify-between px-4">
        {/* Previous Button Container */}
        <View className="flex-1 items-start">
          <Button
            size="sm"
            variant="outline"
            action="secondary"
            isDisabled={page === 1 || isLoading}
            onPress={() => onPageChange(page - 1)}
            className="rounded-lg border-outline-200 px-2 sm:px-3"
          >
            <ButtonIcon as={ChevronLeft} className="mr-1 text-typography-700" />
            <ButtonText className="text-xs text-typography-700 sm:text-sm">Prev</ButtonText>
          </Button>
        </View>

        {/* Page Numbers */}
        <HStack className="gap-1 sm:gap-2">
          {pages.map((p) => {
            const isActive = p === page
            return (
              <Pressable
                key={p}
                onPress={() => !isLoading && !isActive && onPageChange(p)}
                disabled={isLoading}
                className={
                  isActive
                    ? "flex size-8 items-center justify-center rounded-lg border-2 border-primary-500 transition-colors sm:size-10"
                    : "flex size-8 items-center justify-center rounded-lg transition-colors active:bg-background-100 sm:size-10"
                }
              >
                <Text
                  className={isActive ? "text-sm font-bold text-primary-500" : "text-sm font-bold text-typography-500"}
                >
                  {p}
                </Text>
              </Pressable>
            )
          })}
        </HStack>

        {/* Next Button Container */}
        <View className="flex-1 items-end">
          <Button
            size="sm"
            variant="outline"
            action="secondary"
            isDisabled={!hasMore || isLoading}
            onPress={() => onPageChange(page + 1)}
            className="rounded-lg border-outline-200 px-2 sm:px-3"
          >
            <ButtonText className="text-xs text-typography-700 sm:text-sm">Next</ButtonText>
            <ButtonIcon as={ChevronRight} className="ml-1 text-typography-700" />
          </Button>
        </View>
      </HStack>
    </View>
  )
}

export const Pagination = memo(PaginationComponent)
