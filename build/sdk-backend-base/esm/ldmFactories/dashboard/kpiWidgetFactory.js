// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { isKpiWidgetDefinition, isKpiWidget, } from "@gooddata/sdk-model";
import { WidgetBaseBuilder } from "./widgetFactory.js";
import { resolveValueOrUpdateCallback } from "../builder.js";
/**
 * @alpha
 */
export class KpiWidgetBuilder extends WidgetBaseBuilder {
    constructor(item, validator) {
        super(item, validator);
        this.item = item;
        this.validator = validator;
        // TODO: un-nest legacy kpi
        this.setKpiWidgetProp = (prop, valueOrUpdateCallback) => {
            this.setWidget((w) => (Object.assign(Object.assign({}, w), { kpi: Object.assign(Object.assign({}, w.kpi), { [prop]: resolveValueOrUpdateCallback(valueOrUpdateCallback, w.kpi[prop]) }) })));
            return this;
        };
        this.drills = (valueOrUpdateCallback) => this.setWidgetProp("drills", valueOrUpdateCallback);
        this.measure = (valueOrUpdateCallback) => this.setKpiWidgetProp("metric", valueOrUpdateCallback);
        this.comparisonType = (valueOrUpdateCallback) => this.setKpiWidgetProp("comparisonType", valueOrUpdateCallback);
        this.comparisonDirection = (valueOrUpdateCallback) => this.setKpiWidgetProp("comparisonDirection", valueOrUpdateCallback);
    }
    static for(kpiWidget) {
        invariant(isKpiWidgetDefinition(kpiWidget) || isKpiWidget(kpiWidget), "Provided data must be IKpiWidget or IKpiWidgetDefinition!");
        return new KpiWidgetBuilder(kpiWidget);
    }
    static forNew(measure) {
        const emptyKpiWidget = {
            description: "",
            drills: [],
            ignoreDashboardFilters: [],
            title: "",
            type: "kpi",
            kpi: {
                metric: measure,
                comparisonType: "none",
            },
        };
        return KpiWidgetBuilder.for(emptyKpiWidget);
    }
}
/**
 * @alpha
 */
export const newKpiWidget = (measure, modifications) => {
    return KpiWidgetBuilder.forNew(measure).modify(modifications).build();
};
//# sourceMappingURL=kpiWidgetFactory.js.map