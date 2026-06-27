import { Text } from "@/components/ui/text";
import { ComicCard } from "@/src/components/comic-card";
import { RefreshControl, ScrollView, View } from "react-native";
import { ComicCarousel } from "./components/comic-carousel";
import { useRanking } from "./hooks/useRanking";

const MOCK_DATA = [
  {
    title: "Disciples, Please Spare Your Master",
    slug: "disciples",
    thumbnail: "https://picsum.photos/400/300",
    flag: "https://flagcdn.com/w40/cn.png",
    status: {
      timeAgo: "9 menit lalu",
      genre: "Fantasi",
      type: "Manhua",
    },
    chapters: {
      initial: { slug: "disciples-chapter-1" },
      latest: { title: "Chapter 68", slug: "disciples-chapter-68" },
    },
  },
  {
    title: "The Youngest Son Of A Rich Family",
    slug: "youngest-son",
    thumbnail:
      "https://www.altkomik.me/_next/image?url=https%3A%2F%2Fthumbnail.komiku.org%2Fuploads%2Fmanga%2Fhell-mode-yarikomi-suki-no-gamer-wa-hai-settei-no-isekai-de-musou-suru%2Fmanga_thumbnail-Manga-Hell-Mode-Yarikomi-Suki-no-Gamer-wa-Hai-Settei-no-Isekai-de-Musou-Suru.jpg%3Fw%3D500&w=384&q=75",
    description:
      "Anak bungsu dari keluarga kaya berjuang membuktikan dirinya di...",
    status: {
      timeAgo: "25 menit",
      views: "2.7jt x",
      type: "Manhwa",
    },
    chapters: {
      latest: { title: "Chapter 212", slug: "youngest-son-chapter-212" },
    },
  },
  {
    title: "Terminally-Ill Genius Dark Knight",
    slug: "terminally-ill",
    thumbnail: "https://picsum.photos/400/302",
    description:
      "Kisah ini menggabungkan aksi, drama, dan filosofi hidup dalam...",
    status: {
      timeAgo: "2 Jam",
      views: "3.6jt x",
      isColored: true,
    },
    chapters: {
      latest: { title: "Chapter 154", slug: "terminally-ill-chapter-154" },
    },
  },
  {
    title: "Osananananajimi",
    slug: "osananananajimi",
    thumbnail: "https://picsum.photos/400/303",
    flag: "https://flagcdn.com/w40/jp.png",
    status: {
      timeAgo: "9 menit lalu",
      genre: "Romantis",
      type: "Manga",
    },
    chapters: {
      initial: { slug: "osananananajimi-chapter-1" },
      latest: { title: "Chapter 25", slug: "osananananajimi-chapter-25" },
    },
  },
];

const HomeScreen = () => {
  const {
    data,
    isLoading: isLoadingCarousel,
    isValidating,
    mutate,
  } = useRanking();

  return (
    <View className="flex-1 bg-background-0 ">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isValidating && !isLoadingCarousel}
            onRefresh={() => mutate()}
            colors={["#0ea5e9"]}
            tintColor="#0ea5e9"
          />
        }
      >
        <View className="px-4 pb-6 pt-4">
          <ComicCarousel data={data} isLoading={isLoadingCarousel} />

          <Text className="text-xl font-bold text-typography-900 mb-4">
            Latest Updates
          </Text>

          <View className="flex-row flex-wrap justify-between gap-y-4">
            {MOCK_DATA.map((item) => (
              <View key={item.slug} style={{ width: "48%" }}>
                <ComicCard
                  title={item.title}
                  slug={item.slug}
                  thumbnail={item.thumbnail}
                  description={item.description}
                  flag={item.flag}
                  status={item.status}
                  chapters={item.chapters}
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
