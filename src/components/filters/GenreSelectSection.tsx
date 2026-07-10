import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input"
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectFlatList,
  SelectTrigger,
} from "@/components/ui/select"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { ChevronDown, Search } from "lucide-react-native"
import { useMemo, useState } from "react"
import { View } from "react-native"

type Option = {
  label?: string
  text?: string
  value: string
}

type GenreSelectSectionProps = {
  title: string
  options: Option[]
  selectedValue: string
  onSelect: (value: string) => void
}

export const GenreSelectSection = ({ title, options, selectedValue, onSelect }: GenreSelectSectionProps) => {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOptions = useMemo(() => {
    return options.filter((opt) => {
      const label = (opt.label || opt.text || "").toLowerCase()
      return label.includes(searchQuery.toLowerCase())
    })
  }, [options, searchQuery])

  return (
    <VStack className="mb-6 gap-2">
      <Text className="font-bold text-typography-900">{title}</Text>
      <Select selectedValue={selectedValue || "all"} onValueChange={onSelect}>
        <SelectTrigger variant="outline" size="md" className="w-full border-outline-200 bg-background-0">
          <SelectInput placeholder="Pilih Genre" />
          <SelectIcon className="mr-3 text-typography-500" as={ChevronDown} />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent className="max-h-[80%] w-full bg-background-0 pb-4">
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator />
            </SelectDragIndicatorWrapper>

            <View className="w-full border-b border-outline-100 px-4 py-2">
              <Input variant="outline" size="md" className="w-full rounded-full bg-background-50">
                <InputSlot className="pl-3">
                  <InputIcon as={Search} className="text-typography-500" />
                </InputSlot>
                <InputField
                  placeholder="Cari genre..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCapitalize="none"
                />
              </Input>
            </View>

            <SelectFlatList
              className="h-[400px] w-full"
              showsVerticalScrollIndicator={false}
              data={filteredOptions}
              keyExtractor={(opt: any) => opt.value}
              renderItem={({ item: opt }: any) => <SelectItem label={opt.label || opt.text!} value={opt.value} />}
              ListEmptyComponent={
                <View className="items-center py-6">
                  <Text className="text-typography-500">Genre tidak ditemukan</Text>
                </View>
              }
            />
          </SelectContent>
        </SelectPortal>
      </Select>
    </VStack>
  )
}
