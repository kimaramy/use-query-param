import React from 'react';
import { useQueryParams, useQueryParam } from '@kimaramyz/use-query-params';
import './App.css';

const App: React.FC = () => {
  const [queryParams, setQueryParams] = useQueryParams<'a' | 'b'>({
    isShallow: true,
  });
  const [a, setA] = useQueryParam('a', (value) => Number(value), {
    isShallow: false,
  });

  console.log('app mounted');
  console.log('queryParams', queryParams);

  return (
    <div className="App">
      <dl>
        <dt>query params</dt>
        <dd>
          <code>{JSON.stringify(queryParams)}</code>
        </dd>
        <dt>query param a</dt>
        <dd>
          <code>{JSON.stringify({ a })}</code>
        </dd>
        <dt>history.length</dt>
        <dd>{window.history.length}</dd>
        <dt>location.pathname</dt>
        <dd>{window.location.pathname}</dd>
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
    </div>
  );
};

export default App;
