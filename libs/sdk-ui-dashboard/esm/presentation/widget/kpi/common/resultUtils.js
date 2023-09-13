import isNil from "lodash/isNil.js";
import isNumber from "lodash/isNumber.js";
import round from "lodash/round.js";
import { isMeasureFormatInPercent, measureLocalId, } from "@gooddata/sdk-model";
import { createNumberJsFormatter } from "@gooddata/sdk-ui";
function getSeriesResult(series) {
    if (!series) {
        return null;
    }
    const value = series.dataPoints()[0].rawValue;
    if (isNil(value)) {
        return null;
    }
    if (isNumber(value)) {
        return value;
    }
    return Number.parseFloat(value);
}
function getNoDataKpiResult(result, primaryMeasure) {
    var _a, _b;
    if (!result) {
        return;
    }
    return {
        measureDescriptor: result.meta().measureDescriptor(measureLocalId(primaryMeasure)),
        measureFormat: (_b = (_a = result.meta().measureDescriptor(measureLocalId(primaryMeasure))) === null || _a === void 0 ? void 0 : _a.measureHeaderItem) === null || _b === void 0 ? void 0 : _b.format,
        measureResult: undefined,
        measureForComparisonResult: undefined,
    };
}
function getKpiResultInner(result, primaryMeasure, secondaryMeasure, separators) {
    const series = result === null || result === void 0 ? void 0 : result.data({ valueFormatter: createNumberJsFormatter(separators) }).series();
    const primarySeries = series === null || series === void 0 ? void 0 : series.firstForMeasure(primaryMeasure);
    if (secondaryMeasure && (result === null || result === void 0 ? void 0 : result.meta().measureDescriptors().length) !== 2) {
        return undefined;
    }
    const secondarySeries = secondaryMeasure ? series === null || series === void 0 ? void 0 : series.firstForMeasure(secondaryMeasure) : undefined;
    return primarySeries
        ? {
            measureDescriptor: primarySeries.descriptor.measureDescriptor,
            measureFormat: primarySeries.measureFormat(),
            measureResult: getSeriesResult(primarySeries),
            measureForComparisonResult: getSeriesResult(secondarySeries),
        }
        : undefined;
}
export function getKpiResult(result, primaryMeasure, secondaryMeasure, separators) {
    return !(result === null || result === void 0 ? void 0 : result.dataView.totalCount[0])
        ? getNoDataKpiResult(result, primaryMeasure)
        : getKpiResultInner(result, primaryMeasure, secondaryMeasure, separators);
}
export function getKpiAlertResult(result, primaryMeasure, separators) {
    const alertSeries = result === null || result === void 0 ? void 0 : result.data({ valueFormatter: createNumberJsFormatter(separators) }).series();
    return alertSeries
        ? {
            measureFormat: alertSeries.count
                ? alertSeries.firstForMeasure(primaryMeasure).measureFormat()
                : undefined,
            measureResult: alertSeries.count
                ? getSeriesResult(alertSeries.firstForMeasure(primaryMeasure))
                : 0,
        }
        : undefined;
}
export function getAlertThresholdInfo(kpiResult, intl) {
    const isThresholdRepresentingPercent = (kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureFormat)
        ? isMeasureFormatInPercent(kpiResult.measureFormat)
        : false;
    const value = round((kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureResult) || 0, 2); // sure about rounding?
    const thresholdPlaceholder = isThresholdRepresentingPercent
        ? `${intl.formatMessage({ id: "kpi.alertBox.example" })} ${value * 100}`
        : `${intl.formatMessage({ id: "kpi.alertBox.example" })} ${value}`; // TODO fix floating point multiply
    return {
        isThresholdRepresentingPercent,
        thresholdPlaceholder,
    };
}
//# sourceMappingURL=resultUtils.js.map