// (C) 2007-2022 GoodData Corporation
import React, { Component } from "react";
import { injectIntl } from "react-intl";
import DefaultMeasure from "react-measure";
import { isGoodDataSdkError, ErrorCodes } from "@gooddata/sdk-ui";
import { isAllTimeDateFilter, isDateFilter, isKpiWithComparison, } from "@gooddata/sdk-model";
import KpiValue from "./KpiValue.js";
import KpiPop from "./KpiPop.js";
import { isDateFilterIrrelevant } from "../filterUtils.js";
import { getKpiPopLabel } from "./utils/translations.js";
import cx from "classnames";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(DefaultMeasure);
class KpiContent extends Component {
    renderPeriodOverPeriod(clientWidth, clientHeight) {
        var _a, _b;
        if (this.props.kpi.kpi.comparisonType === "none") {
            return false;
        }
        const { kpiResult, enableCompactSize } = this.props;
        const isDateFilterNotRelevant = isDateFilterIrrelevant(this.props.kpi);
        const isDateFilterAllTime = this.props.filters.every((f) => !isDateFilter(f) || isAllTimeDateFilter(f));
        const dateFilter = this.props.filters.find(isDateFilter); // for now we use the first date filter available for this
        const popLabel = getKpiPopLabel(dateFilter, this.props.kpi.kpi.comparisonType, this.props.intl);
        const popDisabled = isDateFilterAllTime || isDateFilterNotRelevant;
        const isSdkError = isGoodDataSdkError(this.props.error);
        const isNoData = isSdkError && this.props.error.message === ErrorCodes.NO_DATA;
        const comparisonMeaning = isKpiWithComparison(this.props.kpi.kpi)
            ? this.props.kpi.kpi.comparisonDirection
            : undefined;
        return (React.createElement(KpiPop, { disabled: popDisabled, isLoading: this.props.isLoading, currentPeriodValue: (_a = kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureResult) !== null && _a !== void 0 ? _a : null, previousPeriodValue: (_b = kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureForComparisonResult) !== null && _b !== void 0 ? _b : null, previousPeriodName: popLabel, format: kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureFormat, error: !isNoData ? this.props.error : undefined, separators: this.props.separators, meaning: comparisonMeaning, enableCompactSize: enableCompactSize, clientWidth: clientWidth, clientHeight: clientHeight }));
    }
    renderValue(clientHeight) {
        var _a;
        const { kpiResult, isKpiValueClickDisabled, onKpiValueClick, enableCompactSize, kpi } = this.props;
        const isSdkError = isGoodDataSdkError(this.props.error);
        const isNoData = isSdkError && this.props.error.message === ErrorCodes.NO_DATA;
        const hasComparison = kpi.kpi.comparisonType !== "none";
        const kpiValue = (React.createElement(KpiValue, { isLoading: this.props.isLoading, error: !isNoData ? this.props.error : undefined, errorHelp: this.props.errorHelp, value: (_a = kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureResult) !== null && _a !== void 0 ? _a : null, format: kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureFormat, separators: this.props.separators, disableKpiDrillUnderline: this.props.isKpiUnderlineHiddenWhenClickable, enableCompactSize: enableCompactSize, clientHeight: clientHeight, hasComparison: hasComparison }));
        if (onKpiValueClick) {
            if (isKpiValueClickDisabled) {
                return React.createElement("span", { className: "kpi-link s-kpi-link-nonclickable" }, kpiValue);
            }
            else {
                return (React.createElement("a", { className: "kpi-link s-kpi-link-clickable", onClick: this.props.onKpiValueClick }, kpiValue));
            }
        }
        return kpiValue;
    }
    render() {
        return (React.createElement("div", { className: "gd-kpi-widget-content" },
            React.createElement("div", { className: cx("visualization-content", { "in-edit-mode": this.props.isInEditMode }) },
                React.createElement(Measure, { client: true }, ({ measureRef, contentRect }) => {
                    var _a, _b, _c;
                    return (React.createElement("div", { className: "gd-visualization-content", ref: measureRef },
                        React.createElement("div", { className: "headline" },
                            this.renderValue((_a = contentRect.client) === null || _a === void 0 ? void 0 : _a.height),
                            this.renderPeriodOverPeriod((_b = contentRect.client) === null || _b === void 0 ? void 0 : _b.width, (_c = contentRect.client) === null || _c === void 0 ? void 0 : _c.height))));
                }))));
    }
}
KpiContent.defaultProps = {
    isKpiValueClickDisabled: false,
    filters: [],
    isKpiUnderlineHiddenWhenClickable: false,
};
export default injectIntl(KpiContent);
//# sourceMappingURL=KpiContent.js.map