import useQueryParams from './useQueryParams';
import { defaultRoutingOptions } from './constants';

const useQueryParam = <T = string>(
  key: string,
  formatValue?: (value: string) => T,
  options?: {
    isShallow?: boolean;
  }
): [T, (value: T) => void] => {
  const [queryParams, setQueryParams] = useQueryParams({
    isShallow: options?.isShallow ?? defaultRoutingOptions.isShallow,
  });

  const setQueryParam = (value: T) => {
    setQueryParams({ ...queryParams, [key]: value });
  };

  return [
    formatValue
      ? formatValue(queryParams[key] as string)
      : (queryParams[key] as unknown as T),
    setQueryParam,
  ];
};

export default useQueryParam;
