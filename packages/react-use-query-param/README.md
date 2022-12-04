# react-use-query-param

`react-use-query-param` is a library of React hooks for using URL query params as state. Light-weight, TS support and no dependencies. This allows you to easily synchronize(encode and decode) react state with URL query parameters. Implemented by `History` API and `URLSearchParams` API.

## Background

<!-- Need for query parameters as state -->

When creating apps with easily shareable URLs, you often want to encode state as query parameters, but all query parameters must be encoded as strings.

<!-- Complements ReactRouter -->

If you are doing a React-based SPA project, you will probably be using `ReactRouter` together. However, the part where these routers use query string as a state, i.e., `useSearchParams`, returns instance of `URLSearchParams`, so you may need to parse it again. Therefore, this library can help you when you're trying to use query params with `ReactRouter`, and the other `History` API-based router libraries.

## Features

- Provides three options for using query params.

  - [useQueryParams](#useQueryParams)
  - [useQueryParam](#useQueryParam)
  - [useQueryString](#useQueryString)

- Provides useful options

  - Shallow routing; You can update query param(s) with no history changes
  - Lazy value initialization (Upcoming)
  <!-- - Hard/Soft key-value deletion (Upcoming) -->

- No adapter required
- Typescript support
- Light-weight (10KB)
- No dependencies.

  - No serializer library dependent
  - No router library dependent
  - Perfectly compatible with any version of `ReactRouter`

## API

### useQueryParams

<details>
  <summary>Type declaration</summary>
  <br />

```ts
declare function useQueryParams<T extends string = string>(options?: {
  isShallow?: boolean;
}): [
  { [key in T]?: string | undefined },
  {
    set: (queryParams: Nullable<{ [key in T]?: unknown }>) => void;
    clear: () => void;
  }
];
```

</details>

#### Basic example

```tsx
import { useQueryParams } from 'react-use-query-param';

const BasicExample: React.FC = () => {
  const [queryParams, { set: setQueryParams, clear: clearQueryParams }] =
    useQueryParams<'page' | 'q'>();

  return (
    <div>
      <h1>URL query params: {JSON.stringify(queryParams, null, 2)}</h1>
      <button onClick={() => setQueryParams({ ...queryParams, page: 2 })}>
        Upsert pageParam
      </button>
      <button
        onClick={() => setQueryParams({ ...queryParams, page: undefined })}
      >
        Delete pageParam
      </button>
      <button onClick={() => clearQueryParams()}>Clear</button>
    </div>
  );
};
```

#### Using shallow routing

```tsx
import { useQueryParams } from 'react-use-query-param';

const ShallowRoutingExample: React.FC = () => {
  const [queryParams, { set: setQueryParams, clear: clearQueryParams }] =
    useQueryParams<'page' | 'q'>({
      isShallow: true,
    });

  return (
    <div>
      <h1>URL query params: {JSON.stringify(queryParams, null, 2)}</h1>
      <h2>history.length: {window.history.length}</h2>
      <button onClick={() => setQueryParams({ ...params, page: 2 })}>
        Upsert pageParam
      </button>
      <button onClick={() => setQueryParams({ ...params, page: undefined })}>
        Delete pageParam
      </button>
      <button onClick={() => clearQueryParams()}>Clear</button>
    </div>
  );
};
```

<br />

### useQueryParam

<details>
  <summary>Type declaration</summary>
  <br />

```ts
declare function useQueryParam<T extends string = string>(
  key: string,
  options?: {
    isShallow?: boolean;
  }
): [
  Nullable<T>,
  {
    set: (value: unknown) => void;
    clear: () => void;
  }
];
```

</details>

#### Basic example

```tsx
import { useQueryParam } from 'react-use-query-param';

const BasicExample: React.FC = () => {
  const [pageParam, { set: setPageParam, clear: removePageParam }] = useQueryParam('page');

  return (
    <div>
      <h1>page: {pageParam}</h1>
      <button onClick={() => setPageParam(1)}>Upsert</button>
      <button onClick={() => removePageParam()}>Clear</button>
    </div>
};
```

#### Using shallow routing

```tsx
import { useQueryParam } from 'react-use-query-param';

const ShallowRoutingExample: React.FC = () => {
  const [pageParam, { set: setPageParam, clear: removePageParam }] =
    useQueryParam('page', {
      isShallow: true,
    });

  return (
    <div>
      <h1>page: {pageParam}</h1>
      <h2>history.length: {window.history.length}</h2>
      <button onClick={() => setPageParam(1)}>Upsert</button>
      <button onClick={() => removePageParam()}>Clear</button>
    </div>
  );
};
```

<br />

### useQueryString

<details>
  <summary>Type declaration</summary>
  <br />

```ts
declare function useQueryString(options?: {
  isShallow?: boolean;
}): [string, (queryString: Nullable<string>, historyState?: unknown) => void];
```

</details>

#### Basic example

```tsx
import { FC } from 'react';
import { useQueryString } from 'react-use-query-param';

const BasicExample: FC = () => {
  const [queryString, setQueryString] = useQueryString();

  return (
    <div>
      <h1>URL query string: {queryString}</h1>
      <button onClick={() => setQueryString('?page=1&q=foo')}>Upsert</button>
      <button onClick={() => setQueryString(undefined)}>Clear</button>
    </div>
  );
};
```

#### Using shallow routing

```tsx
import { FC } from 'react';
import { useQueryString } from 'react-use-query-param';

const ShallowRoutingExample: FC = () => {
  const [queryString, setQueryString] = useQueryString({ isShallow: true });

  return (
    <div>
      <h1>queryString: {queryString}</h1>
      <h2>history.length: {window.history.length}</h2>
      <button onClick={() => setQueryString('?page=1&q=foo')}>Upsert</button>
      <button onClick={() => setQueryString(undefined)}>Clear</button>
    </div>
  );
};
```
