# @kimaramyz/use-query-params

`@kimaramyz/use-query-params` is a library of React hooks for using URL query params as state. Light-weight, TS support and no dependencies. This allows you to easily encode and decode data of primitive type. Implemented by `History` API and `URLSearchParams` API.

## Background

<!-- Need for query parameters as state -->

When creating apps with easily shareable URLs, you often want to encode state as query parameters, but all query parameters must be encoded as strings.

<!-- Complements ReactRouter -->

If you are doing a React-based project, you will probably be using `ReactRouter` together with a high probability. However, the part where `ReactRouter` uses query string as a state, i.e., `useSearchParams`, returns instance of `URLSearchParams`, so you may need to parse it again. Therefore, this library can help you when you're trying to use query params with `ReactRouter`, another `History` API-based router library either.

## Features

- Provides three options of URL query hooks

  - [useQueryParams](#useQueryParams)
  - [useQueryParam](#useQueryParam)
  - [useQueryString](#useQueryString)

- Provides useful options

  - Shallow routing - Able to update query parameter with no history changes
  - Hard/Soft key-value deletion (Upcoming)

- No wrapping `Provider` required
- Typescript support
- Light-weight (5KB)
- No dependencies.

  - No serializer library dependent
  - No router library dependent
  - Perfectly compatible with any version of React Router

## API

### useQueryParams

<details>
  <summary>Type declaration</summary>
  <br />

```ts
declare function useQueryParams<ParamKeyEnumOrUnion extends string>(options?: {
  isShallow?: boolean;
}): [
  { [key in ParamKeyEnumOrUnion]?: string | undefined },
  (queryParams: { [key in ParamKeyEnumOrUnion]?: unknown }) => void
];
```

</details>

#### Example

```jsx
import { FC } from 'react';
import { useQueryParams } from '@kimaramyz/use-query-params';

const UseQueryParamsExample: FC = () => {
  const [queryParams, setQueryParams] = useQueryParams<'page' | 'q'>();

  return (
    <div>
      <h1>queryParams is {JSON.stringify(queryParams, null, 2)}</h1>
      <button onClick={() => setQueryParams({ ...queryParams, page: 2 })}>
        Upsert pageParam
      </button>
      <button
        onClick={() => setQueryParams({ ...queryParams, page: undefined })}
      >
        Delete pageParam
      </button>
      <button onClick={() => setQueryParams({})}>Clear</button>
    </div>
  );
};

export default UseQueryParamsExample;
```

<!-- BREAK -->

### useQueryParam

<details>
  <summary>Type declaration</summary>
  <br />

```ts
declare function useQueryParam<T = string>(
  key: string,
  formatValue?: ((value: string) => T) | undefined,
  options?:
    | {
        isShallow?: boolean | undefined;
      }
    | undefined
): [T, (value: T) => void];
```

</details>

#### Example

```jsx
import { FC } from 'react';
import { useQueryParams, useQueryParam } from '@kimaramyz/use-query-params';

const UseQueryParamExample: FC = () => {
  const [pageParam, setPageParam] = useQueryParam('page', (value) =>
    Number(value)
  );

  return (
    <div>
      <h1>pageParam is {pageParam}</h1>
      <button onClick={() => setPageParam(1)}>Upsert</button>
      <button onClick={() => setPageParam(undefined)}>Clear</button>
    </div>
  );
};

export default UseQueryParamExample;
```

<!-- BREAK -->

### useQueryString

<details>
  <summary>Type declaration</summary>
  <br />

```ts
declare function useQueryString(
  isShallow?: boolean
): [string, (queryString: string, historyState?: unknown) => void];
```

</details>

#### Example

```jsx
import { FC } from 'react';
import { useQueryString } from '@kimaramyz/use-query-params';

const UseQueryStringExample: FC = () => {
  const [queryString, setQueryString] = useQueryString();

  return (
    <div>
      <h1>queryString is {queryString}</h1>
      <button onClick={() => setQueryString('?page=1&q=foo')}>Upsert</button>
      <button onClick={() => setQueryString('')}>Clear</button>
    </div>
  );
};

export default UseQueryStringExample;
```
