import { ApiResponse, Comic } from "@/src/libs/types";
import api from "@/src/libs/utils/api";

export const HomeRepository = {
  async getRanking() {
    const { data } = await api.get<ApiResponse<Comic[]>>(
      "/ranking?period=daily",
    );

    return data.data;
  },

  async getLatestList() {
    const { data } = await api.get<ApiResponse<Comic[]>>("/latest-list");
    return data.data;
  },

  getPopularUpdateList: async (type: string = "all") => {
    const { data } = await api.get<ApiResponse<Comic[]>>(
      `/popular-update?type=${type}`,
    );
    return data.data;
  },
};
