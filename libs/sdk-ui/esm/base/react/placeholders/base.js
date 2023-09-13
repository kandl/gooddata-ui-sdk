// (C) 2019-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
/**
 * Type-guard testing whether the provided object is an instance of {@link AnyPlaceholder}.
 * @public
 */
export function isAnyPlaceholder(obj) {
    const guards = [isPlaceholder, isComposedPlaceholder];
    return guards.some((pred) => pred(obj));
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IPlaceholder}.
 * @public
 */
export function isPlaceholder(obj) {
    return !isEmpty(obj) && obj.type === "IPlaceholder";
}
/**
 * Type-guard testing whether the provided object is an instance of {@link IComposedPlaceholder}.
 * @public
 */
export function isComposedPlaceholder(obj) {
    return (!isEmpty(obj) &&
        obj.type === "IComposedPlaceholder");
}
//# sourceMappingURL=base.js.map