import { ApiResponse, Comic } from "@/src/libs/types"
import api from "@/src/libs/utils/api"

export type LatestParams = {
  page?: number
  orderBy?: string
  type?: string
  genre?: string
  genre2?: string
  status?: string
}

export type GenreItem = {
  value: string
  text: string
}

export const LatestRepository = {
  getLatestComics: async (params: LatestParams = {}) => {
    const searchParams = new URLSearchParams()

    if (params.page) searchParams.append("page", params.page.toString())
    if (params.orderBy && params.orderBy !== "all") searchParams.append("orderBy", params.orderBy)
    if (params.type && params.type !== "all") searchParams.append("type", params.type)
    if (params.genre && params.genre !== "all") searchParams.append("genre", params.genre)
    if (params.genre2 && params.genre2 !== "all") searchParams.append("genre2", params.genre2)
    if (params.status && params.status !== "all") searchParams.append("status", params.status)

    const queryString = searchParams.toString()
    const endpoint = queryString ? `/latest?${queryString}` : "/latest"

    const { data } = await api.get<ApiResponse<Comic[]>>(endpoint)
    return data.data
  },

  getGenres: async () => {
    const { data } = await api.get<ApiResponse<GenreItem[]>>("/genres")
    return data.data
  },
}
