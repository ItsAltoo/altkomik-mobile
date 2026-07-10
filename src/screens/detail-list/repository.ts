import { ApiResponse, ComicListGroup } from "@/src/libs/types"
import api from "@/src/libs/utils/api"

export type ComicListParams = {
  page?: number
  type?: string
  letter?: string
}

export const ComicListRepository = {
  getComicList: async (params: ComicListParams = {}): Promise<ComicListGroup> => {
    const query = []
    if (params.page) query.push(`page=${params.page}`)
    if (params.type && params.type !== "all") query.push(`type=${encodeURIComponent(params.type)}`)
    if (params.letter && params.letter !== "all") query.push(`letter=${encodeURIComponent(params.letter)}`)

    const queryString = query.join("&")
    const endpoint = queryString ? `/comic-list?${queryString}` : "/comic-list"

    const { data } = await api.get<ApiResponse<ComicListGroup[]>>(endpoint)

    // The API returns an array of groups. We return the first group which contains heading and list.
    if (data.data && data.data.length > 0) {
      return data.data[0]
    }

    return { heading: "", list: [] }
  },
}
