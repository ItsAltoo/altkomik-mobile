import { Comic } from "@/src/libs/types";
import useSWR from "swr";
import { HomeRepository } from "../repository";

const EMPTY_ARRAY: Comic[] = [];

export const useLatestList = () => {
  const { data, ...rest } = useSWR("latest-list", () =>
    HomeRepository.getLatestList(),
  );

  return {
    data: data ?? EMPTY_ARRAY,
    ...rest,
  };
};
