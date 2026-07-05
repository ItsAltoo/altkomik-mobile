import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { View } from "react-native"

type Option = {
  label?: string
  text?: string
  value: string
}

type FilterSectionProps = {
  title: string
  options: Option[]
  selectedValue: string
  onSelect: (value: string) => void
}

export const FilterSection = ({ title, options, selectedValue, onSelect }: FilterSectionProps) => (
  <VStack className="mb-6 gap-2">
    <Text className="font-bold text-typography-900">{title}</Text>
    <View className="flex-row flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value || (!selectedValue && opt.value === "all")
        return (
          <Pressable
            key={opt.value}
            onPress={() => onSelect(opt.value)}
            className={`rounded-full border px-4 py-1.5 ${
              isSelected ? "border-primary-500 bg-primary-500" : "border-outline-200 bg-background-0"
            }`}
          >
            <Text className={`text-sm font-semibold ${isSelected ? "text-typography-0" : "text-typography-500"}`}>
              {opt.label || opt.text}
            </Text>
          </Pressable>
        )
      })}
    </View>
  </VStack>
)
