// (C) 2021-2022 GoodData Corporation
import { isCustomWidget } from "../../model/index.js";
class WidgetCustomizerState {
    constructor(logger) {
        this.logger = logger;
        this.customWidgetMap = new Map();
        this.addDefinition = (definition) => {
            if (this.customWidgetMap.has(definition.widgetType)) {
                this.logger.warn(`Redefining custom widget type ${definition.widgetType}. Previous definition will be discarded.`);
            }
            this.customWidgetMap.set(definition.widgetType, definition);
        };
        this.getCustomWidgetMap = () => {
            return this.customWidgetMap;
        };
    }
}
class SealedCustomizerState {
    constructor(state, logger) {
        this.state = state;
        this.logger = logger;
        this.addDefinition = (_definition) => {
            this.logger.warn(`Attempting to add custom widgets outside of plugin registration. Ignoring.`);
        };
        this.getCustomWidgetMap = () => {
            return this.state.getCustomWidgetMap();
        };
    }
}
export class DefaultWidgetCustomizer {
    constructor(logger) {
        this.logger = logger;
        this.state = new WidgetCustomizerState(this.logger);
        this.addCustomWidget = (widgetType, Component) => {
            this.state.addDefinition({
                widgetType,
                DefaultComponent: Component,
            });
            return this;
        };
        this.sealCustomizer = () => {
            this.state = new SealedCustomizerState(this.state, this.logger);
            return this;
        };
        this.getWidgetComponentProvider = () => {
            const customWidgetMap = this.state.getCustomWidgetMap();
            return (widget) => {
                if (!isCustomWidget(widget)) {
                    return undefined;
                }
                const definition = customWidgetMap.get(widget.customType);
                if (!definition) {
                    return undefined;
                }
                return definition.DefaultComponent;
            };
        };
    }
}
//# sourceMappingURL=widgetCustomizer.js.map