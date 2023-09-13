import { IPlaceholder, PlaceholderValue, PlaceholderResolvedValue, IComposedPlaceholder } from "./base.js";
import { PlaceholdersState } from "./context.js";
/**
 * Set placeholder value to the context.
 * @internal
 */
export declare function setPlaceholder<T extends IPlaceholder<any>>(placeholder: T, value: PlaceholderValue<T> | undefined, state: PlaceholdersState): PlaceholdersState;
/**
 * Resolve placeholder value from the context, or fallback to default value.
 * @internal
 */
export declare function resolvePlaceholderValue<T extends IPlaceholder<any>>(placeholder: T, state: PlaceholdersState): PlaceholderValue<T> | undefined;
/**
 * Resolve composed placeholder value with provided resolution context.
 * @internal
 */
export declare function resolveComposedPlaceholderValue<TReturn, TValue extends any[], TContext>(placeholder: IComposedPlaceholder<TReturn, TValue, TContext>, state: PlaceholdersState, resolutionContext?: TContext): TReturn | undefined;
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
export declare function resolveValueWithPlaceholders<T, C>(value: T, state: PlaceholdersState, resolutionContext?: C): PlaceholderResolvedValue<T>;
//# sourceMappingURL=resolve.d.ts.map