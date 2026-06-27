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
