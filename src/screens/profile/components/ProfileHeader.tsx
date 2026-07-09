import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { Image } from "expo-image"
import { User as UserIcon } from "lucide-react-native"

type ProfileHeaderProps = {
  userProfile: { name: string; email: string | null; photo: string | null } | null
}

export const ProfileHeader = ({ userProfile }: ProfileHeaderProps) => {
  return (
    <HStack space="md" className="items-center">
      {userProfile?.photo ? (
        <Image source={{ uri: userProfile.photo }} style={{ width: 80, height: 80, borderRadius: 40 }} />
      ) : (
        <Box className="size-20 items-center justify-center rounded-full border border-outline-100 bg-background-100">
          <Icon as={UserIcon} size="xl" className="text-typography-500" />
        </Box>
      )}
      <VStack className="flex-1 justify-center">
        <Text className="text-xl font-bold text-typography-900" numberOfLines={1}>
          {userProfile?.name || "User"}
        </Text>
        {userProfile?.email ? (
          <Text className="text-sm text-typography-500" numberOfLines={1}>
            {userProfile.email}
          </Text>
        ) : (
          <Text className="text-sm text-typography-500" numberOfLines={1}>
            Telah Masuk via Google
          </Text>
        )}
      </VStack>
    </HStack>
  )
}
