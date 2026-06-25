import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import {
  Popover,
  PopoverBackdrop,
  PopoverBody,
  PopoverContent,
} from "@/components/ui/popover";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Monitor, Moon, Search, Sun } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Navbar = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { colorScheme, setColorScheme } = useColorScheme();
  const [themePref, setThemePref] = useState<"system" | "light" | "dark">(
    "system",
  );
  const insets = useSafeAreaInsets();

  const handleTheme = (val: "system" | "light" | "dark") => {
    setThemePref(val);
    setColorScheme(val);
  };

  return (
    <HStack
      className="items-center justify-between px-4 pb-3 bg-background-0 border-b border-outline-100 z-10 shadow-soft-1"
      style={{ paddingTop: insets.top + 16 }}
    >
      <StatusBar style="auto" />
      <Pressable className="active:opacity-80 transition-opacity duration-200">
        <Image
          source={require("@/assets/images/noBg-altkomik-purple.png")}
          style={{ width: 100, height: 40 }}
          contentFit="cover"
        />
      </Pressable>

      <HStack className="items-center gap-4">
        <HStack
          className={`items-center rounded-full transition-colors duration-200 ${
            isSearchExpanded ? "bg-background-100" : "bg-transparent"
          }`}
        >
          {isSearchExpanded && (
            <Input
              variant="outline"
              size="sm"
              className="border-0 bg-transparent w-40"
            >
              <InputField
                placeholder="Cari komik..."
                className="px-4 py-2 text-typography-900"
                autoFocus
                onBlur={() => setIsSearchExpanded(false)}
              />
            </Input>
          )}
          <Pressable
            onPress={() => setIsSearchExpanded(!isSearchExpanded)}
            className="p-2 rounded-full active:scale-90 transition-transform duration-200"
          >
            <Icon as={Search} size="xl" className="text-typography-900" />
          </Pressable>
        </HStack>

        {/* Avatar with Popover */}
        <Popover
          placement="bottom right"
          size="xs"
          trigger={(triggerProps: any) => {
            return (
              <Pressable
                {...triggerProps}
                className="active:scale-95 transition-transform duration-200 shadow-sm"
              >
                <Image
                  source={{ uri: "https://i.pravatar.cc/100" }}
                  style={{ width: 36, height: 36, borderRadius: 18 }}
                />
              </Pressable>
            );
          }}
        >
          <PopoverBackdrop />
          <PopoverContent className="w-60 p-2 shadow-hard-5">
            <PopoverBody contentContainerClassName="p-0">
              <VStack className="gap-1">
                {/* User Name (Non-clickable) */}
                <HStack className="px-3 py-2 items-center justify-between gap-2">
                  <Text className="text-typography-900 font-bold text-sm">
                    Halo, Malik!
                  </Text>
                  <HStack className="bg-background-50 rounded-full p-1 gap-1 border border-outline-100">
                    <Pressable
                      onPress={() => handleTheme("system")}
                      className={`p-1 rounded-full transition-colors ${themePref === "system" ? "bg-background-0 shadow-soft-1" : "active:bg-background-100"}`}
                    >
                      <Icon
                        as={Monitor}
                        size="sm"
                        className={
                          themePref === "system"
                            ? "text-typography-900"
                            : "text-typography-400"
                        }
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => handleTheme("light")}
                      className={`p-1 rounded-full transition-colors ${themePref === "light" ? "bg-background-0 shadow-soft-1" : "active:bg-background-100"}`}
                    >
                      <Icon
                        as={Sun}
                        size="sm"
                        className={
                          themePref === "light"
                            ? "text-typography-900"
                            : "text-typography-400"
                        }
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => handleTheme("dark")}
                      className={`p-1 rounded-full transition-colors ${themePref === "dark" ? "bg-background-0 shadow-soft-1" : "active:bg-background-100"}`}
                    >
                      <Icon
                        as={Moon}
                        size="sm"
                        className={
                          themePref === "dark"
                            ? "text-typography-900"
                            : "text-typography-400"
                        }
                      />
                    </Pressable>
                  </HStack>
                </HStack>

                <Divider className="my-1" />

                <Pressable className="px-3 py-2 rounded-md active:bg-background-50 transition-colors">
                  <Text className="text-typography-700 text-sm">Profil</Text>
                </Pressable>
                <Pressable className="px-3 py-2 rounded-md active:bg-error-50 transition-colors">
                  <Text className="text-error-500 font-bold text-sm">
                    Keluar
                  </Text>
                </Pressable>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </HStack>
  );
};
