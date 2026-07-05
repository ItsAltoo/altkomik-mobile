import { Text } from "@/components/ui/text"
import { useState } from "react"
import { useWindowDimensions, View } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { ComicListView } from "./components/ComicListView"
import { GenreView } from "./components/GenreView"

const renderScene = SceneMap({
  comicList: ComicListView,
  genre: GenreView,
})

const DetailListScreen = () => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: "comicList", title: "Daftar Komik" },
    { key: "genre", title: "Genre" },
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
    <View className="flex-1 bg-background-0">
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

export default DetailListScreen
