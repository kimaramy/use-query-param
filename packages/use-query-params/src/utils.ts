export type NullType = null | undefined;

export type Nullable<T> = T | NullType;

export const isNullType = (value: unknown) =>
  value === undefined || value === null;

export interface UseQueryParamsOptions {
  isShallow?: boolean;
  // isSynced?: boolean;
}

export const defaultOptions = (): UseQueryParamsOptions => ({
  isShallow: false,
  // isSynced: true,
});
