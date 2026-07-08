import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon"
import { Pressable } from "@/components/ui/pressable"
import { Text } from "@/components/ui/text"
import { BookOpen, Clock, FileText, Home, TrendingUp, User } from "lucide-react-native"

const getIcon = (routeName: string, isFocused: boolean) => {
  const iconClass = isFocused ? "text-typography-0" : "text-background-dark dark:text-typography-500"
  switch (routeName) {
    case "index":
      return <Icon as={Home} size="lg" className={iconClass} />
    case "library":
      return <Icon as={BookOpen} size="lg" className={iconClass} />
    case "latest":
      return <Icon as={Clock} size="lg" className={iconClass} />
    case "detail":
      return <Icon as={FileText} size="lg" className={iconClass} />
    case "popular":
      return <Icon as={TrendingUp} size="lg" className={iconClass} />
    case "profile":
      return <Icon as={User} size="lg" className={iconClass} />
    default:
      return <Icon as={Home} size="lg" className={iconClass} />
  }
}

const getLabel = (routeName: string) => {
  switch (routeName) {
    case "index":
      return "Beranda"
    case "library":
      return "Pustaka"
    case "latest":
      return "Terbaru"
    case "detail":
      return "Detail"
    case "popular":
      return "Populer"
    case "profile":
      return "Profil"
    default:
      return routeName
  }
}

export const PillBar = ({ state, navigation }: any) => {
  return (
    <Box className="absolute inset-x-4 bottom-6 items-center shadow-soft-4">
      <HStack className="min-w-[320px] items-center justify-between rounded-full border border-outline-100 bg-background-0/90 p-2 backdrop-blur-md">
        {state.routes.map((route: any, index: number) => {
          if (route.name === "search" || route.name === "profile") return null

          const isFocused = state.index === index

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            })

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name)
            }
          }

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`min-w-[64px] flex-col items-center justify-center rounded-full px-4 py-2 transition-all duration-200 active:scale-95 ${
                isFocused ? "bg-primary-500" : "bg-none"
              }`}
            >
              {getIcon(route.name, isFocused)}
              <Text
                className={`mt-1 text-2xs font-bold ${
                  isFocused ? "text-typography-0" : "text-background-dark dark:text-typography-500"
                }`}
              >
                {getLabel(route.name)}
              </Text>
            </Pressable>
          )
        })}
      </HStack>
    </Box>
  )
}
