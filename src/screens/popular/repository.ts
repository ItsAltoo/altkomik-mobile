import { ApiResponse, Comic } from "@/src/libs/types"
import api from "@/src/libs/utils/api"

export type PopularParams = {
  page?: number
  orderBy?: string
  type?: string
}

export const PopularRepository = {
  getPopularComics: async (params: PopularParams = {}) => {
    const searchParams = new URLSearchParams()

    if (params.page) searchParams.append("page", params.page.toString())
    if (params.orderBy && params.orderBy !== "all") searchParams.append("orderBy", params.orderBy)
    if (params.type && params.type !== "all") searchParams.append("type", params.type)

    const queryString = searchParams.toString()
    const endpoint = queryString ? `/popular?${queryString}` : "/popular"

    const { data } = await api.get<ApiResponse<Comic[]>>(endpoint)
    return data.data
  },
}
