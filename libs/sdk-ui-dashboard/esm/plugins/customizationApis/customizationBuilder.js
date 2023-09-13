// (C) 2021-2023 GoodData Corporation
import { isInsightWidget, isInsightWidgetDefinition, isKpiWidget, isKpiWidgetDefinition, objRefToString, isObjRef, } from "@gooddata/sdk-model";
import { walkLayout } from "@gooddata/sdk-backend-spi";
import { DefaultInsightCustomizer } from "./insightCustomizer.js";
import { DashboardCustomizationLogger } from "./customizationLogging.js";
import { DefaultKpiCustomizer } from "./kpiCustomizer.js";
import { DefaultWidgetCustomizer } from "./widgetCustomizer.js";
import { DefaultLayoutCustomizer } from "./layoutCustomizer.js";
import { DefaultFilterBarCustomizer } from "./filterBarCustomizer.js";
import { DefaultFiltersCustomizer } from "./filtersCustomizer.js";
import { createCustomizerMutationsContext } from "./types.js";
/**
 * @internal
 */
export class DashboardCustomizationBuilder {
    constructor() {
        this.mutations = createCustomizerMutationsContext();
        this.logger = new DashboardCustomizationLogger();
        this.insightCustomizer = new DefaultInsightCustomizer(this.logger, this.mutations);
        this.kpiCustomizer = new DefaultKpiCustomizer(this.logger, this.mutations);
        this.widgetCustomizer = new DefaultWidgetCustomizer(this.logger);
        this.layoutCustomizer = new DefaultLayoutCustomizer(this.logger, this.mutations);
        this.filterBarCustomizer = new DefaultFilterBarCustomizer(this.logger);
        this.filtersCustomizer = new DefaultFiltersCustomizer(this.logger);
        this.widgetOverlays = {};
        this.sealCustomizers = () => {
            this.insightCustomizer.sealCustomizer();
            this.kpiCustomizer.sealCustomizer();
            this.widgetCustomizer.sealCustomizer();
            this.filtersCustomizer.sealCustomizer();
            this.layoutCustomizer.sealCustomizer();
        };
        this.setWidgetOverlays = (widgetOverlays) => {
            this.widgetOverlays = widgetOverlays || {};
        };
        this.insightWidgets = () => {
            return this.insightCustomizer;
        };
        this.kpiWidgets = () => {
            return this.kpiCustomizer;
        };
        this.customWidgets = () => {
            return this.widgetCustomizer;
        };
        this.layout = () => {
            return this.layoutCustomizer;
        };
        this.filterBar = () => {
            return this.filterBarCustomizer;
        };
        this.filters = () => {
            return this.filtersCustomizer;
        };
        this.onBeforePluginRegister = (plugin) => {
            this.logger.setCurrentPlugin(plugin);
            this.logger.log("Starting registration.");
        };
        this.onAfterPluginRegister = () => {
            this.logger.log("Registration finished.");
            this.logger.setCurrentPlugin(undefined);
        };
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        this.onPluginRegisterError = (error) => {
            this.logger.error("Plugin register() method threw and exception. Plugin may be partially registered.", error);
            this.logger.setCurrentPlugin(undefined);
        };
        this.build = () => {
            const filterBarCustomizerResult = this.filterBarCustomizer.getCustomizerResult();
            const props = Object.assign({ InsightComponentProvider: this.insightCustomizer.getInsightProvider(), InsightBodyComponentProvider: this.insightCustomizer.getInsightBodyComponentProvider(), KpiComponentProvider: this.kpiCustomizer.getKpiProvider(), WidgetComponentProvider: this.widgetCustomizer.getWidgetComponentProvider(), DashboardAttributeFilterComponentProvider: this.filtersCustomizer
                    .attribute()
                    .getAttributeFilterProvider(), DashboardDateFilterComponentProvider: this.filtersCustomizer.date().getDateFilterProvider(), customizationFns: {
                    existingDashboardTransformFn: this.layoutCustomizer.getExistingDashboardTransformFn(),
                }, widgetsOverlayFn: this.getWidgetsOverlayFn() }, (filterBarCustomizerResult.FilterBarComponent
                ? { FilterBarComponent: filterBarCustomizerResult.FilterBarComponent }
                : {}));
            this.sealCustomizers();
            return props;
        };
    }
    getWidgetsOverlayFn() {
        return (dashboard) => {
            const overlays = Object.assign({}, this.widgetOverlays);
            const { insight, kpi, layouts } = this.mutations;
            const { layout } = dashboard;
            walkLayout(layout, {
                itemCallback: (item) => {
                    if ((isInsightWidget(item.widget) || isInsightWidgetDefinition(item.widget)) &&
                        isObjRef(item.widget) &&
                        insight.length > 0) {
                        mergeOverlays(overlays, objRefToString(item.widget), true, "modifiedByPlugin");
                    }
                    if ((isKpiWidget(item.widget) || isKpiWidgetDefinition(item.widget)) &&
                        isObjRef(item.widget) &&
                        kpi.length > 0) {
                        mergeOverlays(overlays, objRefToString(item.widget), true, "modifiedByPlugin");
                    }
                },
            });
            Object.keys(layouts).forEach((ref) => {
                if (layouts[ref] === "inserted") {
                    mergeOverlays(overlays, ref, true, "insertedByPlugin");
                }
            });
            return overlays;
        };
    }
}
function mergeOverlays(overlays, ref, showOverlay, modification) {
    const current = overlays[ref];
    const created = {
        showOverlay,
        modification,
    };
    overlays[ref] = Object.assign(Object.assign({}, created), (current ? current : {}));
}
//# sourceMappingURL=customizationBuilder.js.map