import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  BookOpen,
  Clock,
  FileText,
  Home,
  TrendingUp,
} from "lucide-react-native";

const getIcon = (routeName: string, isFocused: boolean) => {
  const iconClass = isFocused ? "text-typography-0" : "text-background-dark dark:text-typography-500";
  switch (routeName) {
    case "index":
      return <Icon as={Home} size="lg" className={iconClass} />;
    case "library":
      return <Icon as={BookOpen} size="lg" className={iconClass} />;
    case "latest":
      return <Icon as={Clock} size="lg" className={iconClass} />;
    case "detail":
      return <Icon as={FileText} size="lg" className={iconClass} />;
    case "popular":
      return <Icon as={TrendingUp} size="lg" className={iconClass} />;
    default:
      return <Icon as={Home} size="lg" className={iconClass} />;
  }
};

const getLabel = (routeName: string) => {
  switch (routeName) {
    case "index":
      return "Beranda";
    case "library":
      return "Pustaka";
    case "latest":
      return "Terbaru";
    case "detail":
      return "Detail";
    case "popular":
      return "Populer";
    default:
      return routeName;
  }
};

export const PillBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <Box className="absolute bottom-6 left-4 right-4 items-center shadow-soft-4">
      <HStack className="bg-background-0/90 backdrop-blur-md border border-outline-100 px-2 py-2 rounded-full items-center justify-between min-w-[320px]">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className={`flex-col items-center justify-center px-4 py-2 rounded-full active:scale-95 transition-all duration-200 min-w-[64px] ${
                isFocused ? "bg-primary-500" : "bg-none"
              }`}
            >
              {getIcon(route.name, isFocused)}
              <Text
                className={`text-[10px] mt-1 font-bold ${
                  isFocused ? "text-typography-0" : "text-background-dark dark:text-typography-500"
                }`}
              >
                {getLabel(route.name)}
              </Text>
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
};
