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

export type LatestComic = {
  title: string;
  slug: string;
  thumbnail: string;
  updateCount: string;
  status: {
    genre: string;
    timeAgo: string;
  };
  latestChapter: string;
  latestChapterSlug: string;
  flag: string;
};
