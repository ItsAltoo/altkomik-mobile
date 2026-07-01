import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Href, Link } from "expo-router";
import { ArrowDownAZ, ArrowUpAZ, BookOpen, Search } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import type { Chapter, DetailChapterListProps } from "../types";

const ChapterItem = ({ item }: { item: Chapter }) => (
  <Link href={`/read/${item.slug}` as unknown as Href} asChild>
    <Pressable className="flex-row items-center justify-between rounded-lg border border-outline-50 bg-background-50 p-3.5 active:bg-background-100">
      <HStack className="items-center gap-3">
        <View className="h-9 w-9 items-center justify-center rounded-full bg-primary-50">
          <Icon as={BookOpen} className="h-[18px] w-[18px] text-primary-500" />
        </View>
        <VStack>
          <Text className="text-[14px] font-bold text-typography-900">
            {item.title}
          </Text>
          <Text className="mt-0.5 text-[11px] text-typography-500">
            {item.date}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  </Link>
);

export function DetailChapterList({ chapterList }: DetailChapterListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [visibleCount, setVisibleCount] = useState(30);

  // Directly calculate filtered and sorted chapters
  let processedChapters = [...chapterList];

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    processedChapters = processedChapters.filter(
      (chap) =>
        chap.title.toLowerCase().includes(lowerQuery) ||
        chap.date.toLowerCase().includes(lowerQuery),
    );
  }

  if (sortOrder === "asc") {
    processedChapters.reverse();
  }

  const visibleChapters = processedChapters.slice(0, visibleCount);
  const hasMore = visibleCount < processedChapters.length;

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setVisibleCount(30);
  };

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));
    setVisibleCount(30);
  };

  const loadMore = () => setVisibleCount((prev) => prev + 30);

  return (
    <VStack className="mb-8 gap-4">
      {/* Header */}
      <VStack>
        <Text className="border-l-4 border-l-primary-500 pl-2 text-lg font-bold text-typography-900">
          Daftar Chapter
        </Text>
        <Text className="mt-1 text-xs font-medium text-typography-500">
          {chapterList.length} Chapters
        </Text>
      </VStack>

      {/* Search and Sort */}
      <HStack className="items-center gap-2">
        <Input className="flex-1 rounded-xl bg-background-50" size="md">
          <InputSlot className="pl-3">
            <InputIcon as={Search} className="text-typography-400" />
          </InputSlot>
          <InputField
            placeholder="Cari chapter..."
            value={searchQuery}
            onChangeText={handleSearch}
            className="text-[15px]"
          />
        </Input>
        <Button
          className="h-10 w-10 items-center justify-center rounded-xl bg-primary-500 p-0"
          onPress={toggleSort}
        >
          <Icon
            as={sortOrder === "desc" ? ArrowDownAZ : ArrowUpAZ}
            className="h-5 w-5 text-typography-white"
          />
        </Button>
      </HStack>

      {/* List */}
      <View className="h-[450px] overflow-hidden rounded-xl border border-outline-100 shadow-soft-1">
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          contentContainerClassName="gap-1.5 p-2"
        >
          {processedChapters.length === 0 ? (
            <View className="items-center justify-center py-10">
              <Text className="font-medium text-typography-400">
                Chapter tidak ditemukan
              </Text>
            </View>
          ) : (
            <>
              {visibleChapters.map((item) => (
                <ChapterItem key={item.slug} item={item} />
              ))}

              {hasMore && (
                <Button
                  variant="outline"
                  className="mt-2 border-outline-200 bg-background-0"
                  onPress={loadMore}
                >
                  <ButtonText className="text-typography-600">
                    Muat Lebih Banyak
                  </ButtonText>
                </Button>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </VStack>
  );
}
