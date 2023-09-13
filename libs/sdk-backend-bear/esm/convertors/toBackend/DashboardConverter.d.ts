import { IDashboardPluginLink as IBearDashboardPluginLink, IWrappedAnalyticalDashboard, IFluidLayoutSize, IFluidLayoutColSize, IWrappedDashboardPlugin, IFilterContextDateFilter, IFilterContextAttributeFilter, IWrappedTempFilterContext, IWrappedFilterContext, IKpiProjectDashboardLink, IWrappedKPI, IDrillDefinition as IBearDrillDefinition, IWrappedVisualizationWidget, IWrappedKpiAlert, ScheduledMailAttachment as BearScheduledMailAttachment, IWrappedScheduledMail } from "@gooddata/api-model-bear";
import { FilterContextItem, IFilterContext, IFilterContextDefinition, ITempFilterContext, IWidgetAlert, IWidgetAlertDefinition, IDrillToAttributeUrl, IDrillToCustomUrl, IDrillToDashboard, IDrillToInsight, IDrillToLegacyDashboard, IWidget, IWidgetDefinition, IScheduledMail, IScheduledMailDefinition, ScheduledMailAttachment, IDashboardLayoutSize, IDashboardLayoutSizeByScreenSize, IDashboard, IDashboardDefinition, IDashboardPlugin, IDashboardPluginDefinition, IDashboardPluginLink } from "@gooddata/sdk-model";
/**
 * @internal
 */
export declare const convertLayoutSize: (size: IDashboardLayoutSize) => IFluidLayoutSize;
/**
 * @internal
 */
export declare const convertLayoutItemSize: (column: IDashboardLayoutSizeByScreenSize) => IFluidLayoutColSize;
export declare const convertFilterContextItem: (filterContextItem: FilterContextItem) => IFilterContextDateFilter | IFilterContextAttributeFilter;
export declare function convertFilterContext(filterContext: ITempFilterContext): IWrappedTempFilterContext;
export declare function convertFilterContext(filterContext: IFilterContext | IFilterContextDefinition): IWrappedFilterContext;
export declare function convertDrill(drill: IDrillToLegacyDashboard): IKpiProjectDashboardLink;
export declare function convertDrill(drill: IDrillToInsight | IDrillToDashboard | IDrillToCustomUrl | IDrillToAttributeUrl): IBearDrillDefinition;
/**
 * @internal
 */
export declare const convertWidget: (widget: IWidget | IWidgetDefinition) => IWrappedVisualizationWidget | IWrappedKPI;
export declare const convertPluginLink: (pluginLink: IDashboardPluginLink) => IBearDashboardPluginLink;
export declare const convertDashboard: (dashboard: IDashboard | IDashboardDefinition) => IWrappedAnalyticalDashboard;
export declare const convertWidgetAlert: (alert: IWidgetAlert | IWidgetAlertDefinition) => IWrappedKpiAlert;
export declare const convertScheduledMailAttachment: (scheduledMailAttachment: ScheduledMailAttachment) => BearScheduledMailAttachment;
/**
 * @internal
 */
export declare const convertScheduledMail: (scheduledMail: IScheduledMail | IScheduledMailDefinition) => IWrappedScheduledMail;
export declare const convertDashboardPlugin: (plugin: IDashboardPlugin | IDashboardPluginDefinition) => IWrappedDashboardPlugin;
//# sourceMappingURL=DashboardConverter.d.ts.map