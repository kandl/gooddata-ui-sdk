/**
 * This is an all-in-one package that has all GoodData.UI packages as dependencies and re-exports their public API.
 *
 * @remarks
 * The primary purpose of this package is to simplify migration from previous versions of GoodData.UI
 * that were all delivered in a single `@gooddata/react-components` package.
 *
 * @packageDocumentation
 */


export * from "@gooddata/sdk-backend-spi";
export * from "@gooddata/sdk-model";
export * from "@gooddata/sdk-ui";
export * from "@gooddata/sdk-ui-charts";
export * from "@gooddata/sdk-ui-ext";
export * from "@gooddata/sdk-ui-filters";
export * from "@gooddata/sdk-ui-geo";
export * from "@gooddata/sdk-ui-pivot";

export { }
