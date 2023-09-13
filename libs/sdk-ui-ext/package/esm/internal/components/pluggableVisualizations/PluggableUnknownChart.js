// (C) 2023 GoodData Corporation
import React from "react";
import { injectIntl } from "react-intl";
import { AbstractPluggableVisualization } from "./AbstractPluggableVisualization";
import { ErrorComponent, ErrorCodes, newErrorMapping, IntlWrapper } from "@gooddata/sdk-ui";
export class LocalizedUnknownVisualizationClass extends React.Component {
    constructor(props) {
        super(props);
        this.errorDetails = newErrorMapping(props.intl)[ErrorCodes.VISUALIZATION_CLASS_UNKNOWN];
    }
    render() {
        const { message, description } = this.errorDetails;
        return React.createElement(ErrorComponent, { message: message, description: description });
    }
}
export const IntlLocalizedUnknownVisualizationClass = injectIntl(LocalizedUnknownVisualizationClass);
export class PluggableUnknownChart extends AbstractPluggableVisualization {
    constructor(props) {
        super(props);
        this.renderFun = props.renderFun;
    }
    getExtendedReferencePoint(referencePoint) {
        return Promise.resolve(Object.assign(Object.assign({}, referencePoint), { uiConfig: null }));
    }
    getExecution(_options, _insight, _executionFactory) {
        const result = null;
        return result;
    }
    renderConfigurationPanel(_insight) { }
    renderVisualization(options, _insight, _executionFactory) {
        var _a;
        this.renderFun(React.createElement(IntlWrapper, { locale: options.locale },
            React.createElement(IntlLocalizedUnknownVisualizationClass, null)), this.getElement());
        (_a = this.onLoadingChanged) === null || _a === void 0 ? void 0 : _a.call(this, { isLoading: false });
    }
    unmount() { }
}
//# sourceMappingURL=PluggableUnknownChart.js.map