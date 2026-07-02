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
  const { setColorScheme } = useColorScheme();
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
      className="z-10 items-center justify-between border-b border-outline-100 bg-background-0 px-4 pb-3 shadow-soft-1"
      style={{ paddingTop: insets.top + 16 }}
    >
      <StatusBar style="auto" />
      <Pressable className="transition-opacity duration-200 active:opacity-80">
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
              className="w-40 border-0 bg-transparent"
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
            className="rounded-full p-2 transition-transform duration-200 active:scale-90"
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
                className="shadow-sm transition-transform duration-200 active:scale-95"
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
                <HStack className="items-center justify-between gap-2 px-3 py-2">
                  <Text className="text-sm font-bold text-typography-900">
                    Halo, Malik!
                  </Text>
                  <HStack className="gap-1 rounded-full border border-outline-100 bg-background-50 p-1">
                    <Pressable
                      onPress={() => handleTheme("system")}
                      className={`rounded-full p-1 transition-colors ${themePref === "system" ? "bg-primary-500 shadow-soft-1" : "active:bg-background-100"}`}
                    >
                      <Icon
                        as={Monitor}
                        size="sm"
                        className={
                          themePref === "system"
                            ? "text-typography-0"
                            : "text-typography-400"
                        }
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => handleTheme("light")}
                      className={`rounded-full p-1 transition-colors ${themePref === "light" ? "bg-primary-500 shadow-soft-1" : "active:bg-background-100"}`}
                    >
                      <Icon
                        as={Sun}
                        size="sm"
                        className={
                          themePref === "light"
                            ? "text-typography-0"
                            : "text-typography-400"
                        }
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => handleTheme("dark")}
                      className={`rounded-full p-1 transition-colors ${themePref === "dark" ? "bg-primary-500 shadow-soft-1" : "active:bg-background-100"}`}
                    >
                      <Icon
                        as={Moon}
                        size="sm"
                        className={
                          themePref === "dark"
                            ? "text-typography-0"
                            : "text-typography-400"
                        }
                      />
                    </Pressable>
                  </HStack>
                </HStack>

                <Divider className="my-1" />

                <Pressable className="rounded-md px-3 py-2 transition-colors active:bg-background-50">
                  <Text className="text-sm text-typography-700">Profil</Text>
                </Pressable>
                <Pressable className="rounded-md px-3 py-2 transition-colors active:bg-error-50">
                  <Text className="text-sm font-bold text-error-500">
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
