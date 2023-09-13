// (C) 2019-2022 GoodData Corporation
import isArray from "lodash/isArray.js";
import { isPlaceholder, isAnyPlaceholder, isComposedPlaceholder, } from "./base.js";
/**
 * Set placeholder value to the context.
 * @internal
 */
export function setPlaceholder(placeholder, value, state) {
    if (placeholder.validate) {
        placeholder.validate(value);
    }
    if (isPlaceholder(placeholder)) {
        return Object.assign(Object.assign({}, state), { placeholders: Object.assign(Object.assign({}, state.placeholders), { [placeholder.id]: Object.assign(Object.assign({}, placeholder), { value }) }) });
    }
    return state;
}
/**
 * Resolve placeholder value from the context, or fallback to default value.
 * @internal
 */
export function resolvePlaceholderValue(placeholder, state) {
    var _a, _b;
    const placeholderValue = (_b = (_a = state.placeholders[placeholder.id]) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : placeholder.defaultValue;
    if (placeholder.validate) {
        placeholder.validate(placeholderValue);
    }
    return placeholderValue;
}
/**
 * Resolve composed placeholder value with provided resolution context.
 * @internal
 */
export function resolveComposedPlaceholderValue(placeholder, state, resolutionContext) {
    const values = placeholder.placeholders.map((p) => resolveValueWithPlaceholders(p, state, resolutionContext));
    return placeholder.computeValue(values, resolutionContext);
}
/**
 * Resolve value(s) that can possibly contain also placeholder(s) to actual value(s).
 * Arrays with nested placeholders that are holding arrays are flattened.
 * You can specify custom resolution context for the composed placeholders.
 *
 * This is method you want to use to replace placeholders in any value with actual placeholder values.
 * It does not support object traversing as most of the visualizations interfaces
 * are consuming only arrays or single values.
 *
 * @internal
 */
export function resolveValueWithPlaceholders(value, state, resolutionContext) {
    if (isPlaceholder(value)) {
        return resolvePlaceholderValue(value, state);
    }
    else if (isComposedPlaceholder(value)) {
        return resolveComposedPlaceholderValue(value, state, resolutionContext);
    }
    else if (isArray(value)) {
        return value.reduce((acc, v) => {
            const resolvedValue = resolveValueWithPlaceholders(v, state, resolutionContext);
            if (isAnyPlaceholder(v)) {
                // Omit placeholder values that are not set
                if (!resolvedValue) {
                    return acc;
                }
                else if (isArray(resolvedValue)) {
                    acc.push(...resolvedValue.filter((v) => typeof v !== "undefined"));
                    return acc;
                }
            }
            acc.push(resolvedValue);
            return acc;
        }, []);
    }
    return value;
}
//# sourceMappingURL=resolve.js.map