import DetailScreen from "@/src/screens/detail";
import { useLocalSearchParams } from "expo-router";

export default function DetailRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  if (!slug) return null;

  return <DetailScreen slug={slug} />;
}
