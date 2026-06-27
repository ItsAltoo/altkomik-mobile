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
