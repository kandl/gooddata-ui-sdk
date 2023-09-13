// (C) 2019-2022 GoodData Corporation
import { useCallback, useMemo, useRef } from "react";
import stableStringify from "json-stable-stringify";
import { isPlaceholder, } from "./base.js";
import { usePlaceholdersContext } from "./context.js";
import { invariant } from "ts-invariant";
import { setPlaceholder, resolvePlaceholderValue, resolveComposedPlaceholderValue, resolveValueWithPlaceholders, } from "./resolve.js";
/**
 * React hook to obtain/set placeholder value.
 *
 * @remarks
 * See {@link IPlaceholder}.
 *
 * Note: When placeholder is not provided, setting its value will result in the error.
 *
 * @public
 */
export function usePlaceholder(placeholder) {
    const { state, updateState } = usePlaceholdersContext();
    const resolvedPlaceholderValue = isPlaceholder(placeholder)
        ? resolvePlaceholderValue(placeholder, state)
        : undefined;
    const setPlaceholderValue = useCallback((valueOrUpdateCallback) => {
        updateState((s) => {
            invariant(isPlaceholder(placeholder), "usePlaceholder: Cannot set value of the placeholder - placeholder was not provided.");
            const resoledPlaceholderValue = resolvePlaceholderValue(placeholder, s);
            const updatedValue = valueOrUpdateCallback instanceof Function
                ? valueOrUpdateCallback(resoledPlaceholderValue)
                : valueOrUpdateCallback;
            return setPlaceholder(placeholder, updatedValue, s);
        });
    }, []);
    return [resolvedPlaceholderValue, setPlaceholderValue];
}
/**
 * React hook to obtain/set multiple placeholder values at once.
 *
 * @remarks
 * This is useful to perform placeholders atomic change.
 * See {@link IPlaceholder}.
 * @public
 */
export function usePlaceholders(placeholders) {
    const { state, updateState } = usePlaceholdersContext();
    const resolvedPlaceholderValues = placeholders.map((placeholder) => resolvePlaceholderValue(placeholder, state));
    const memoizedResolvedValues = useMultiValueMemoStringify(resolvedPlaceholderValues);
    const setPlaceholderValues = useCallback((valueOrUpdateCallback) => {
        updateState((s) => {
            const resolvedValues = placeholders.map((placeholder) => resolvePlaceholderValue(placeholder, s));
            const updatedValues = typeof valueOrUpdateCallback === "function"
                ? valueOrUpdateCallback(resolvedValues)
                : valueOrUpdateCallback;
            return placeholders.reduce((acc, placeholder, i) => {
                return setPlaceholder(placeholder, updatedValues[i], acc);
            }, s);
        });
    }, []);
    return [memoizedResolvedValues, setPlaceholderValues];
}
/**
 * React hook to obtain composed placeholder value.
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 * See {@link IComposedPlaceholder}.
 *
 * @public
 */
export function useComposedPlaceholder(placeholder, resolutionContext) {
    const { state } = usePlaceholdersContext();
    const resolvedValue = resolveComposedPlaceholderValue(placeholder, state, resolutionContext);
    return useMemoStringify(resolvedValue);
}
/**
 * React hook that resolves any value(s) that can possibly contain also placeholder(s) to actual value(s).
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 *
 * @public
 */
export function useResolveValueWithPlaceholders(value, resolutionContext) {
    const { state } = usePlaceholdersContext();
    const resolvedValue = resolveValueWithPlaceholders(value, state, resolutionContext);
    return useMemoStringify(resolvedValue);
}
/**
 * React hook that resolves multiple value(s) that can possibly contain also placeholder(s) to actual value(s).
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 *
 * @public
 */
export function useResolveValuesWithPlaceholders(values, resolutionContext) {
    const { state } = usePlaceholdersContext();
    const resolvedValues = values === null || values === void 0 ? void 0 : values.map((value) => resolveValueWithPlaceholders(value, state, resolutionContext));
    return useMultiValueMemoStringify(resolvedValues);
}
/**
 * Memoize value by its stringified value, to avoid new reference on each render.
 *
 * @param value - value to memoize
 * @returns - memoized value
 * @internal
 */
export function useMemoStringify(value) {
    return useMemo(() => {
        return value;
    }, [stableStringify(value)]);
}
/**
 * Memoize multiple values by their stringified value, to avoid new reference on each render.
 *
 * @param values - values to memoize
 * @returns - memoized values
 * @internal
 */
export function useMultiValueMemoStringify(values) {
    var _a;
    const prevValues = useRef((_a = values === null || values === void 0 ? void 0 : values.map((v) => ({
        hash: stableStringify(v),
        value: v,
    }))) !== null && _a !== void 0 ? _a : []);
    return useMemo(() => {
        return values === null || values === void 0 ? void 0 : values.map((val, idx) => {
            const hash = stableStringify(val);
            if (hash === prevValues.current[idx].hash) {
                return prevValues.current[idx].value;
            }
            prevValues.current[idx] = {
                hash,
                value: val,
            };
            return val;
        });
    }, [stableStringify(values)]);
}
//# sourceMappingURL=hooks.js.map