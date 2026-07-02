import { CardCarousel } from "@/src/components/card-carousel"
import { Footer } from "@/src/components/footer"
import { useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import { FilterableCarousel } from "./components/filterable-carousel"
import { ComicCarousel } from "./components/ranking-carousel"
import { useFeaturedGenres } from "./hooks/useFeaturedGenres"
import { useJustAddedList } from "./hooks/useJustAddedList"
import { useLatestList } from "./hooks/useLatestList"
import { usePopularUpdateList } from "./hooks/usePopularUpdateList"
import { useRanking } from "./hooks/useRanking"

const HomeScreen = () => {
  const { data: rankingData, isLoading: isLoadingCarousel, mutate: mutateRanking } = useRanking()

  const { data: latestData, isLoading: isLoadingLatest, mutate: mutateLatest } = useLatestList()

  const [popularType, setPopularType] = useState<"all" | "manga" | "manhwa" | "manhua">("all")
  const { data: popularData, isLoading: isLoadingPopular, mutate: mutatePopular } = usePopularUpdateList(popularType)

  const [justAddedType, setJustAddedType] = useState<"all" | "manga" | "manhwa" | "manhua">("all")
  const {
    data: justAddedData,
    isLoading: isLoadingJustAdded,
    mutate: mutateJustAdded,
  } = useJustAddedList(justAddedType)

  const {
    data: featuredGenresData,
    isLoading: isLoadingFeaturedGenres,
    mutate: mutateFeaturedGenres,
  } = useFeaturedGenres()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await Promise.all([mutateRanking(), mutateLatest(), mutatePopular(), mutateJustAdded(), mutateFeaturedGenres()])
    setIsRefreshing(false)
  }

  return (
    <View className="flex-1 bg-background-0">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#B331F1"]} tintColor="#B331F1" />
        }
      >
        <View className="gap-8 px-4 pb-6 pt-4">
          <ComicCarousel data={rankingData} isLoading={isLoadingCarousel} />

          <CardCarousel title="Terbaru" data={latestData} isLoading={isLoadingLatest} />

          <FilterableCarousel
            title="Populer"
            type={popularType}
            setType={setPopularType}
            data={popularData}
            isLoading={isLoadingPopular}
          />

          <FilterableCarousel
            title="Baru Ditambahkan"
            type={justAddedType}
            setType={setJustAddedType}
            data={justAddedData}
            isLoading={isLoadingJustAdded}
          />

          {featuredGenresData?.map((group) => (
            <CardCarousel
              key={group.genre}
              title={group.genre}
              data={group.items}
              isLoading={isLoadingFeaturedGenres}
            />
          ))}
        </View>
        <View className="mb-32">
          <Footer />
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen
