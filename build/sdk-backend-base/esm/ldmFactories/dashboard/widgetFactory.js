import { Builder, resolveValueOrUpdateCallback } from "../builder.js";
/**
 * @alpha
 */
export class WidgetBaseBuilder extends Builder {
    constructor() {
        super(...arguments);
        this.setWidget = (updateCallback) => {
            this.item = updateCallback(this.item);
            return this;
        };
        this.setWidgetProp = (prop, valueOrUpdateCallback) => {
            this.setWidget((w) => (Object.assign(Object.assign({}, w), { [prop]: resolveValueOrUpdateCallback(valueOrUpdateCallback, w[prop]) })));
            return this;
        };
        this.title = (valueOrUpdateCallback) => this.setWidgetProp("title", valueOrUpdateCallback);
        this.description = (valueOrUpdateCallback) => this.setWidgetProp("description", valueOrUpdateCallback);
        this.ignoreDashboardFilters = (valueOrUpdateCallback) => this.setWidgetProp("ignoreDashboardFilters", valueOrUpdateCallback);
        this.dateDataSet = (valueOrUpdateCallback) => this.setWidgetProp("dateDataSet", valueOrUpdateCallback);
        this.ref = (valueOrUpdateCallback) => this.setWidgetProp("ref", valueOrUpdateCallback);
        this.id = (valueOrUpdateCallback) => this.setWidgetProp("identifier", valueOrUpdateCallback);
        this.uri = (valueOrUpdateCallback) => this.setWidgetProp("uri", valueOrUpdateCallback);
    }
}
//# sourceMappingURL=widgetFactory.js.map