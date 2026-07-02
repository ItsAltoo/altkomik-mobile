import { Comic } from "@/src/libs/types"
import useSWR from "swr"
import { HomeRepository } from "../repository"

const EMPTY_ARRAY: Comic[] = []

export const useRanking = () => {
  const { data, ...rest } = useSWR("ranking-all", () => HomeRepository.getRanking(), { revalidateOnFocus: false })

  return {
    data: data ?? EMPTY_ARRAY,
    ...rest,
  }
}
