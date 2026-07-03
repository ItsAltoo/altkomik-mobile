import DetailScreen from "@/src/screens/detail"
import { useLocalSearchParams } from "expo-router"

const DetailRoute = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()

  if (!slug) return null

  return <DetailScreen slug={slug} />
}

export default DetailRoute
