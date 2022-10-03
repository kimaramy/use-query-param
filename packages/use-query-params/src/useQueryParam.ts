import useQueryParams from './useQueryParams';
import { defaultOptions } from './utils';
import type { Nullable, UseQueryParamsOptions } from './utils';

function useQueryParam<T = string>(
  key: string,
  options: UseQueryParamsOptions = defaultOptions()
): [Nullable<T>, (value: unknown) => void] {
  const [queryParams, setQueryParams] = useQueryParams(options);

  const setQueryParam = (value: unknown) => {
    setQueryParams({ ...queryParams, [key]: value });
  };

  return [queryParams[key] as unknown as Nullable<T>, setQueryParam];
}

export default useQueryParam;
