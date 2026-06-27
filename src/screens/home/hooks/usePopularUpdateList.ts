import { Comic } from "@/src/libs/types";
import useSWR from "swr";
import { HomeRepository } from "../repository";

const EMPTY_ARRAY: Comic[] = [];

export function usePopularUpdateList(type: string = "all") {
  const { data, mutate, ...rest } = useSWR(
    ["popular-update-list", type],
    () => HomeRepository.getPopularUpdateList(type),
    {
      keepPreviousData: true,
    },
  );

  return {
    data: data ?? EMPTY_ARRAY,
    mutate,
    ...rest,
  };
}
