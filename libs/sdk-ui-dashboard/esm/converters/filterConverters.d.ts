import { IAttributeFilter, IDateFilter, ObjRef, FilterContextItem, IDashboardAttributeFilter, IDashboardDateFilter, IFilterContext, IFilterContextDefinition, ITempFilterContext, IFilterableWidget, IWidgetDefinition } from "@gooddata/sdk-model";
import { IDashboardFilter } from "../types.js";
/**
 * Gets {@link IDashboardFilter} items for filters specified in given filterContext in relation to the given widget.
 *
 * @param filterContext - filter context to get filters for
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function filterContextToDashboardFiltersByWidget(filterContext: IFilterContextDefinition | IFilterContext | ITempFilterContext | undefined, widget: IWidgetDefinition): IDashboardFilter[];
/**
 * Gets {@link IDashboardFilter} items for filters specified in given filterContext in relation to the
 * given dateDataSet.
 *
 * @param filterContext - filter context to get filters for
 * @param dateDataSet - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function filterContextToDashboardFiltersByDateDataSet(filterContext: IFilterContextDefinition | IFilterContext | ITempFilterContext | undefined, dateDataSet: ObjRef): IDashboardFilter[];
/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardAttributeFilter} to {@link @gooddata/sdk-model#IAttributeFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @public
 */
export declare function dashboardAttributeFilterToAttributeFilter(filter: IDashboardAttributeFilter): IAttributeFilter;
/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardDateFilter} to {@link @gooddata/sdk-model#IDateFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function dashboardDateFilterToDateFilterByWidget(filter: IDashboardDateFilter, widget: Partial<IFilterableWidget>): IDateFilter;
/**
 * Converts {@link @gooddata/sdk-backend-spi#IDashboardDateFilter} to {@link @gooddata/sdk-model#IDateFilter} instance.
 *
 * @param filter - filter context attribute filter to convert
 * @param dateDataSet - date data set to define {@link @gooddata/sdk-model#IDateFilter}
 * @public
 */
export declare function dashboardDateFilterToDateFilterByDateDataSet(filter: IDashboardDateFilter, dateDataSet: ObjRef): IDateFilter;
/**
 * Gets {@link IDashboardFilter} items for filters specified as {@link @gooddata/sdk-backend-spi#FilterContextItem} instances.
 *
 * @param filterContextItems - filter context items to get filters for
 * @param widget - widget to use to get dateDataSet for date filters
 * @public
 */
export declare function filterContextItemsToDashboardFiltersByWidget(filterContextItems: FilterContextItem[], widget: Partial<IFilterableWidget>): IDashboardFilter[];
/**
 * Gets {@link IDashboardFilter} items for filters specified as {@link @gooddata/sdk-backend-spi#FilterContextItem} instances.
 *
 * @param filterContextItems - filter context items to get filters for
 * @param dateDataSet - date data set to define {@link @gooddata/sdk-model#IDateFilter}
 * @public
 */
export declare function filterContextItemsToDashboardFiltersByDateDataSet(filterContextItems: FilterContextItem[], dateDataSet: ObjRef): IDashboardFilter[];
