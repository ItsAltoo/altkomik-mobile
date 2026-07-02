import { useLocalSearchParams } from "expo-router"
import { ReadScreen } from "@/src/screens/read"

export default function ReadComicRoute() {
  const { slug } = useLocalSearchParams<{ slug: string }>()

  if (!slug) return null

  return <ReadScreen slug={slug} />
}
