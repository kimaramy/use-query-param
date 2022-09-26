import { useState, useEffect } from 'react';
import { isNullable } from './utils';

const useQueryString = (
  isShallow = false
): [string, (queryString: string, historyState?: unknown) => void] => {
  if (!window) throw new ReferenceError(`'window' is undefined.`);

  const [queryString, _setQueryString] = useState(
    window.location.search.slice(1)
  );

  const setQueryString = (
    queryString: string,
    historyState: unknown = null
  ) => {
    const isStackable = !isNullable(historyState) && !isShallow;
    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/pushState
     * @see https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
     */
    window.history[isStackable ? 'pushState' : 'replaceState'](
      historyState,
      '',
      `${window.location.pathname}${
        queryString.length > 0 ? `?${queryString}` : queryString
      }`
    );
  };

  const listenToPopstate = () => {
    _setQueryString(window.location.search.slice(1));
  };

  useEffect(() => {
    window.addEventListener('popstate', listenToPopstate);
    return () => {
      window.removeEventListener('popstate', listenToPopstate);
    };
  }, []);

  return [queryString, setQueryString];
};

export default useQueryString;
