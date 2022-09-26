declare const useQueryParams: <EnumType extends string>(
  options?:
    | {
        isShallow?: boolean | undefined;
      }
    | undefined
) => [
  { [key in EnumType]?: string | undefined },
  (queryParams: { [key_1 in EnumType]?: unknown }) => void
];
export default useQueryParams;
