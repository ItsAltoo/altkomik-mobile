import { CardCarousel } from "@/src/components/card-carousel";
import { Footer } from "@/src/components/footer";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { ComicCarousel } from "./components/ranking-carousel";
import { PopularCarousel } from "./components/popular-carousel";
import { useLatestList } from "./hooks/useLatestList";
import { usePopularUpdateList } from "./hooks/usePopularUpdateList";
import { useRanking } from "./hooks/useRanking";

const HomeScreen = () => {
  const {
    data: rankingData,
    isLoading: isLoadingCarousel,
    mutate: mutateRanking,
  } = useRanking();

  const {
    data: latestData,
    isLoading: isLoadingLatest,
    mutate: mutateLatest,
  } = useLatestList();

  const [popularType, setPopularType] = useState<
    "all" | "manga" | "manhwa" | "manhua"
  >("all");
  const {
    data: popularData,
    isLoading: isLoadingPopular,
    mutate: mutatePopular,
  } = usePopularUpdateList(popularType);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([mutateRanking(), mutateLatest(), mutatePopular()]);
    setIsRefreshing(false);
  };

  return (
    <View className="flex-1 bg-background-0 ">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={["#0ea5e9"]}
            tintColor="#0ea5e9"
          />
        }
      >
        <View className="px-4 pb-6 pt-4">
          <ComicCarousel data={rankingData} isLoading={isLoadingCarousel} />

          <View className="mt-6">
            <CardCarousel
              title="Terbaru"
              data={latestData}
              isLoading={isLoadingLatest}
            />
          </View>

          <PopularCarousel
            popularType={popularType}
            setPopularType={setPopularType}
            popularData={popularData}
            isLoadingPopular={isLoadingPopular}
          />
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
