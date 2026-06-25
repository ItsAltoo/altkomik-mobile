import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

const Home = () => {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-background-0">
      <Text className="text-typography-900">Home Screen</Text>
      <Button
        size="md"
        variant="solid"
        action="primary"
        className="mt-4"
        onPress={() => router.push("/")}
      >
        <ButtonText>Click Me</ButtonText>
      </Button>
    </View>
  );
};

export default Home;
