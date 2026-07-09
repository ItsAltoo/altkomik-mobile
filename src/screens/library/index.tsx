import { Text } from "@/components/ui/text"
import { useState } from "react"
import { useWindowDimensions, View } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { BookmarkListView } from "./components/BookmarkListView"
import { HistoryListView } from "./components/HistoryListView"

const renderScene = SceneMap({
  bookmark: BookmarkListView,
  history: HistoryListView,
})

const LibraryScreen = () => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "bookmark", title: "Bookmark" },
    { key: "history", title: "Riwayat" },
  ])

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#8B5CF6", height: 3, borderRadius: 3 }}
      style={{
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
      }}
      renderLabel={({ route, focused }: { route: { title: string }; focused: boolean }) => (
        <Text className={`font-semibold ${focused ? "text-primary-500" : "text-typography-500"}`}>{route.title}</Text>
      )}
    />
  )

  return (
    <View className="flex-1 bg-background-0 pt-4">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled={true}
      />
    </View>
  )
}

export default LibraryScreen
