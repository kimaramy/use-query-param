# @kimaramyz/use-query-params

`@kimaramyz/use-query-params` is a library of React hooks for using URL query params as state. Light-weight, TS support and no dependencies. This allows you to easily synchronize(encode and decode) react state with URL query parameters. Implemented by `History` API and `URLSearchParams` API.

## Background

<!-- Need for query parameters as state -->

When creating apps with easily shareable URLs, you often want to encode state as query parameters, but all query parameters must be encoded as strings.

<!-- Complements ReactRouter -->

If you are doing a React-based project, you will probably be using `ReactRouter` or `NextRouter` together. However, the part where these routers use query string as a state, i.e., `useSearchParams`, returns instance of `URLSearchParams`, so you may need to parse it again. Therefore, this library can help you when you're trying to use query params with `ReactRouter` or `NextRouter`, and the other `History` API-based router libraries.

## Features

- Provides three options for using query params.

  - [useQueryParams](#useQueryParams)
  - [useQueryParam](#useQueryParam)
  - [useQueryString](#useQueryString)

- Provides useful options

  - Shallow routing - Able to update query parameter with no history changes
  - Hard/Soft key-value deletion (Upcoming)

- No adapter required
- Typescript support
- Light-weight (5KB)
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
declare function useQueryParams<KeyEnum extends string>(options?: {
  isShallow?: boolean;
}): [
  { [key in KeyEnum]?: string | undefined },
  (queryParams: { [key in KeyEnum]?: unknown }) => void
];
```

</details>

#### Basic example

```tsx
import { FC } from 'react';
import { useQueryParams } from '@kimaramyz/use-query-params';

const BasicExample: FC = () => {
  const [queryParams, setQueryParams] = useQueryParams<'page' | 'q'>();

  return (
    <div>
      <h1>queryParams: {JSON.stringify(queryParams, null, 2)}</h1>
      <button onClick={() => setQueryParams({ ...queryParams, page: 2 })}>
        Upsert pageParam
      </button>
      <button
        onClick={() => setQueryParams({ ...queryParams, page: undefined })}
      >
        Delete pageParam
      </button>
      <button onClick={() => setQueryParams(null)}>Clear</button>
    </div>
  );
};
```

#### Using shallow routing

```tsx
import { FC } from 'react';
import { useQueryParams } from '@kimaramyz/use-query-params';

const ShallowRoutingExample: FC = () => {
  const [queryParams, setQueryParams] = useQueryParams<'page' | 'q'>({
    isShallow: true,
  });

  return (
    <div>
      <h1>queryParams: {JSON.stringify(queryParams, null, 2)}</h1>
      <h2>history.length: {window.history.length}</h2>
      <button onClick={() => setQueryParams({ ...queryParams, page: 2 })}>
        Upsert pageParam
      </button>
      <button
        onClick={() => setQueryParams({ ...queryParams, page: undefined })}
      >
        Delete pageParam
      </button>
      <button onClick={() => setQueryParams(null)}>Clear</button>
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
declare function useQueryParam<T = string>(
  key: string,
  options?: {
    isShallow?: boolean;
  }
): [T | null | undefined, (value: unknown) => void];
```

</details>

#### Basic example

```tsx
import { FC } from 'react';
import { useQueryParam } from '@kimaramyz/use-query-params';

const BasicExample: FC = () => {
  const [page, setPage] = useQueryParam('page');

  return (
    <div>
      <h1>page: {page}</h1>
      <button onClick={() => setPage(1)}>Upsert</button>
      <button onClick={() => setPage(undefined)}>Clear</button>
    </div>
};
```

#### Using shallow routing

```tsx
import { FC } from 'react';
import { useQueryParam } from '@kimaramyz/use-query-params';

const ShallowRoutingExample: FC = () => {
  const [page, setPage] = useQueryParam('page', { isShallow: true });

  return (
    <div>
      <h1>page: {page}</h1>
      <h2>history.length: {window.history.length}</h2>
      <button onClick={() => setPage(1)}>Upsert</button>
      <button onClick={() => setPage(undefined)}>Clear</button>
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
}): [
  string,
  (queryString: string | null | undefined, historyState?: unknown) => void
];
```

</details>

#### Basic example

```tsx
import { FC } from 'react';
import { useQueryString } from '@kimaramyz/use-query-params';

const BasicExample: FC = () => {
  const [queryString, setQueryString] = useQueryString();

  return (
    <div>
      <h1>queryString: {queryString}</h1>
      <button onClick={() => setQueryString('?page=1&q=foo')}>Upsert</button>
      <button onClick={() => setQueryString(undefined)}>Clear</button>
    </div>
  );
};
```

#### Using shallow routing

```tsx
import { FC } from 'react';
import { useQueryString } from '@kimaramyz/use-query-params';

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
