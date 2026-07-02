export type DetailHeaderProps = {
  thumbnail: string
}

export type ChapterRef = {
  slug: string
  title: string
}

export type DetailHeroProps = {
  thumbnail: string
  title: string
  description?: {
    alternativeTitle?: string
    status?: string
    type?: string
    genres?: string[]
  }
  chapters?: {
    initial?: ChapterRef
    latest?: ChapterRef
  }
}

export type DetailSynopsisProps = {
  synopsis: string
  description?: Record<string, any>
}

export type Chapter = {
  slug: string
  title: string
  date: string
}

export type DetailChapterListProps = {
  chapterList: Chapter[]
}
