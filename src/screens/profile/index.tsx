import React from "react"
import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Box } from "@/components/ui/box"
import { Spinner } from "@/components/ui/spinner"
import { VStack } from "@/components/ui/vstack"

import { useReadingHistory } from "@/src/libs/store/useReadingHistory"
import { useAuth } from "./hooks/useAuth"
import { useBookmarks } from "./hooks/useBookmarks"

import { Footer } from "@/src/components/footer"
import { ProfileBookmarks } from "./components/ProfileBookmarks"
import { ProfileHeader } from "./components/ProfileHeader"
import { ProfileHistory } from "./components/ProfileHistory"
import { ProfileLogin } from "./components/ProfileLogin"
import { ProfileMenu } from "./components/ProfileMenu"
import { ProfileStats } from "./components/ProfileStats"

export const ProfileScreen = () => {
  const { handleLogout, handleGoogleLogin, isLoading, token, isInitializing, userProfile } = useAuth()
  const { data: bookmarksData, isLoading: isLoadingBookmarks } = useBookmarks(token)
  const history = useReadingHistory((state) => state.history)
  const insets = useSafeAreaInsets()

  // Calculate stats from bookmark API response
  const rawData = bookmarksData || {}
  let bookmarksList: any[] = []
  if (Array.isArray(rawData)) {
    bookmarksList = rawData
  } else if (Array.isArray(rawData.result)) {
    bookmarksList = rawData.result
  } else if (Array.isArray(rawData.data)) {
    bookmarksList = rawData.data
  }
  const bookmarksCount = rawData.meta?.total || bookmarksList.length
  const historyEntries = Object.entries(history || {})
  const historyCount = historyEntries.length
  const readChaptersCount = Object.values(history || {}).reduce(
    (acc, curr) => acc + (curr.readChapters?.length || 0),
    0,
  )

  // Get recent reading history (sorted by updatedAt)
  const recentHistory = historyEntries
    .filter(([, progress]) => progress.lastReadChapter)
    .sort(([, a], [, b]) => (b.updatedAt || 0) - (a.updatedAt || 0))
    .slice(0, 5)

  if (isInitializing) {
    return (
      <Box className="flex-1 items-center justify-center bg-background-0">
        <Spinner size="large" color="#B331F1" />
      </Box>
    )
  }

  return (
    <Box className="flex-1 bg-background-0">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <VStack space="2xl" className="flex-1 px-4">
          {token ? (
            <View className="gap-6 pt-4">
              <ProfileHeader userProfile={userProfile} />

              <ProfileStats
                bookmarksCount={bookmarksCount}
                readChaptersCount={readChaptersCount}
                historyCount={historyCount}
              />

              <ProfileBookmarks
                isLoading={isLoadingBookmarks}
                bookmarksList={bookmarksList}
                bookmarksCount={bookmarksCount}
              />

              <ProfileHistory recentHistory={recentHistory} historyCount={historyCount} />

              <ProfileMenu handleLogout={handleLogout} />
            </View>
          ) : (
            <ProfileLogin isLoading={isLoading} handleGoogleLogin={handleGoogleLogin} />
          )}
        </VStack>
        <Footer />
      </ScrollView>
    </Box>
  )
}
