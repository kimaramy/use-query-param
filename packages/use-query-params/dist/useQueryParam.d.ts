declare const useQueryParam: <T = string>(key: string, formatValue?: ((value: string) => T) | undefined, options?: {
    isShallow?: boolean | undefined;
} | undefined) => [T, (value: T) => void];
export default useQueryParam;
