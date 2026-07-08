import { Box } from "@/components/ui/box"
import { Button, ButtonText, ButtonSpinner, ButtonIcon } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { useAuth } from "./hooks/useAuth"
import { useBookmarks } from "./hooks/useBookmarks"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React from "react"
import { ScrollView } from "react-native"
import { Spinner } from "@/components/ui/spinner"
import { Image } from "expo-image"
import { LogOut } from "lucide-react-native"

export const ProfileScreen = () => {
  const { handleLogout, handleGoogleLogin, isLoading, token, isInitializing } = useAuth()
  const { data: bookmarksData, isLoading: isLoadingBookmarks } = useBookmarks(token)
  const insets = useSafeAreaInsets()

  if (isInitializing) {
    return (
      <Box className="flex-1 items-center justify-center bg-background-0" style={{ paddingTop: insets.top }}>
        <Spinner size="large" />
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-background-0" style={{ paddingTop: insets.top }}>
      <VStack space="xl" className="flex-1 items-center p-6">
        <Text className="text-3xl font-bold text-typography-900 mt-10">Profil</Text>
        
        {token ? (
          <VStack space="lg" className="items-center w-full flex-1">
          <Text className="text-center text-typography-500">
            Anda telah berhasil masuk!
          </Text>
          
          <Box className="w-full mt-4 flex-1">
            <Text className="font-bold text-lg mb-2">Bookmarks Anda:</Text>
            {isLoadingBookmarks ? (
              <Text>Memuat bookmarks...</Text>
            ) : (
              <ScrollView className="w-full" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {bookmarksData?.result?.map((bookmark: any) => (
                  <Box key={bookmark.id} className="p-3 mb-2 bg-background-50 rounded-md border border-outline-100">
                    <Text className="font-medium">{bookmark.title}</Text>
                  </Box>
                ))}
                {(!bookmarksData?.result || bookmarksData.result.length === 0) && (
                  <Text className="text-typography-400 italic">Belum ada komik yang di-bookmark.</Text>
                )}
              </ScrollView>
            )}
          </Box>

          <Button size="lg" variant="outline" action="negative" onPress={handleLogout} className="mb-4">
            <ButtonIcon as={LogOut} />
            <ButtonText>Sign Out</ButtonText>
          </Button>
        </VStack>
        ) : (
          <VStack space="lg" className="items-center justify-center flex-1 w-full px-4">
            <Text className="text-center text-typography-500 mb-2">
              Anda perlu masuk untuk melihat halaman profil dan daftar komik yang di-bookmark.
            </Text>
            <Button 
              size="lg" 
              onPress={handleGoogleLogin} 
              disabled={isLoading} 
              className="mt-2 w-[240px] flex-row items-center justify-center bg-background-0 border border-outline-200"
            >
              {isLoading ? (
                <ButtonSpinner />
              ) : (
                <>
                  <Image source={{ uri: "https://img.icons8.com/color/48/000000/google-logo.png" }} style={{ width: 24, height: 24, marginRight: 12 }} />
                  <ButtonText className="text-typography-900 font-semibold">Google</ButtonText>
                </>
              )}
            </Button>
          </VStack>
        )}
      </VStack>
    </Box>
  )
}

