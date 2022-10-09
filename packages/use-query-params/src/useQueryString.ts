import { useState, useEffect } from 'react';
import { isNullType, defaultOptions } from './utils';
import type { UseQueryParamsOptions, Nullable } from './utils';

function useQueryString(
  options: UseQueryParamsOptions = defaultOptions()
): [string, (queryString: Nullable<string>, historyState?: unknown) => void] {
  if (!window) throw new ReferenceError(`'window' is undefined.`);

  const [queryString, _setQueryString] = useState(window.location.search);

  const setQueryString = (
    queryString: Nullable<string>,
    historyState: unknown = null
  ) => {
    const isStatic = isNullType(historyState) || options.isShallow;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
     */
    window.history[isStatic ? 'replaceState' : 'pushState'](
      historyState,
      '',
      `${window.location.pathname}${isNullType(queryString) ? '' : queryString}`
    );
    window.dispatchEvent(new Event('popstate'));
  };

  const listenToPopstate = () => {
    _setQueryString(window.location.search);
  };

  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);

  return [queryString, setQueryString];
}

export default useQueryString;
