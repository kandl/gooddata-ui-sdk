import qs from "qs";
/**
 * Stringifies an object to query string. Makes sure arrays are serialized as comma separated, otherwise bear backend does not understand it.
 * @param obj - object to stringify
 * @param options - additional qs.stringify options
 */
export declare const stringify: (obj: object, options?: qs.IStringifyOptions) => string;
//# sourceMappingURL=queryString.d.ts.map