import { ObjRef, FilterContextItem, IWidgetDefinition } from "@gooddata/sdk-model";
import { IDashboardFilter } from "../../../../types.js";
/**
 * Converts a {@link IDashboardFilter} to a {@link FilterContextItem}.
 * @param filter - filter to convert
 */
export declare function dashboardFilterToFilterContextItem(filter: IDashboardFilter): FilterContextItem;
/**
 * Remove information about the date dataset from Date filters. Attribute filters are returned unchanged.
 * @param filter - filter to strip date dataset from
 */
export declare function stripDateDatasets(filter: FilterContextItem): FilterContextItem;
export declare function isAttributeFilterIgnored(widget: IWidgetDefinition, displayForm: ObjRef): boolean;
export declare function isDateFilterIgnored(widget: IWidgetDefinition, displayForm: ObjRef): boolean;
export declare function isDateFilterIrrelevant(widget: IWidgetDefinition): boolean;
