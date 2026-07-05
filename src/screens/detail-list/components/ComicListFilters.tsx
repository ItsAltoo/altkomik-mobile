import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetScrollView,
} from "@/components/ui/actionsheet"
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { FilterSection } from "@/src/components/filters/FilterSection"
import { LETTER_OPTIONS, TYPE_OPTIONS } from "@/src/libs/utils/filters"
import { Filter, X } from "lucide-react-native"
import { useState } from "react"
import { ComicListParams } from "../repository"

type ComicListFiltersProps = {
  filters: ComicListParams
  setFilters: (filters: ComicListParams) => void
  heading?: string
}

export const ComicListFilters = ({ filters, setFilters, heading }: ComicListFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState<ComicListParams>(filters)

  const handleOpen = () => {
    setLocalFilters(filters)
    setIsOpen(true)
  }

  const handleApply = () => {
    setFilters(localFilters)
    setIsOpen(false)
  }

  const handleReset = () => {
    const defaultFilters = { type: "all", letter: "all", page: 1 }
    setLocalFilters(defaultFilters)
    setFilters(defaultFilters)
    setIsOpen(false)
  }

  return (
    <>
      <HStack className="items-center justify-between bg-background-0 p-4">
        <Text className="border-l-4 border-primary-500 pl-2 text-xl font-bold text-typography-900">
          {heading || "Daftar Komik"}
        </Text>
        <Button size="sm" variant="outline" action="secondary" onPress={handleOpen} className="gap-2 rounded-full">
          <ButtonIcon as={Filter} size="sm" />
          <ButtonText>Filter</ButtonText>
        </Button>
      </HStack>

      <Actionsheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent className="max-h-[90%] bg-background-0 pb-6 pt-2">
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>

          <HStack className="mb-4 w-full items-center justify-between px-2 pt-2">
            <Text className="border-l-4 border-primary-500 pl-2 text-lg font-bold text-typography-900">
              Filter Komik
            </Text>
            <Pressable onPress={() => setIsOpen(false)} className="p-2">
              <Icon as={X} size="md" className="text-typography-500" />
            </Pressable>
          </HStack>

          <ActionsheetScrollView className="w-full px-2" showsVerticalScrollIndicator={false}>
            <FilterSection
              title="Tipe Komik"
              options={TYPE_OPTIONS}
              selectedValue={localFilters.type || "all"}
              onSelect={(val: string) => setLocalFilters((prev) => ({ ...prev, type: val }))}
            />

            <FilterSection
              title="Huruf Awal"
              options={LETTER_OPTIONS}
              selectedValue={localFilters.letter || "all"}
              onSelect={(val: string) => setLocalFilters((prev) => ({ ...prev, letter: val }))}
            />
          </ActionsheetScrollView>

          <HStack className="mt-4 w-full gap-4 px-2">
            <Button size="md" variant="outline" action="secondary" onPress={handleReset} className="flex-1">
              <ButtonText>Reset</ButtonText>
            </Button>
            <Button size="md" variant="solid" action="primary" onPress={handleApply} className="flex-1">
              <ButtonText>Terapkan</ButtonText>
            </Button>
          </HStack>
        </ActionsheetContent>
      </Actionsheet>
    </>
  )
}
