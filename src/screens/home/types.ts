export type RankingComic = {
  title: string;
  slug: string;
  thumbnail: string;
  status: {
    genre: string;
    views: string;
  };
  latestChapter: string;
  latestChapterSlug: string;
  rank: string;
};
