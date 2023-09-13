import { IColorPalette, IDateFilterConfig, ISeparators, ISettings, PlatformEdition, WeekStart } from "@gooddata/sdk-model";
import { DashboardSelector } from "../types.js";
import { ObjectAvailabilityConfig, ResolvedDashboardConfig } from "../../types/commonTypes.js";
import { ILocale } from "@gooddata/sdk-ui";
/**
 * Returns dashboard's config.
 *
 * @remarks
 * It is expected that the selector is called only after the config state
 * is correctly initialized. Invocations before initialization lead to invariant errors.
 *
 * @public
 */
export declare const selectConfig: DashboardSelector<ResolvedDashboardConfig>;
/**
 * Returns workspace-level configuration for the of the date filter options and presets.
 *
 * @remarks
 * Note: this configuration SHOULD be further augmented by the dashboard-level overrides to obtain
 * the effective date filter configuration.
 *
 * @public
 */
export declare const selectDateFilterConfig: DashboardSelector<IDateFilterConfig>;
/**
 * Returns settings that are in effect for the current dashboard.
 *
 * @public
 */
export declare const selectSettings: DashboardSelector<ISettings>;
/**
 * Returns locale to use for internationalization of the dashboard.
 *
 * @public
 */
export declare const selectLocale: DashboardSelector<ILocale>;
/**
 * Returns number separators to use when rendering numeric values on charts or KPIs.
 *
 * @public
 */
export declare const selectSeparators: DashboardSelector<ISeparators>;
/**
 * Returns the color palette for dashboard charts.
 *
 * @public
 */
export declare const selectColorPalette: DashboardSelector<IColorPalette>;
/**
 * Returns the object availability configuration for this dashboard.
 *
 * @remarks
 * Only objects that match the availability criteria can appear in selections where user has pick
 * an object to use for some purpose (for instance metric for KPI or date dataset to filter by).
 *
 * @public
 */
export declare const selectObjectAvailabilityConfig: DashboardSelector<ObjectAvailabilityConfig>;
/**
 * Returns Mapbox token.
 *
 * @internal
 */
export declare const selectMapboxToken: DashboardSelector<string | undefined>;
/**
 * Returns week start day
 *
 * @internal
 */
export declare const selectWeekStart: DashboardSelector<WeekStart>;
/**
 * Returns whether the Dashboard is executed in read-only mode.
 *
 * @remarks
 * Read-only mode disables any interactions that can alter the backend data.
 *
 * @public
 */
export declare const selectIsReadOnly: DashboardSelector<boolean>;
/**
 * Returns whether the Dashboard is executed in embedded context.
 *
 * @remarks
 * In embedded mode, some interactions may be disabled.
 *
 * @public
 */
export declare const selectIsEmbedded: DashboardSelector<boolean>;
/**
 * Returns whether the Dashboard is rendered in the export mode.
 * In export mode, some components can be hidden, or rendered differently.
 *
 * @public
 */
export declare const selectIsExport: DashboardSelector<boolean>;
/**
 * Returns whether the Dashboard is white labeled.
 *
 * @internal
 */
export declare const selectIsWhiteLabeled: DashboardSelector<boolean>;
/**
 * Returns whether the default drills configured on the widgets or implicit drills (eg. drill down) are disabled.
 * This option does not affect drilling enabled by drillableItems.
 *
 * @public
 */
export declare const selectDisableDefaultDrills: DashboardSelector<boolean>;
/**
 * Returns whether filter values in drill events should be resolved.
 *
 * @public
 */
export declare const selectEnableFilterValuesResolutionInDrillEvents: DashboardSelector<boolean>;
/**
 * Returns whether the save as new button is hidden.
 *
 * @internal
 */
export declare const selectIsSaveAsNewButtonHidden: DashboardSelector<boolean>;
/**
 * Returns date format.
 *
 * @public
 */
export declare const selectDateFormat: DashboardSelector<string | undefined>;
/**
 * Returns whether the current user can schedule emails.
 *
 * @public
 */
export declare const selectEnableKPIDashboardSchedule: DashboardSelector<boolean>;
/**
 * Returns whether the current user can share scheduled email to other recipients.
 *
 * @public
 */
export declare const selectEnableKPIDashboardScheduleRecipients: DashboardSelector<boolean>;
/**
 * Returns current platform edition.
 *
 * @public
 */
export declare const selectPlatformEdition: DashboardSelector<PlatformEdition>;
/**
 * Returns whether company logo should be visible in embedded dashboard.
 *
 * @public
 */
