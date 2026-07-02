import { Motion } from "@legendapp/motion"
import { useRouter } from "expo-router"
import { ArrowLeft, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"

type FloatingNavProps = {
  prevSlug: string
  nextSlug: string
  listSlug: string
  isVisible?: boolean
  onScrollToTop?: () => void
}

export const FloatingNav = ({ prevSlug, nextSlug, listSlug, isVisible = true, onScrollToTop }: FloatingNavProps) => {
  const router = useRouter()
  const insets = useSafeAreaInsets()

  return (
    <Motion.View
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", damping: 20, stiffness: 200 }}
      pointerEvents={isVisible ? "box-none" : "none"}
      className="absolute inset-x-4 bottom-6 shadow-soft-4"
      style={{ paddingBottom: Math.max(insets.bottom, 0) }}
    >
      <HStack className="min-w-[280px] items-center justify-between rounded-full border border-outline-100 bg-background-0/90 p-2 backdrop-blur-md">
        <Pressable
          onPress={() => prevSlug && router.replace(`/read/${prevSlug}`)}
          className={`min-w-[56px] flex-col items-center justify-center rounded-full p-2 transition-all duration-200 ${
            prevSlug ? "opacity-100 active:scale-95" : "opacity-30"
          }`}
          disabled={!prevSlug}
        >
          <Icon as={ChevronLeft} size="lg" className="text-background-dark dark:text-typography-500" />
          <Text className="mt-1 text-2xs font-bold text-background-dark dark:text-typography-500">Prev</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            if (router.canGoBack()) {
              router.back()
            } else {
              router.replace(`/detail-comic/${listSlug}`)
            }
          }}
          className="min-w-[56px] flex-col items-center justify-center rounded-full bg-primary-500 px-4 py-2 transition-all duration-200 active:scale-95"
        >
          <Icon as={ArrowLeft} size="lg" className="text-typography-0" />
          <Text className="mt-1 text-2xs font-bold text-typography-0">Kembali</Text>
        </Pressable>

        {onScrollToTop && (
          <Pressable
            onPress={onScrollToTop}
            className="min-w-[56px] flex-col items-center justify-center rounded-full bg-primary-500 p-2 transition-all duration-200 active:scale-95"
          >
            <Icon as={ArrowUp} size="lg" className="text-typography-0" />
            <Text className="mt-1 text-2xs font-bold text-typography-0">Top</Text>
          </Pressable>
        )}

        <Pressable
          onPress={() => nextSlug && router.replace(`/read/${nextSlug}`)}
          className={`min-w-[56px] flex-col items-center justify-center rounded-full p-2 transition-all duration-200 ${
            nextSlug ? "opacity-100 active:scale-95" : "opacity-30"
          }`}
          disabled={!nextSlug}
        >
          <Icon as={ChevronRight} size="lg" className="text-background-dark dark:text-typography-500" />
          <Text className="mt-1 text-2xs font-bold text-background-dark dark:text-typography-500">Next</Text>
        </Pressable>
      </HStack>
    </Motion.View>
  )
}
