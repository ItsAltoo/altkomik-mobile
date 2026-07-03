import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Spinner } from "@/components/ui/spinner"
import { Footer } from "@/src/components/footer"
import React, { memo } from "react"

type LatestFooterProps = {
  isLoadingMore: boolean
  hasMore: boolean
  dataLength: number
}

const FooterComponent = ({ isLoadingMore, hasMore, dataLength }: LatestFooterProps) => {
  return (
    <VStack className="items-center pb-8 pt-4">
      {isLoadingMore && <Spinner size="large" className="mb-4 text-primary-500" />}
      {!hasMore && dataLength > 0 && (
        <Text className="mb-4 text-sm text-typography-500">Semua komik telah ditampilkan.</Text>
      )}
      <Footer />
    </VStack>
  )
}

export const LatestFooter = memo(FooterComponent)
