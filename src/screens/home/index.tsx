import { CardCarousel } from "@/src/components/card-carousel"
import { Footer } from "@/src/components/footer"
import { useState } from "react"
import { RefreshControl, ScrollView, View } from "react-native"
import { ScrollToTopFab } from "@/src/components/ui/ScrollToTopFab"
import { MascotEmptyState } from "@/src/components/empty-state/MascotEmptyState"
import { useScrollToTop } from "@/src/libs/hooks/useScrollToTop"
import { FilterableCarousel } from "./components/filterable-carousel"
import { ComicCarousel } from "./components/ranking-carousel"
import { useFeaturedGenres } from "./hooks/useFeaturedGenres"
import { useJustAddedList } from "./hooks/useJustAddedList"
import { useLatestList } from "./hooks/useLatestList"
import { usePopularUpdateList } from "./hooks/usePopularUpdateList"
import { useRanking } from "./hooks/useRanking"

const HomeScreen = () => {
  const { listRef, showScrollTop, handleScroll, scrollToTop } = useScrollToTop()
  const {
    data: rankingData,
    isLoading: isLoadingCarousel,
    error: rankingError,
    mutate: mutateRanking,
  } = useRanking()

  const { data: latestData, isLoading: isLoadingLatest, error: latestError, mutate: mutateLatest } = useLatestList()

  const [popularType, setPopularType] = useState<"all" | "manga" | "manhwa" | "manhua">("all")
  const {
    data: popularData,
    isLoading: isLoadingPopular,
    error: popularError,
    mutate: mutatePopular,
  } = usePopularUpdateList(popularType)

  const [justAddedType, setJustAddedType] = useState<"all" | "manga" | "manhwa" | "manhua">("all")
  const {
    data: justAddedData,
    isLoading: isLoadingJustAdded,
    error: justAddedError,
    mutate: mutateJustAdded,
  } = useJustAddedList(justAddedType)

  const {
    data: featuredGenresData,
    isLoading: isLoadingFeaturedGenres,
    error: featuredGenresError,
    mutate: mutateFeaturedGenres,
  } = useFeaturedGenres()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const onRefresh = async () => {
    setIsRefreshing(true)
    await Promise.all([mutateRanking(), mutateLatest(), mutatePopular(), mutateJustAdded(), mutateFeaturedGenres()])
    setIsRefreshing(false)
  }

  const isAnyLoading =
    isLoadingCarousel || isLoadingLatest || isLoadingPopular || isLoadingJustAdded || isLoadingFeaturedGenres

  const hasAnyData =
    rankingData.length > 0 ||
    latestData.length > 0 ||
    popularData.length > 0 ||
    justAddedData.length > 0 ||
    (featuredGenresData?.length ?? 0) > 0

  const hasCriticalError =
    !isAnyLoading &&
    !hasAnyData &&
    !!(rankingError || latestError || popularError || justAddedError || featuredGenresError)

  return (
    <View className="flex-1 bg-background-0">
      <ScrollView
        ref={listRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={["#B331F1"]} tintColor="#B331F1" />
        }
      >
        <View className="gap-8 px-4 pb-6 pt-4">
          {hasCriticalError ? (
            <MascotEmptyState
              mascot="ryo"
              title="Gagal Memuat Beranda"
              description="Terjadi kesalahan saat memuat data. Tarik ke bawah untuk mencoba lagi."
              size="lg"
            />
          ) : (
            <>
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
            </>
          )}
        </View>
        <View className="mb-32">
          <Footer />
        </View>
      </ScrollView>

      <ScrollToTopFab isVisible={showScrollTop} onPress={scrollToTop} />
    </View>
  )
}

export default HomeScreen
