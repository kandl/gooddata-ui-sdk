import { IDateFilterConfig, IFilterContextDefinition } from "@gooddata/sdk-model";
export declare function createDefaultFilterContext(dateFilterConfig: IDateFilterConfig, 
/**
 * TODO: we should probably get to a state where this parameter is not needed and the selectedOption
 * is always respected (for both new and existing dashboards without filterContext).
 * Done like this for now because it is the way gdc-dashboards behave.
 */
respectSelectedOption?: boolean): IFilterContextDefinition;
