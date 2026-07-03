import { ApiResponse, SearchComic } from "@/src/libs/types"
import api from "@/src/libs/utils/api"

export const SearchRepository = {
  searchComics: async (query: string) => {
    const { data } = await api.get<ApiResponse<SearchComic[]>>(`/search?query=${encodeURIComponent(query)}`)

    return data.data
  },
}
