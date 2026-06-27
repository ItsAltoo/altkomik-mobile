import useSWR from "swr";
import { HomeRepository } from "../repository";
import { LatestComic } from "../types";

const EMPTY_ARRAY: LatestComic[] = [];

export const useLatestList = (initialData?: LatestComic[]) => {
  const { data, ...rest } = useSWR(
    "home-latest-list",
    () => HomeRepository.getLatestList(),
    { fallbackData: initialData },
  );

  return {
    data: data ?? EMPTY_ARRAY,
    ...rest,
  };
};
