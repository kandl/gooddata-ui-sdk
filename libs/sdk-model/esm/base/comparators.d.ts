/**
 * Function that can be used to sort collections. The semantics are the same as the first argument to Array#sort function.
 * @public
 */
export type IComparator<T> = (a: T, b: T) => number;
/**
 * Direction of the comparator.
 * @public
 */
export type ComparatorDirection = "asc" | "desc";
/**
 * Creates a new string-based comparator.
 *
 * @internal
 */
export declare const stringComparatorFactory: <TInput>(valueAccessor: (obj: TInput) => string | undefined) => (direction: ComparatorDirection) => IComparator<TInput>;
/**
 * Creates a new date-string-based comparator.
 *
 * @internal
 */
export declare const dateStringComparatorFactory: <TInput>(valueAccessor: (obj: TInput) => string | undefined) => (direction: ComparatorDirection) => IComparator<TInput>;
//# sourceMappingURL=comparators.d.ts.map