import { CardCarousel } from "@/src/components/card-carousel"
import { Footer } from "@/src/components/footer"
import { ActivityIndicator, ScrollView, View } from "react-native"
import { DetailChapterList } from "./components/DetailChapterList"
import { DetailHeader } from "./components/DetailHeader"
import { DetailHero } from "./components/DetailHero"
import { DetailSynopsis } from "./components/DetailSynopsis"
import { useComicDetail } from "./hooks/useComicDetail"
import { useSimilarComics } from "./hooks/useSimilarComics"
import { useReadingHistory } from "@/src/libs/store/useReadingHistory"
import { useEffect } from "react"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"

const DetailScreen = ({ slug }: { slug: string }) => {
  const { data, isLoading, error, mutate } = useComicDetail(slug || "")
  const { data: similarComics, isLoading: isLoadingSimilar } = useSimilarComics(slug || "")
  const updateComicMeta = useReadingHistory((state) => state.updateComicMeta)

  useEffect(() => {
    if (data) {
      updateComicMeta(slug, data.title, data.thumbnail)
    }
  }, [data, slug, updateComicMeta])

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-background-0">
        <MascotEmptyState
          mascot="ryo"
          title="Gagal Memuat Komik"
          description="Terjadi kesalahan saat memuat detail komik. Silakan coba lagi."
          size="lg"
          actionLabel="Coba Lagi"
          onAction={() => mutate()}
        />
      </View>
    )
  }

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
      <DetailHeader thumbnail={data.thumbnail} title={data.title} slug={slug} />

      <DetailHero
        thumbnail={data.thumbnail}
        title={data.title}
        description={data.description}
        chapters={data.chapters}
        slug={slug}
        comicData={{
          slug,
          title: data.title,
          thumbnail: data.thumbnail,
          type: (Array.isArray(data.description?.type) ? data.description?.type[0] : data.description?.type) || "",
          status:
            (Array.isArray(data.description?.status) ? data.description?.status[0] : data.description?.status) || "",
        }}
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

export default DetailScreen
