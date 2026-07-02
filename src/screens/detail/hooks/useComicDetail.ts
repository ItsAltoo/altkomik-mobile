import useSWR from "swr";
import { DetailRepository } from "../repository";

export const useComicDetail = (slug: string) => {
  const { data, ...rest } = useSWR(
    [slug, "comic-detail"],
    () => DetailRepository.getDetail(slug),
    { revalidateOnFocus: false },
  );

  return {
    data,
    ...rest,
  };
};
