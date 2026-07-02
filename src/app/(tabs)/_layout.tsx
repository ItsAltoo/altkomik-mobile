import { Tabs } from "expo-router"
import { View } from "react-native"
import { Navbar } from "../../components/navigation/Navbar"
import { PillBar } from "../../components/navigation/PillBar"

export default function TabsLayout() {
  return (
    <View className="flex-1">
      <Navbar />
      <Tabs
        tabBar={(props) => <PillBar {...(props as any)} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="library" />
        <Tabs.Screen name="latest" />
        <Tabs.Screen name="detail" />
        <Tabs.Screen name="popular" />
      </Tabs>
    </View>
  )
}
