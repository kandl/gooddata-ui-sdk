// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { isInsightWidgetDefinition, isInsightWidget, } from "@gooddata/sdk-model";
import { WidgetBaseBuilder } from "./widgetFactory.js";
/**
 * @alpha
 */
export class InsightWidgetBuilder extends WidgetBaseBuilder {
    constructor(item, validator) {
        super(item, validator);
        this.item = item;
        this.validator = validator;
        this.drills = (valueOrUpdateCallback) => this.setWidgetProp("drills", valueOrUpdateCallback);
        this.insight = (valueOrUpdateCallback) => this.setWidgetProp("insight", valueOrUpdateCallback);
        this.properties = (valueOrUpdateCallback) => this.setWidgetProp("properties", valueOrUpdateCallback);
    }
    static for(insightWidget) {
        invariant(isInsightWidgetDefinition(insightWidget) || isInsightWidget(insightWidget), "Provided data must be IInsightWidget or IInsightWidgetDefinition!");
        return new InsightWidgetBuilder(insightWidget);
    }
    static forNew(insight) {
        const emptyInsightWidget = {
            description: "",
            drills: [],
            ignoreDashboardFilters: [],
            title: "",
            type: "insight",
            insight,
        };
        return InsightWidgetBuilder.for(emptyInsightWidget);
    }
}
/**
 * @alpha
 */
export const newInsightWidget = (insight, modifications) => {
    return InsightWidgetBuilder.forNew(insight).modify(modifications).build();
};
//# sourceMappingURL=insightWidgetFactory.js.map