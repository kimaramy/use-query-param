import { useMemo, useDebugValue } from 'react';
import useQueryString from './useQueryString';
import { defaultOptions, isNullType } from './utils';
import type { UseQueryParamsOptions, NullType, Nullable } from './utils';

function serializeQueryParams<T extends string>(queryParams: {
  [key in T]?: unknown;
}) {
  const qs = new URLSearchParams(
    queryParams as { [key in T]: string }
  ).toString(); // returns string without question mark
  return qs.length > 0 ? `?${qs}` : qs;
}

function parseQueryString<T extends string>(queryString: string) {
  const obj = {} as { [key in T]?: string };
  const entries = new URLSearchParams(queryString).entries();
  for (const [key, value] of entries) {
    obj[key as T] = value;
  }
  return obj;
}

export default function useQueryParams<T extends string = string>(
  options: UseQueryParamsOptions = defaultOptions()
): [
  { [key in T]?: string },
  {
    set: (queryParams: Nullable<{ [key in T]?: unknown }>) => void;
    clear: () => void;
  }
] {
  const [queryString, setQueryString] = useQueryString(options);

  const queryParams = useMemo(
    () => parseQueryString(queryString),
    [queryString]
  );

  const setQueryParams = (value: Nullable<{ [key in T]?: unknown }>) => {
    if (isNullType(value)) {
      setQueryString(value as NullType, null);
    } else {
      const sanitizedQueryParams = JSON.parse(JSON.stringify(value));
      const hasAnyQueryParam = Object.keys(sanitizedQueryParams).length > 0;
      setQueryString(
        serializeQueryParams(sanitizedQueryParams),
        hasAnyQueryParam ? sanitizedQueryParams : null
      );
    }
  };

  const clearQueryParams = () => setQueryParams({});

  useDebugValue(queryParams ?? undefined);

  return [
    queryParams,
    {
      set: setQueryParams,
      clear: clearQueryParams,
    },
  ];
}
