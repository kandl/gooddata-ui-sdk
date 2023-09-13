import { ValueOrUpdateCallback } from "@gooddata/sdk-backend-base";
import { IPlaceholder, IComposedPlaceholder, PlaceholderValue, PlaceholdersValues, PlaceholderResolvedValue, PlaceholdersResolvedValues } from "./base.js";
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
export declare function usePlaceholder<T extends IPlaceholder<any>>(placeholder?: T): [
    PlaceholderValue<T> | undefined,
    (valueOrUpdateCallback: ValueOrUpdateCallback<PlaceholderValue<T> | undefined>) => void
];
/**
 * React hook to obtain/set multiple placeholder values at once.
 *
 * @remarks
 * This is useful to perform placeholders atomic change.
 * See {@link IPlaceholder}.
 * @public
 */
export declare function usePlaceholders<T extends IPlaceholder<any>[]>(placeholders: [...T]): [PlaceholdersValues<T>, (valueOrUpdateCallback: ValueOrUpdateCallback<PlaceholdersValues<T>>) => void];
/**
 * React hook to obtain composed placeholder value.
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 * See {@link IComposedPlaceholder}.
 *
 * @public
 */
export declare function useComposedPlaceholder<TContext, TPlaceholder extends IComposedPlaceholder<any, any, TContext>>(placeholder: TPlaceholder, resolutionContext?: TContext): PlaceholderResolvedValue<TPlaceholder>;
/**
 * React hook that resolves any value(s) that can possibly contain also placeholder(s) to actual value(s).
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 *
 * @public
 */
export declare function useResolveValueWithPlaceholders<T, C>(value: T, resolutionContext?: C): PlaceholderResolvedValue<T>;
/**
 * React hook that resolves multiple value(s) that can possibly contain also placeholder(s) to actual value(s).
 *
 * @remarks
 * You can provide custom context for the composed placeholders resolution.
 *
 * @public
 */
export declare function useResolveValuesWithPlaceholders<T extends any[], C>(values: [...T], resolutionContext?: C): PlaceholdersResolvedValues<T>;
/**
 * Memoize value by its stringified value, to avoid new reference on each render.
 *
 * @param value - value to memoize
 * @returns - memoized value
 * @internal
 */
export declare function useMemoStringify<T>(value: T): T;
/**
 * Memoize multiple values by their stringified value, to avoid new reference on each render.
 *
 * @param values - values to memoize
 * @returns - memoized values
 * @internal
 */
export declare function useMultiValueMemoStringify<T extends any[]>(values: T): T;
//# sourceMappingURL=hooks.d.ts.map