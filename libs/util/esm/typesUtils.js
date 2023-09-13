// (C) 2021 GoodData Corporation
/**
 * Returns combine guard from input guards as a result type is union type of guarded types
 * Its good for array filtering base on multiple guards and its return correct result union type
 *
 * @internal
 */
export function combineGuards(...guards) {
    return ((x) => (x ? guards.some((f) => f(x)) : false));
}
//# sourceMappingURL=typesUtils.js.map