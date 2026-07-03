import { ReadScreen } from "@/src/screens/read"
import { useLocalSearchParams } from "expo-router"

const ReadComicRoute = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()

  if (!slug) return null

  return <ReadScreen slug={slug} />
}

export default ReadComicRoute
