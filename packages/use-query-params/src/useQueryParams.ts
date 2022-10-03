import { useCallback, useEffect } from 'react';
import useQueryString from './useQueryString';
import { defaultOptions, isNullable } from './utils';
import type { UseQueryParamsOptions, NullTypes, Nullable } from './utils';

function useQueryParams<KeyEnum extends string>(
  options: UseQueryParamsOptions = defaultOptions()
): [
  { [key in KeyEnum]?: string },
  (queryParams: { [key in KeyEnum]?: unknown }) => void
] {
  const [queryString, setQueryString] = useQueryString(options);

  const serializeQueryParams = useCallback(
    (queryParams: { [key in KeyEnum]?: unknown }) => {
      const qs = new URLSearchParams(
        queryParams as { [key in KeyEnum]: string }
      ).toString(); // returns string without question mark
      return qs.length > 0 ? `?${qs}` : qs;
    },
    []
  );

  const parseQueryString = useCallback((queryString: string) => {
    const obj = {} as { [key in KeyEnum]?: string };
    const entries = new URLSearchParams(queryString).entries();
    for (const [key, value] of entries) {
      obj[key as KeyEnum] = value;
    }
    return obj;
  }, []);

  const queryParams = parseQueryString(queryString);

  const setQueryParams = useCallback(
    (queryParams: Nullable<{ [key in KeyEnum]?: unknown }>) => {
      if (isNullable(queryParams)) {
        setQueryString(queryParams as NullTypes, null);
      } else {
        const sanitizedQueryParams = JSON.parse(JSON.stringify(queryParams));
        const hasAnyQueryParam = Object.keys(sanitizedQueryParams).length > 0;
        setQueryString(
          serializeQueryParams(sanitizedQueryParams),
          hasAnyQueryParam ? sanitizedQueryParams : null
        );
      }
      window.dispatchEvent(new Event('popstate'));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setQueryString]
  );

  useEffect(() => {
    setQueryString(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return [queryParams, setQueryParams];
}

export default useQueryParams;
