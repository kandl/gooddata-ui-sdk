import { ObjRef, KpiDrillDefinition, IKpiWidget, IKpiWidgetDefinition, IKpi, IKpiComparisonDirection, IKpiComparisonTypeComparison } from "@gooddata/sdk-model";
import { IWidgetBaseBuilder, WidgetBaseBuilder } from "./widgetFactory.js";
import { ValueOrUpdateCallback } from "../builder.js";
/**
 * Kpi widget builder
 *
 * @alpha
 */
export interface IKpiWidgetBuilder extends IWidgetBaseBuilder<IKpiWidget> {
    drills(valueOrUpdateCallback: ValueOrUpdateCallback<KpiDrillDefinition[]>): this;
    measure(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>): this;
    comparisonType(valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonTypeComparison>): this;
    comparisonDirection(valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonDirection | undefined>): this;
}
/**
 * @alpha
 */
export declare class KpiWidgetBuilder extends WidgetBaseBuilder<IKpiWidget> implements IKpiWidgetBuilder {
    protected item: IKpiWidget;
    protected validator?: ((item: Partial<IKpiWidget>) => void) | undefined;
    constructor(item: IKpiWidget, validator?: ((item: Partial<IKpiWidget>) => void) | undefined);
    static for(kpiWidget: IKpiWidgetDefinition): KpiWidgetBuilder;
    static forNew(measure: ObjRef): KpiWidgetBuilder;
    protected setKpiWidgetProp: <K extends "comparisonType" | "metric" | "comparisonDirection">(prop: K, valueOrUpdateCallback: ValueOrUpdateCallback<IKpi[K]>) => this;
    drills: (valueOrUpdateCallback: ValueOrUpdateCallback<KpiDrillDefinition[]>) => this;
    measure: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>) => this;
    comparisonType: (valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonTypeComparison>) => this;
    comparisonDirection: (valueOrUpdateCallback: ValueOrUpdateCallback<IKpiComparisonDirection | undefined>) => this;
}
/**
 * @alpha
 */
export declare const newKpiWidget: (measure: ObjRef, modifications: (builder: KpiWidgetBuilder) => KpiWidgetBuilder) => IKpiWidget;
//# sourceMappingURL=kpiWidgetFactory.d.ts.map