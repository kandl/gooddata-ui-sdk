/**
 * We are using Builder pattern to create sdk-model objects https://en.wikipedia.org/wiki/Builder_pattern
 * Each sdk-model should have its own builder, and you should use it.
 *
 * This class serves to:
 * - unify all builders & builder factories across our codebase
 * - hold all common methods and properties of builders (e.g. item & build)
 *
 * @beta
 */
export declare class Builder<T> implements IBuilder<T> {
    protected item: Partial<T>;
    protected validator?: ((item: Partial<T>) => void) | undefined;
    constructor(item: Partial<T>, validator?: ((item: Partial<T>) => void) | undefined);
    build(): T;
    modify(modifications: BuilderModifications<this, T>): this;
    validate(): this;
}
/**
 * Common builder interface
 * @beta
 */
export interface IBuilder<T> {
    /**
     * Build & return current item
     */
    build(): T;
    /**
     * Modify current item with set of modifications
     */
    modify(modifications: BuilderModifications<this, T>): this;
    /**
     * Validate current item, throws error when item is not valid
     */
    validate(): this;
}
/**
 * Extracts item type from generic builder type
 *
 * @beta
 */
export type ExtractBuilderType<TBuilder> = TBuilder extends IBuilder<infer TItem> ? TItem : never;
/**
 * Type that represents generic builder constructor
 *
 * @beta
 */
export type BuilderConstructor<TBuilder extends IBuilder<TItem>, TItem> = new (item: Partial<TItem>) => TBuilder;
/**
 * Function that will be called to perform modifications on item before it is fully constructed
 *
 * @beta
 */
export type BuilderModifications<TBuilder extends IBuilder<TItem>, TItem = ExtractBuilderType<TBuilder>> = (builder: TBuilder) => TBuilder;
/**
 * Represents a callback to update the value, or the value itself.
 * @alpha
 */
export type ValueOrUpdateCallback<TValue> = TValue | ((value: TValue) => TValue);
/**
 * Calls an update callback when it's a function, otherwise returns the value itself.
 * This is just an utility function to DRY the builder implementation a bit.
 *
 * @alpha
 * @param valueOrUpdateCallback - value to set, or update callback
 * @param valueToUpdate - original value to update
 */
export declare const resolveValueOrUpdateCallback: <TValue>(valueOrUpdateCallback: ValueOrUpdateCallback<TValue>, valueToUpdate: TValue) => TValue;
/**
 * Generic builder factory to create sdk-model objects using builder pattern
 *
 * @beta
 */
export declare function builderFactory<TItem, TBuilder extends Builder<TItem>, TBuilderConstructor extends BuilderConstructor<TBuilder, TItem>>(Builder: TBuilderConstructor, defaultItem: Partial<TItem>, modifications: BuilderModifications<TBuilder, TItem>): TItem;
//# sourceMappingURL=builder.d.ts.map