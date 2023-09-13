import { IPlaceholder, IComposedPlaceholder, PlaceholdersResolvedValues, ComposedPlaceholderResolutionContext, Flatten, UnionToIntersection } from "./base.js";
/**
 * Common placeholder options.
 * @public
 */
export interface IPlaceholderOptions<T> {
    /**
     * By default, each placeholder has a unique generated id.
     *
     * @remarks
     * You can provide id of the placeholder which can be useful for debugging.
     * Please note that the id should be unique for all your placeholders.
     */
    id?: string;
    /**
     * Provide function to validate the placeholder value.
     */
    validate?: (value?: T) => void;
}
/**
 * Create a new placeholder.
 * See {@link IPlaceholder}.
 *
 * @public
 */
export declare function newPlaceholder<T>(defaultValue?: T, options?: IPlaceholderOptions<T>): IPlaceholder<T>;
/**
 * Create a new composed placeholder.
 * See {@link IComposedPlaceholder}.
 *
 * @public
 */
export declare function newComposedPlaceholder<TValue extends any[], TReturn = PlaceholdersResolvedValues<TValue>, TContext = UnionToIntersection<ComposedPlaceholderResolutionContext<Flatten<TValue>>>>(placeholders: [...TValue], computeValue?: (values: PlaceholdersResolvedValues<TValue>, resolutionContext: TContext) => TReturn): IComposedPlaceholder<TReturn, TValue, TContext>;
//# sourceMappingURL=factory.d.ts.map