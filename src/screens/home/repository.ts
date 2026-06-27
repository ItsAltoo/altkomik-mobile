import { ApiResponse } from "@/libs/types";
import api from "@/src/libs/utils/api";
import { RankingComic } from "./types";

export const HomeRepository = {
  async getRanking() {
    const { data } = await api.get<ApiResponse<RankingComic[]>>(
      "/ranking?period=weekly",
    );

    return data.data;
  },
};
