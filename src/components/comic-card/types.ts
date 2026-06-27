import { Comic } from "@/src/libs/types";

export interface ComicCardProps extends Comic {
  priority?: boolean;
  className?: string;
  style?: object;
}
