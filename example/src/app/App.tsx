import React from 'react';
import {
  useQueryParams,
  useQueryParam,
  useQueryString,
} from '@kimaramyz/use-query-params';
import './App.css';

const App: React.FC = () => {
  const [queryParams, setQueryParams] = useQueryParams<'a' | 'b'>({
    isShallow: true,
  });
  const [a, setA] = useQueryParam('a', {
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

      <button
        onClick={() => {
          setQueryParams({});
        }}
      >
        clear
      </button>

      <button
        onClick={() => {
          setQueryParams({ a: 1 });
        }}
      >
        reset with a
      </button>

      <button
        onClick={() => {
          setQueryParams({ ...queryParams, a: 2 });
        }}
      >
        upsert a
      </button>

      <button
        onClick={() => {
          setQueryParams({ ...queryParams, b: 2 });
        }}
      >
        upsert b
      </button>

      <button
        onClick={() => {
          setQueryParams({ ...queryParams, b: undefined });
        }}
      >
        delete b
      </button>

      <button
        onClick={() => {
          setA(2);
        }}
      >
        upsert a
      </button>

      <button
        onClick={() => {
          setQS('?a=4&b=4');
        }}
      >
        set qs
      </button>

      <button
        onClick={() => {
          setQS(null);
        }}
      >
        clear qs
      </button>
    </div>
  );
};

export default App;
