import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { CheckCircle2, XCircle } from "lucide-react-native"
import { ToastConfig } from "react-native-toast-message"

export const toastConfig: ToastConfig = {
  success: ({ text1, text2 }) => (
    <HStack space="md" className="mx-4 mt-2 w-[92%] items-center rounded-2xl border-l-4 border-success-500 bg-background-50 p-4 shadow-soft-2">
      <Box className="rounded-full bg-success-50 p-2">
        <Icon as={CheckCircle2} className="size-6 text-success-500" />
      </Box>
      <VStack className="flex-1 justify-center">
        <Text className="text-[15px] font-bold text-typography-900">{text1}</Text>
        {text2 && <Text className="mt-0.5 text-[13px] text-typography-500">{text2}</Text>}
      </VStack>
    </HStack>
  ),
  error: ({ text1, text2 }) => (
    <HStack space="md" className="mx-4 mt-2 w-[92%] items-center rounded-2xl border-l-4 border-error-500 bg-background-50 p-4 shadow-soft-2">
      <Box className="rounded-full bg-error-50 p-2">
        <Icon as={XCircle} className="size-6 text-error-500" />
      </Box>
      <VStack className="flex-1 justify-center">
        <Text className="text-[15px] font-bold text-typography-900">{text1}</Text>
        {text2 && <Text className="mt-0.5 text-[13px] text-typography-500">{text2}</Text>}
      </VStack>
    </HStack>
  ),
}
