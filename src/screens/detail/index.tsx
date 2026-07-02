import { CardCarousel } from "@/src/components/card-carousel"
import { Footer } from "@/src/components/footer"
import { ActivityIndicator, ScrollView, View } from "react-native"
import { DetailChapterList } from "./components/DetailChapterList"
import { DetailHeader } from "./components/DetailHeader"
import { DetailHero } from "./components/DetailHero"
import { DetailSynopsis } from "./components/DetailSynopsis"
import { useComicDetail } from "./hooks/useComicDetail"
import { useSimilarComics } from "./hooks/useSimilarComics"

export default function DetailScreen({ slug }: { slug: string }) {
  const { data, isLoading } = useComicDetail(slug || "")
  const { data: similarComics, isLoading: isLoadingSimilar } = useSimilarComics(slug || "")

  if (isLoading || !data) {
    return (
      <View className="flex-1 items-center justify-center bg-background-0">
        <ActivityIndicator size="large" color="#B331F1" />
      </View>
    )
  }

  const mappedSimilarComics = similarComics.map((c) => ({
    ...c,
    status: { views: c.views },
  }))

  return (
    <ScrollView className="flex-1 bg-background-0" showsVerticalScrollIndicator={false}>
      <DetailHeader thumbnail={data.thumbnail} />

      <DetailHero
        thumbnail={data.thumbnail}
        title={data.title}
        description={data.description}
        chapters={data.chapters}
      />

      <View className="px-4 pb-8 pt-6">
        <DetailSynopsis synopsis={data.synopsis} description={data.description} />

        <DetailChapterList chapterList={data.chapterList} comicSlug={slug} />

        <CardCarousel title="Komik Serupa" data={mappedSimilarComics} isLoading={isLoadingSimilar} />
      </View>
      <Footer />
    </ScrollView>
  )
}
