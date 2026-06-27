import { FeaturedGenreGroup } from "@/src/libs/types";
import useSWR from "swr";
import { HomeRepository } from "../repository";

const EMPTY_ARRAY: FeaturedGenreGroup[] = [];

export const useFeaturedGenres = () => {
  const { data, mutate, ...rest } = useSWR(
    "featured-genres",
    () => HomeRepository.getFeaturedGenres(),
    { revalidateOnFocus: false },
  );

  return {
    data: data ?? EMPTY_ARRAY,
    mutate,
    ...rest,
  };
};
