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
import { FilterSection } from "@/src/screens/latest/components/FilterSection"
import { ORDER_OPTIONS, TYPE_OPTIONS } from "@/src/screens/latest/utils"
import { Filter, X } from "lucide-react-native"
import { useState } from "react"
import { PopularParams } from "../repository"

type PopularFiltersProps = {
  filters: PopularParams
  setFilters: (filters: PopularParams) => void
}

export const PopularFilters = ({ filters, setFilters }: PopularFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Local state for the actionsheet so we don't trigger refetches while user is still selecting
  const [localFilters, setLocalFilters] = useState<PopularParams>(filters)

  const handleOpen = () => {
    setLocalFilters(filters)
    setIsOpen(true)
  }

  const handleApply = () => {
    setFilters(localFilters)
    setIsOpen(false)
  }

  const handleReset = () => {
    const defaultFilters = { type: "all", orderBy: "modified" }
    setLocalFilters(defaultFilters)
    setFilters(defaultFilters)
    setIsOpen(false)
  }

  return (
    <>
      <HStack className="items-center justify-between bg-background-0 p-4">
        <Text className="border-l-4 border-primary-500 pl-2 text-xl font-bold text-typography-900">Komik Populer</Text>
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
              title="Urutkan Berdasarkan"
              options={ORDER_OPTIONS}
              selectedValue={localFilters.orderBy || "ranking"}
              onSelect={(val: string) => setLocalFilters((prev) => ({ ...prev, orderBy: val }))}
            />

            <FilterSection
              title="Tipe Komik"
              options={TYPE_OPTIONS}
              selectedValue={localFilters.type || "all"}
              onSelect={(val: string) => setLocalFilters((prev) => ({ ...prev, type: val }))}
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
