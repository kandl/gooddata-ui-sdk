import { ObjRef, VisualizationProperties, InsightDrillDefinition, IInsightWidget, IInsightWidgetDefinition } from "@gooddata/sdk-model";
import { IWidgetBaseBuilder, WidgetBaseBuilder } from "./widgetFactory.js";
import { ValueOrUpdateCallback } from "../builder.js";
/**
 * Insight widget builder
 *
 * @alpha
 */
export interface IInsightWidgetBuilder extends IWidgetBaseBuilder<IInsightWidget> {
    drills(valueOrUpdateCallback: ValueOrUpdateCallback<InsightDrillDefinition[]>): this;
    insight(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>): this;
    properties(valueOrUpdateCallback: ValueOrUpdateCallback<VisualizationProperties | undefined>): this;
}
/**
 * @alpha
 */
export declare class InsightWidgetBuilder extends WidgetBaseBuilder<IInsightWidget> implements IInsightWidgetBuilder {
    protected item: IInsightWidget;
    protected validator?: ((item: Partial<IInsightWidget>) => void) | undefined;
    constructor(item: IInsightWidget, validator?: ((item: Partial<IInsightWidget>) => void) | undefined);
    static for(insightWidget: IInsightWidgetDefinition): InsightWidgetBuilder;
    static forNew(insight: ObjRef): InsightWidgetBuilder;
    drills: (valueOrUpdateCallback: ValueOrUpdateCallback<InsightDrillDefinition[]>) => this;
    insight: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>) => this;
    properties: (valueOrUpdateCallback: ValueOrUpdateCallback<VisualizationProperties | undefined>) => this;
}
/**
 * @alpha
 */
export declare const newInsightWidget: (insight: ObjRef, modifications: (builder: InsightWidgetBuilder) => InsightWidgetBuilder) => IInsightWidget;
//# sourceMappingURL=insightWidgetFactory.d.ts.map