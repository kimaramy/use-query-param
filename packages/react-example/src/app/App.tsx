import type { FC } from 'react';
// import { useState } from 'react';
import {
  useQueryParam,
  useQueryParams,
  useQueryString,
} from 'react-use-query-param';
import './App.css';

const App: FC = () => {
  const [queryParams, { set: setQueryParams, clear: clearQueryParams }] =
    useQueryParams<'a' | 'b'>({
      isShallow: false,
    });
  const [a, { set: setA }] = useQueryParam('a', {
    isShallow: false,
  });
  const [qs, setQS] = useQueryString();

  console.log('app mounted');
  console.log('queryParams', queryParams);

  return (
    <div className="App">
      <dl>
        <dt>QueryParams</dt>
        <dd>
          <code>{JSON.stringify(queryParams)}</code>
        </dd>
        <dt>QueryParam A</dt>
        <dd>
          <code>{JSON.stringify({ a })}</code>
        </dd>
        <dt>QueryString</dt>
        <dd>
          <code>{qs}</code>
        </dd>
        <dt>history.length</dt>
        <dd>{window.history.length}</dd>
      </dl>

      <button onClick={() => clearQueryParams()}>Delete all</button>

      <button onClick={() => setQueryParams({ a: 1 })}>
        Delete all and Upsert &#39;a&#39; to 1
      </button>

      <button onClick={() => setQueryParams({ ...queryParams, a: 2 })}>
        Upsert &#39;a&#39; to 2
      </button>

      <button onClick={() => setQueryParams({ ...queryParams, b: 2 })}>
        Upsert &#39;b&#39; to 2
      </button>

      <button onClick={() => setQueryParams({ ...queryParams, b: undefined })}>
        Delete &#39;b&#39;
      </button>

      <button onClick={() => setA(2)}>Upsert &#39;a&#39; to 2</button>

      <button onClick={() => setQS('?a=4&b=4')}>Replace qs</button>

      <button onClick={() => setQS(null)}>Clear qs</button>
    </div>
  );
};

export default App;
