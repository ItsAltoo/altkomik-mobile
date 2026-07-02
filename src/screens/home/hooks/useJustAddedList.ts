import { Comic } from "@/src/libs/types"
import useSWR from "swr"
import { HomeRepository } from "../repository"

const EMPTY_ARRAY: Comic[] = []

export function useJustAddedList(type: string = "all") {
  const { data, mutate, ...rest } = useSWR(["just-added-list", type], () => HomeRepository.getJustAddedList(type), {
    revalidateOnFocus: false,
  })

  return {
    data: data ?? EMPTY_ARRAY,
    mutate,
    ...rest,
  }
}
