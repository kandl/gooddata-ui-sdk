import { FilterDefinition } from "@gooddata/api-client-tiger";
import { IFilter } from "@gooddata/sdk-model";
/**
 * Tiger specific wrapper for IFilter, adding 'applyOnResult' property influencing the place of filter application.
 * This property could very well be part of each I*Filter but since it's needed only internally so far it's better
 * to not change the public API.
 *
 * @internal
 */
export interface IFilterWithApplyOnResult {
    filter: IFilter;
    applyOnResult: boolean | undefined;
}
export declare function newFilterWithApplyOnResult(filter: IFilter, applyOnResult: boolean | undefined): IFilterWithApplyOnResult;
export declare function convertFilter(filter0: IFilter | IFilterWithApplyOnResult): FilterDefinition | null;
//# sourceMappingURL=FilterConverter.d.ts.map