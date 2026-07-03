import { Comic, SearchComic } from "@/src/libs/types"

export type ComicCardProps = Partial<Omit<Comic, "status">> &
  Partial<Omit<SearchComic, "status">> & {
    title: string
    slug: string
    thumbnail: string
    status?: string | Comic["status"]
    priority?: boolean
    className?: string
    style?: object
  }
