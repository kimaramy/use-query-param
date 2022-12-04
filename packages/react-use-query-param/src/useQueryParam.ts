import { useDebugValue } from 'react';
import useQueryParams from './useQueryParams';
import { defaultOptions } from './utils';
import type { Nullable, UseQueryParamsOptions } from './utils';

export default function useQueryParam<T extends string = string>(
  key: string,
  options: UseQueryParamsOptions = defaultOptions()
): [Nullable<T>, { set: (value: unknown) => void; clear: () => void }] {
  const [queryParams, { set: setQueryParams }] = useQueryParams(options);

  const setQueryParam = (value: unknown) => {
    setQueryParams({ ...queryParams, [key]: value });
  };

  const clearQueryParam = () => {
    setQueryParams({ ...queryParams, [key]: undefined });
  };

  useDebugValue(queryParams[key] ?? undefined);

  return [
    queryParams[key] as unknown as Nullable<T>,
    {
      set: setQueryParam,
      clear: clearQueryParam,
    },
  ];
}
