import { useState, useEffect, useDebugValue } from 'react';
import { isNullType, defaultOptions } from './utils';
import type { UseQueryParamsOptions, Nullable } from './utils';

export default function useQueryString(
  options: UseQueryParamsOptions = defaultOptions()
): [string, (queryString: Nullable<string>, historyState?: unknown) => void] {
  if (!window) {
    throw new ReferenceError(`'window' is undefined.`);
  }

  const [queryString, _setQueryString] = useState(window.location.search);

  const setQueryString = (
    queryString: Nullable<string>,
    historyState: unknown = null
  ) => {
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
     */
    window.history[options.isShallow ? 'replaceState' : 'pushState'](
      historyState,
      '',
      `${window.location.pathname}${isNullType(queryString) ? '' : queryString}`
    );
    window.dispatchEvent(new Event('popstate'));
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const listenToPopstate = (_event: PopStateEvent) => {
    _setQueryString(window.location.search);
  };

  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, [queryString]);

  useDebugValue(queryString ?? undefined);

  return [queryString, setQueryString];
}
