declare const useQueryString: (
  isShallow?: boolean
) => [string, (queryString: string, historyState?: unknown) => void];
export default useQueryString;
