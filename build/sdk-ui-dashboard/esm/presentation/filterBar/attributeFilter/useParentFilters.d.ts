import { IDashboardAttributeFilter } from "@gooddata/sdk-model";
import { IAttributeFilterBaseProps } from "@gooddata/sdk-ui-filters";
/**
 * Result of the {@link useParentFilters} hook, that can be used as parent filtering input props for {@link @gooddata/sdk-ui-filters#AttributeFilter}.
 *
 * @public
 */
export type UseParentFiltersResult = Pick<IAttributeFilterBaseProps, "parentFilters" | "parentFilterOverAttribute">;
/**
 * Returns parent filtering input props for {@link @gooddata/sdk-ui-filters#AttributeFilter} for particular dashboard attribute filter.
 *
 * @param filter - dashboard filter to get the parent filter-related data
 *
 * @public
 */
export declare const useParentFilters: (filter: IDashboardAttributeFilter) => UseParentFiltersResult;
