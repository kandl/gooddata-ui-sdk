import { ObjRef, IDashboardFilterReference, IWidget } from "@gooddata/sdk-model";
import { Builder, IBuilder, ValueOrUpdateCallback } from "../builder.js";
/**
 * Common widget props builder
 *
 * @alpha
 */
export interface IWidgetBaseBuilder<T extends IWidget> extends IBuilder<T> {
    title(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
    description(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
    ignoreDashboardFilters(valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardFilterReference[]>): this;
    dateDataSet(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef | undefined>): this;
    ref(valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>): this;
    id(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
    uri(valueOrUpdateCallback: ValueOrUpdateCallback<string>): this;
}
/**
 * @alpha
 */
export declare class WidgetBaseBuilder<T extends IWidget> extends Builder<T> implements IWidgetBaseBuilder<T> {
    protected setWidget: (updateCallback: (widget: Partial<T>) => Partial<T>) => this;
    protected setWidgetProp: <K extends keyof T>(prop: K, valueOrUpdateCallback: ValueOrUpdateCallback<T[K]>) => this;
    title: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
    description: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
    ignoreDashboardFilters: (valueOrUpdateCallback: ValueOrUpdateCallback<IDashboardFilterReference[]>) => this;
    dateDataSet: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef | undefined>) => this;
    ref: (valueOrUpdateCallback: ValueOrUpdateCallback<ObjRef>) => this;
    id: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
    uri: (valueOrUpdateCallback: ValueOrUpdateCallback<string>) => this;
}
//# sourceMappingURL=widgetFactory.d.ts.map