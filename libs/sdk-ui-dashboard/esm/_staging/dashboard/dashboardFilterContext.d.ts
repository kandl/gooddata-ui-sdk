import { IDateFilterConfig, IDashboardObjectIdentity, IFilterContextDefinition, IDashboard } from "@gooddata/sdk-model";
/**
 * Given a dashboard, this function will inspect its filter context and always return a valid instance of IFilterContextDefinition to use.
 *
 * The filter context definition represents a filter context that may or may not be already persisted on the backend. As such, this is
 * ideal to represent all possible states:
 *
 * 1. Dashboard has a persisted filter context
 * 2. Dashboard has no persisted filter context, in which case a new, default context should be used
 * 3. Dashboard is being exported and uses a temporary filter context that may stored in a different persistence store and
 *    possibly in a different format - while holding the same information.
 *
 * The filter context will be validated and sanitized so that any bad items (that may be added through rest API without validation)
 * will be removed.
 *
 * TODO: it's worth considering whether the temp filter context should be rather hidden as an impl detail and not exposed via SPI.
 *
 * @param dashboard - dashboard to get filter context from
 * @param dateFilterConfig - date filter config to use in case default filter context has to be created
 */
export declare function dashboardFilterContextDefinition<TWidget>(dashboard: IDashboard<TWidget>, dateFilterConfig: IDateFilterConfig): IFilterContextDefinition;
/**
 * Given a dashboard, this function will return identity information about the filter context used by the dashboard.
 *
 * If the dashboard has no filter context or a temporary filter context (used during exports) the identity
 * will be undefined. This should be indication to the caller that whatever the filter context the dashboard
 * is working with is not persisted.
 *
 * @param dashboard - dashboard to get filter context from.
 */
export declare function dashboardFilterContextIdentity<TWidget>(dashboard: IDashboard<TWidget>): IDashboardObjectIdentity | undefined;
/**
 * This function will sanitize the filter context and remove invalid entries:
 *
 * 1.  Attribute filters that are setup with parent filters, but those parent filters do not exist in the contex.
 */
export declare function dashboardFilterContextSanitize(filterContext: IFilterContextDefinition): IFilterContextDefinition;
