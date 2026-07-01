import { ApiResponse, ComicDetail, SimilarComic } from "@/src/libs/types";
import api from "@/src/libs/utils/api";

export const DetailRepository = {
  getDetail: async (slug: string) => {
    const { data } = await api.get<ApiResponse<ComicDetail>>(`/detail/${slug}`);
    return data.data;
  },

  getSimilarComics: async (slug: string) => {
    const { data } = await api.get<ApiResponse<SimilarComic[]>>(
      `/detail/${slug}/similar-comics`,
    );
    return data.data;
  },
};
