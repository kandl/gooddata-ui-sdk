import { IDashboardCustomizer, IDashboardInsightCustomizer, IDashboardKpiCustomizer, IDashboardLayoutCustomizer, IDashboardWidgetCustomizer, IFilterBarCustomizer, IFiltersCustomizer } from "../customizer.js";
import { IDashboardExtensionProps } from "../../presentation/index.js";
import { IDashboardPluginContract_V1 } from "../plugin.js";
import { IDashboardWidgetOverlay } from "../../model/index.js";
/**
 * @internal
 */
export declare class DashboardCustomizationBuilder implements IDashboardCustomizer {
    private readonly mutations;
    private readonly logger;
    private readonly insightCustomizer;
    private readonly kpiCustomizer;
    private readonly widgetCustomizer;
    private readonly layoutCustomizer;
    private readonly filterBarCustomizer;
    private readonly filtersCustomizer;
    private widgetOverlays;
    private sealCustomizers;
    setWidgetOverlays: (widgetOverlays?: Record<string, IDashboardWidgetOverlay>) => void;
    insightWidgets: () => IDashboardInsightCustomizer;
    kpiWidgets: () => IDashboardKpiCustomizer;
    customWidgets: () => IDashboardWidgetCustomizer;
    layout: () => IDashboardLayoutCustomizer;
    filterBar: () => IFilterBarCustomizer;
    filters: () => IFiltersCustomizer;
    onBeforePluginRegister: (plugin: IDashboardPluginContract_V1) => void;
    onAfterPluginRegister: () => void;
    onPluginRegisterError: (error: any) => void;
    build: () => IDashboardExtensionProps;
    private getWidgetsOverlayFn;
}
