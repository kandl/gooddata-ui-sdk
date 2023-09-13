/**
 * Lazy array initializer - this function is called to construct the actual value.
 */
export type LazyArrayInitializer<TValue> = (idx: number) => TValue;
/**
 * Simple implementation of fixed-size arrays with lazily initialized elements.
 */
export declare class LazyInitArray<T> implements Iterable<T> {
    private readonly data;
    private readonly initializer;
    constructor(size: number, initializer: LazyArrayInitializer<T>);
    get: (idx: number) => T;
    [Symbol.iterator]: () => Iterator<T>;
}
//# sourceMappingURL=lazyInitArray.d.ts.map