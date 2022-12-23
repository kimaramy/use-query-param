import { useState, useEffect, useRef } from 'react';
import { isNullType, defaultOptions } from './utils';
import type { UseQueryParamsOptions, Nullable } from './utils';

export default function useQueryString(
  options: UseQueryParamsOptions = defaultOptions()
): [string, (queryString: Nullable<string>, state?: unknown) => void] {
  if (!window) {
    throw new ReferenceError(`'window' is undefined.`);
  }
  const [_queryString, _setQueryString] = useState(window.location.search);

  const onceUpdated = useRef(false);

  const setQueryString = (
    queryString: Nullable<string>,
    historyState: unknown = null
  ) => {
    const isReplacable =
      options.isShallow || // Replace history manually when option.isShallow equal to true
      queryString === _queryString || // Replace history when same query string as before
      onceUpdated.current === false; // Replace history unless it's once updated

    if (onceUpdated.current === false) onceUpdated.current = true;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
     */
    window.history[isReplacable ? 'replaceState' : 'pushState'](
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
  }, [_queryString]);

  return [_queryString, setQueryString];
}
