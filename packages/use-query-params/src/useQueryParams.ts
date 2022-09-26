import { useCallback, useEffect } from 'react';
import useQueryString from './useQueryString';
import { defaultRoutingOptions } from './constants';

const useQueryParams = <EnumType extends string>(options?: {
  isShallow?: boolean;
}): [
  { [key in EnumType]?: string },
  (queryParams: { [key in EnumType]?: unknown }) => void
] => {
  const [queryString, setQueryString] = useQueryString(
    options?.isShallow ?? defaultRoutingOptions.isShallow
  );

  const serializeQueryParams = useCallback(
    (queryParams: { [key in EnumType]?: unknown }) => {
      return new URLSearchParams(
        queryParams as { [key in EnumType]: string }
      ).toString();
    },
    []
  );

  const parseQueryString = useCallback((queryString: string) => {
    const obj = {} as { [key in EnumType]?: string };
    const entries = new URLSearchParams(queryString).entries();
    for (const [key, value] of entries) {
      obj[key as EnumType] = value;
    }
    return obj;
  }, []);

  const queryParams = parseQueryString(queryString);

  const setQueryParams = useCallback(
    (queryParams: { [key in EnumType]?: unknown }) => {
      const sanitizedQueryParams = JSON.parse(JSON.stringify(queryParams));
      const hasAnyQueryParam = Object.keys(sanitizedQueryParams).length > 0;
      setQueryString(
        serializeQueryParams(sanitizedQueryParams),
        hasAnyQueryParam ? sanitizedQueryParams : null
      );
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
};

export default useQueryParams;
