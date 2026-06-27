import useSWR from "swr";
import { HomeRepository } from "../repository";
import { RankingComic } from "../types";

const EMPTY_ARRAY: RankingComic[] = [];

export const useRanking = (initialData?: RankingComic[]) => {
  const { data, ...rest } = useSWR(
    "home-ranking-all",
    () => HomeRepository.getRanking(),
    { fallbackData: initialData },
  );

  return {
    data: data ?? EMPTY_ARRAY,
    ...rest,
  };
};
