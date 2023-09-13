import { FilterContextItem as BearFilterContextItem, IWrappedFilterContext, IWrappedTempFilterContext } from "@gooddata/api-model-bear";
import { FilterContextItem, IFilterContext, IFilterContextDefinition, ITempFilterContext } from "@gooddata/sdk-model";
export declare const sanitizeExportFilterContext: (exportFilterContext: IFilterContext | ITempFilterContext) => IFilterContext | ITempFilterContext;
/**
 * @internal
 */
export declare const convertFilterContextItem: (filterContextItem: BearFilterContextItem) => FilterContextItem;
/**
 * @internal
 */
export declare const convertFilterContext: (filterContext: IWrappedFilterContext) => IFilterContext | IFilterContextDefinition;
export declare const convertTempFilterContext: (filterContext: IWrappedTempFilterContext) => ITempFilterContext;
//# sourceMappingURL=filterContext.d.ts.map