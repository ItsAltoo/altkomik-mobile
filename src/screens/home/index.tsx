import { CardCarousel } from "@/src/components/card-carousel";
import { Footer } from "@/src/components/footer";
import { RefreshControl, ScrollView, View } from "react-native";
import { ComicCarousel } from "./components/comic-carousel";
import { useLatestList } from "./hooks/useLatestList";
import { useRanking } from "./hooks/useRanking";

const HomeScreen = () => {
  const {
    data: rankingData,
    isLoading: isLoadingCarousel,
    isValidating: isValidatingRanking,
    mutate: mutateRanking,
  } = useRanking();

  const {
    data: latestData,
    isLoading: isLoadingLatest,
    isValidating: isValidatingLatest,
    mutate: mutateLatest,
  } = useLatestList();

  const onRefresh = () => {
    mutateRanking();
    mutateLatest();
  };

  const isRefreshing =
    (isValidatingRanking || isValidatingLatest) &&
    !isLoadingCarousel &&
    !isLoadingLatest;

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
        </View>
        <Footer />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
