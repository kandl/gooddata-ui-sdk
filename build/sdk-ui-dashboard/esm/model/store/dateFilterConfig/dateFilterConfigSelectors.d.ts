import { DateFilterGranularity, DashboardDateFilterConfigMode, IDateFilterConfig, IDashboardDateFilterConfig } from "@gooddata/sdk-model";
import { IDateFilterOptionsByType } from "@gooddata/sdk-ui-filters";
import { DashboardSelector } from "../types.js";
import { DateFilterValidationResult } from "../../../types.js";
/**
 * Returns date filter config that is specified on the loaded dashboard.
 *
 * The dashboard-level date filter configuration MAY contain overrides and additional configuration to apply
 * on top of the workspace-level date filter config. If the dashboard-level overrides are not specified, then
 * the workspace-level config should be taken as-is.
 *
 * @remarks See {@link selectEffectiveDateFilterConfig} - you can use this selector to obtain the effective
 *  date filter config that contains the final config obtained by merging the workspace-level config and the
 *  dashboard-level overrides.
 *
 * @alpha
 */
export declare const selectDateFilterConfigOverrides: DashboardSelector<IDashboardDateFilterConfig | undefined>;
/**
 * Returns effective date filter config. The effective date filter config is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * This is the configuration that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterConfig: DashboardSelector<IDateFilterConfig>;
/**
 * Returns effective date filter options. This is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * These are the date filter options that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterOptions: DashboardSelector<IDateFilterOptionsByType>;
/**
 * Returns effective date filter options from. This is created by merging the workspace-level
 * date filter config and the dashboard-level date filter config.
 *
 * These are the date filter options that the DateFilter SHOULD use when rendering filtering presets.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterAvailableGranularities: DashboardSelector<DateFilterGranularity[]>;
/**
 * Returns custom title to use for the date filter. Custom title comes from the dashboard-level date filter config overrides. If no overrides
 * were defined OR the effective date filter config is not using them (because applying them means the final date filter config is invalid),
 * then no custom filter should be used.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterTitle: DashboardSelector<string | undefined>;
/**
 * Returns display mode for the effective date filter. This always comes from the dashboard-level date filter config overrides - regardless whether
 * the rest of the overrides are actually used.
 *
 * @alpha
 */
export declare const selectEffectiveDateFilterMode: DashboardSelector<DashboardDateFilterConfigMode>;
/**
 * Returns the date filter config validation result warnings indicating any problems encountered during the date filter config resolution.
 *
 * @alpha
 */
export declare const selectDateFilterConfigValidationWarnings: DashboardSelector<DateFilterValidationResult[]>;
