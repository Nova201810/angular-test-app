export type Api<T> = {
  code: string;
  data: T;
  errors: string[];
};