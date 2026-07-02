import { HStack } from "@/components/ui/hstack"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useState } from "react"

import { DetailSynopsisProps } from "../types"

const formatKeyToTitleCase = (key: string) => {
  return key.replace(/([A-Z])/g, " $1").trim()
}

const DescriptionRow = ({ label, value }: { label: string; value: any }) => {
  const displayValue = Array.isArray(value) ? value.join(", ") : value

  if (!displayValue) return null

  return (
    <HStack className="justify-between border-b border-outline-100 py-2">
      <Text className="capitalize text-typography-600">{formatKeyToTitleCase(label)}</Text>
      <Text className="max-w-[60%] text-right font-medium text-typography-900">{displayValue}</Text>
    </HStack>
  )
}

export function DetailSynopsis({ synopsis, description }: DetailSynopsisProps) {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false)

  const toggleSynopsis = () => setShowFullSynopsis((prev) => !prev)

  let descriptionEntries: [string, any][] = []
  if (description) {
    const { genres, title, alternativeTitle, ...filteredDescription } = description
    descriptionEntries = Object.entries(filteredDescription)
  }

  return (
    <VStack className="gap-8">
      <VStack>
        <Text className="mb-2 border-l-4 border-l-primary-500 pl-2 text-lg font-bold text-typography-900">
          Sinopsis
        </Text>
        <Pressable onPress={toggleSynopsis}>
          <Text
            className="text-[15px] leading-relaxed text-typography-600"
            numberOfLines={showFullSynopsis ? undefined : 4}
          >
            {synopsis || "Sinopsis tidak tersedia."}
          </Text>
          {synopsis && (
            <Text className="mt-2 font-semibold text-primary-500">
              {showFullSynopsis ? "Tampilkan Lebih Sedikit" : "Baca Selengkapnya"}
            </Text>
          )}
        </Pressable>
      </VStack>

      {descriptionEntries.length > 0 && (
        <VStack className="mb-8 rounded-xl border border-outline-100 bg-background-0 p-4 shadow-soft-1">
          {descriptionEntries.map(([key, value]) => (
            <DescriptionRow key={key} label={key} value={value} />
          ))}
        </VStack>
      )}
    </VStack>
  )
}