export declare const selectEnableCompanyLogoInEmbeddedUI: DashboardSelector<boolean>;
/**
 * Returns whether the export to pdf is enabled.
 *
 * @public
 */
export declare const selectEnableKPIDashboardExportPDF: DashboardSelector<string | number | boolean | object>;
/**
 * Returns whether the drill to dashboard is enabled.
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillToDashboard: DashboardSelector<boolean>;
/**
 * Returns whether the save as new dashboard functionality is enabled.
 *
 * @public
 */
export declare const selectEnableKPIDashboardSaveAsNew: DashboardSelector<boolean>;
/**
 * Returns whether implicit drill to attributes url enabled
 *
 * @public
 */
export declare const selectEnableClickableAttributeURL: DashboardSelector<boolean>;
/**
 * Returns whether drill to url is enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillToURL: DashboardSelector<boolean>;
/**
 * Returns whether drill to insight is enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillToInsight: DashboardSelector<boolean>;
/**
 * Returns whether implicit drill to attributes url enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardImplicitDrillDown: DashboardSelector<boolean>;
/**
 * Returns whether drill fromAttribute is enabled
 *
 * @public
 */
export declare const selectEnableKPIDashboardDrillFromAttribute: DashboardSelector<boolean>;
/**
 * Returns whether Kpi drills in embedded mode are disabled.
 *
 * @public
 */
export declare const selectHideKpiDrillInEmbedded: DashboardSelector<boolean>;
/**
 * Returns whether insight export scheduling is enabled.
 *
 * @public
 */
export declare const selectEnableInsightExportScheduling: DashboardSelector<boolean>;
/**
 * Returns whether analytical dashboard permissions are enabled
 *
 * @internal
 */
export declare const selectEnableAnalyticalDashboardPermissions: DashboardSelector<boolean>;
/**
 * Returns whether custom widget heights are enabled
 *
 * @internal
 */
export declare const selectEnableWidgetCustomHeight: DashboardSelector<boolean>;
/**
 * Returns whether we should call workspaces workspaces (true) or projects (false).
 *
 * @internal
 */
export declare const selectEnableRenamingProjectToWorkspace: DashboardSelector<boolean>;
/**
 * Returns whether we should call measures metrics (true) or measures (false).
 *
 * @internal
 */
export declare const selectEnableRenamingMeasureToMetric: DashboardSelector<boolean>;
/**
 * Returns whether we should hide the pixel perfect experience references.
 *
 * @internal
 */
export declare const selectShouldHidePixelPerfectExperience: DashboardSelector<string | number | boolean | object>;
/**
 * Returns whether we should disable the underline in KPIs when they are drillable.
 *
 * @internal
 */
export declare const selectDisableKpiDashboardHeadlineUnderline: DashboardSelector<boolean>;
/**
 * Returns whether unfinished features are allowed.
 *
 * @internal
 */
export declare const selectAllowUnfinishedFeatures: DashboardSelector<boolean>;
/**
 * Returns whether creating new insight from dashboard is enabled.
 *
 * @internal
 */
export declare const selectAllowCreateInsightRequest: DashboardSelector<boolean>;
/**
 * Returns whether analytical designer is enabled.
 *
 * @internal
 */
export declare const selectIsAnalyticalDesignerEnabled: DashboardSelector<boolean>;
/**
 * Returns whether delete button in dashboard attribute filters is visible.
 *
 * @internal
 */
export declare const selectIsDeleteFilterButtonEnabled: DashboardSelector<boolean>;
/**
 * Returns whether dependent filters are enabled.
 *
 * @internal
 */
export declare const selectIsKPIDashboardDependentFiltersEnabled: DashboardSelector<boolean>;
/**
 * Returns whether choice of alternate display forms is enabled.
 *
 * @internal
 */
export declare const selectIsAlternativeDisplayFormSelectionEnabled: DashboardSelector<boolean>;
/**
 * Returns whether share button is hidden.
 *
 * @internal
 */
export declare const selectIsShareButtonHidden: DashboardSelector<boolean>;
/**
 * Returns whether attribute hierarchies are enabled.
 *
 * @internal
 */
export declare const selectEnableAttributeHierarchies: DashboardSelector<boolean>;
/**
 * Returns whether drill down is enabled.
 *
 * On Bear, drill down is driven by isKPIDashboardImplicitDrillDown.
 * On Tiger, it is driven by attribute hierarchies, thus isAttribueHierarchiesEnabled.
 *
 * @internal
 */
export declare const selectIsDrillDownEnabled: DashboardSelector<boolean>;
