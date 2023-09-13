// (C) 2019-2023 GoodData Corporation
import React from "react";
import { RawExecute } from "../execution/index.js";
import { FormattedNumber } from "./FormattedNumber.js";
import { KpiError } from "./KpiError.js";
import { injectIntl } from "react-intl";
import isNil from "lodash/isNil.js";
import isArray from "lodash/isArray.js";
import { IntlWrapper, LoadingComponent, withContexts, } from "../base/index.js";
import { invariant } from "ts-invariant";
//
// Internals
//
const KpiLoading = () => React.createElement(LoadingComponent, { inline: true });
const CoreKpi = (props) => {
    const { backend, workspace, measure, filters, separators, LoadingComponent = KpiLoading, ErrorComponent = KpiError, onError, onLoadingChanged, onLoadingFinish, onLoadingStart, intl, } = props;
    invariant(backend && workspace, "backend and workspace must be either specified explicitly or be provided by context");
    const execution = backend
        .withTelemetry("KPI", props)
        .workspace(workspace)
        .execution()
        .forItems([measure], filters);
    return (React.createElement(RawExecute, { execution: execution, onLoadingStart: onLoadingStart, onLoadingChanged: onLoadingChanged, onLoadingFinish: onLoadingFinish, onError: onError }, ({ error, isLoading, result }) => {
        if (error) {
            return (React.createElement(ErrorComponent, { code: error.message, message: intl.formatMessage({ id: "visualization.ErrorMessageKpi" }) }));
        }
        if (isLoading || !result) {
            return React.createElement(LoadingComponent, null);
        }
        const measureData = getMeasureData(result);
        const measureFormat = measure.measure.format || getMeasureFormat(result);
        return (React.createElement(FormattedNumber, { className: "gdc-kpi", value: measureData, format: measureFormat, separators: separators }));
    }));
};
const getMeasureData = (result) => {
    const data = result.rawData().data();
    const dataValue = data === null || data === void 0 ? void 0 : data[0];
    const measure = isArray(dataValue) ? dataValue === null || dataValue === void 0 ? void 0 : dataValue[0] : dataValue;
    if (isNil(measure)) {
        return "";
    }
    return parseFloat(measure);
};
const getMeasureFormat = (result) => {
    var _a, _b;
    const headerItems = result.meta().measureDescriptors();
    return (_b = (_a = headerItems === null || headerItems === void 0 ? void 0 : headerItems[0]) === null || _a === void 0 ? void 0 : _a.measureHeaderItem) === null || _b === void 0 ? void 0 : _b.format;
};
const IntlKpi = injectIntl(CoreKpi);
const RenderKpi = (props) => {
    const { locale } = props;
    return (React.createElement(IntlWrapper, { locale: locale },
        React.createElement(IntlKpi, Object.assign({}, props))));
};
/**
 * Kpi is a simple component which calculates and renders a single formatted measure value.
 *
 * @remarks
 * The the value is rendered inside a <span> element.
 *
 * Kpi component is useful for instance for embedding data values into text paragraphs.
 *
 * See also the {@link @gooddata/sdk-ui-charts#Headline} component for a more 'chart-like' variant.
 *
 * @public
 */
export const Kpi = withContexts(RenderKpi);
//# sourceMappingURL=Kpi.js.map