import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "../../global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const RootLayout = () => {
  return (
    <GluestackUIProvider mode="system">
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }} />
    </GluestackUIProvider>
  );
};

export default RootLayout;
