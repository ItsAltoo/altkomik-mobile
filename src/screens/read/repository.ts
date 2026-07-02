import { ApiResponse, ReadComicData } from "@/src/libs/types"
import api from "@/src/libs/utils/api"

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000"

export const ReadRepository = {
  getReadComic: async (slug: string) => {
    const { data } = await api.get<ApiResponse<ReadComicData>>(`/read/${slug}`)

    if (data.data && data.data.images) {
      data.data.images = (data.data.images as any).map((url: string) => ({
        uri: url.startsWith("http") ? url : `${BASE_URL}${url}`,
        headers: {
          "x-api-key": process.env.EXPO_PUBLIC_API_KEY || "",
        },
      }))
    }

    return data.data
  },
}
