import { ApiResponse } from "@/libs/types";
import api from "@/src/libs/utils/api";
import { LatestComic, RankingComic } from "./types";

export const HomeRepository = {
  async getRanking() {
    const { data } = await api.get<ApiResponse<RankingComic[]>>(
      "/ranking?period=weekly",
    );

    return data.data;
  },

  async getLatestList() {
    const { data } = await api.get<ApiResponse<LatestComic[]>>("/latest-list");
    return data.data;
  },
};
