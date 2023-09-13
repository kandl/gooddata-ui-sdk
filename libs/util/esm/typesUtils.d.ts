/**
 * @internal
 */
export type GuardType<T> = T extends (o: unknown) => o is infer U ? U : never;
/**
 * Returns combine guard from input guards as a result type is union type of guarded types
 * Its good for array filtering base on multiple guards and its return correct result union type
 *
 * @internal
 */
export declare function combineGuards<T extends ((x: unknown) => x is unknown)[]>(...guards: T): (x: unknown) => x is GuardType<T[number]>;
//# sourceMappingURL=typesUtils.d.ts.map