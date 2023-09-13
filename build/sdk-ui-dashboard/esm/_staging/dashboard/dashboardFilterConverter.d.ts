import { IAttributeFilter, IDashboardAttributeFilter, IDashboardDateFilter } from "@gooddata/sdk-model";
import { DateFilterOption } from "@gooddata/sdk-ui-filters";
/**
 * Converts {@link IDashboardAttributeFilter} to {@link IAttributeFilter}.
 *
 * @internal
 * @param dashboardFilter - filter to convert
 * @returns converted filter
 */
export declare function dashboardAttributeFilterToAttributeFilter(dashboardFilter: IDashboardAttributeFilter): IAttributeFilter;
/**
 * Converts {@link IAttributeFilter} to {@link IDashboardAttributeFilter}.
 *
 * @internal
 * @param filter - filter to convert
 * @param localIdentifier - localIdentifier of the filter
 * @returns converted filter
 */
export declare function attributeFilterToDashboardAttributeFilter(filter: IAttributeFilter, localIdentifier: string | undefined, title: string | undefined): IDashboardAttributeFilter;
/**
 * Converts {@link DateFilterOption} to {@link IDashboardDateFilter} or undefined.
 *
 * @param dateFilterOption - date filter option to convert
 * @param excludeCurrentPeriod - whether or not to exclude the current period
 * @returns converted filter or undefined for All time filter
 */
export declare function dateFilterOptionToDashboardDateFilter(dateFilterOption: DateFilterOption, excludeCurrentPeriod: boolean): IDashboardDateFilter | undefined;
