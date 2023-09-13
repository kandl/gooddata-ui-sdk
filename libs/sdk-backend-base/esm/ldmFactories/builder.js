// (C) 2019-2021 GoodData Corporation
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
export class Builder {
    constructor(item, validator) {
        this.item = item;
        this.validator = validator;
    }
    build() {
        return this.item;
    }
    modify(modifications) {
        this.item = modifications(this).build();
        return this;
    }
    validate() {
        if (typeof this.validator !== "function") {
            throw new Error("Validator was not provided!");
        }
        this.validator(this.item);
        return this;
    }
}
/**
 * Calls an update callback when it's a function, otherwise returns the value itself.
 * This is just an utility function to DRY the builder implementation a bit.
 *
 * @alpha
 * @param valueOrUpdateCallback - value to set, or update callback
 * @param valueToUpdate - original value to update
 */
export const resolveValueOrUpdateCallback = (valueOrUpdateCallback, valueToUpdate) => 
// typeof === "function" does not work here
// Related issue: https://github.com/microsoft/TypeScript/issues/37663
valueOrUpdateCallback instanceof Function ? valueOrUpdateCallback(valueToUpdate) : valueOrUpdateCallback;
/**
 * Generic builder factory to create sdk-model objects using builder pattern
 *
 * @beta
 */
export function builderFactory(Builder, defaultItem, modifications) {
    const builder = new Builder(defaultItem);
    return modifications(builder).build();
}
//# sourceMappingURL=builder.js.map