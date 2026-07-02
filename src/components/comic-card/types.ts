import { Comic } from "@/src/libs/types";

export type ComicCardProps = Comic & {
  priority?: boolean;
  className?: string;
  style?: object;
};
