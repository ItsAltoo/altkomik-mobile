export interface ComicCardProps {
  title: string;
  description?: string;
  thumbnail: string;
  slug: string;
  flag?: string;
  status?: {
    timeAgo?: string;
    views?: string;
    isColored?: boolean;
    type?: string;
    release?: string;
    genre?: string;
  };
  chapters?: {
    initial?: { slug: string };
    latest?: { title: string; slug: string };
  };
  latestChapter?: string;
  latestChapterSlug?: string;
  priority?: boolean;
  className?: string;
  style?: object;
}
