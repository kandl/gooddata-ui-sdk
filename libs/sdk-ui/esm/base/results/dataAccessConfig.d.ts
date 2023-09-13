import { DataValue, ISeparators } from "@gooddata/sdk-model";
/**
 * @public
 */
export type ValueFormatter = (value: DataValue, format: string) => string;
/**
 * @public
 */
export type HeaderTranslator = (value: string | null) => string;
/**
 * Creates value formatter that uses `@gooddata/number-formatter` to format raw measure values according
 * to the format string.
 *
 * @remarks
 * By default, the format will strip away all the coloring information and
 * just return the value as string.
 *
 * @param separators - number separators to use. if not specified then `numberjs` defaults will be used
 * @public
 */
export declare function createNumberJsFormatter(separators?: ISeparators): ValueFormatter;
/**
 * Default configuration for the data access methods. Uses default `@gooddata/number-formatter` formatter and no result formatting.
 *
 * @public
 */
export declare const DefaultDataAccessConfig: DataAccessConfig;
/**
 * @public
 */
export type DataAccessConfig = {
    /**
     * Function to use to format measure values.
     */
    valueFormatter: ValueFormatter;
    /**
     * Function to translate header names.
     */
    headerTranslator?: HeaderTranslator;
};
//# sourceMappingURL=dataAccessConfig.d.ts.map