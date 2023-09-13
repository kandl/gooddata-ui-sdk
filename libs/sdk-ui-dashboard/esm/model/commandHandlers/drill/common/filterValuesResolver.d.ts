import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IResolvedFilterValues, ResolvableFilter } from "../../../types/commonTypes.js";
/**
 * Resolves filter values
 *
 * @param filters - Filters with resolvable values
 *  = all selected elements of attribute filter
 *  + from/to limits of relative date filter
 *  + from/to limits of absolute date filter
 *  @param backend - Analytical backend instance
 *  @param workspace - Workspace id
 * @returns Map of resolved filter values per filter's identifier (date dimension ref or attribute DF ref)
 * @alpha
 */
export declare function resolveFilterValues(filters: ResolvableFilter[], backend?: IAnalyticalBackend, workspace?: string): Promise<IResolvedFilterValues>;
