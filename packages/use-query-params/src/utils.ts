export type NullTypes = null | undefined;

export type Nullable<T> = T | NullTypes;

export const isNullable = (value: unknown) =>
  value === undefined || value === null;

export interface UseQueryParamsOptions {
  isShallow?: boolean;
  // isSynced?: boolean;
}

export const defaultOptions = (): UseQueryParamsOptions => ({
  isShallow: false,
  // isSynced: true,
});
