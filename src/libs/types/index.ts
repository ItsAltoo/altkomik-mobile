type Meta = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<T> = {
  status: string;
  message: string;
  error: any[];
  meta: Meta;
  data: T;
};

export type Comic = {
  title: string;
  slug: string;
  thumbnail: string;
  latestChapter?: string;
  latestChapterSlug?: string;
  updateCount?: string;
  flag?: string;
  rank?: string;
  status?: {
    genre?: string;
    views?: string;
    timeAgo?: string;
    isColored?: boolean;
    type?: string;
    release?: string;
  };
  chapters?: {
    latest?: { title: string; slug: string };
    initial?: { title: string; slug: string };
  };
  description?: string;
};

export type FeaturedGenreGroup = {
  genre: string;
  items: Comic[];
};

export type BaseChapter = {
  title: string;
  slug: string;
};

export type ComicDetailChapter = {
  title: string;
  slug: string;
  date: string;
};

export type ComicDetail = {
  title: string;
  thumbnail: string;
  synopsis: string;
  description: {
    genres: string[];
    [key: string]: string | string[] | undefined;
  };
  chapters?: {
    initial?: BaseChapter;
    latest?: BaseChapter;
  };
  chapterList: ComicDetailChapter[];
};

export type SimilarComic = {
  title: string;
  slug: string;
  thumbnail: string;
  views: string;
  description: string;
};
