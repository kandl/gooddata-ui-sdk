import { isColorDescriptor, isRgbColor, } from "@gooddata/sdk-model";
import { getColorByGuid, getRgbStringFromRGB } from "@gooddata/sdk-ui-vis-commons";
import findLastIndex from "lodash/findLastIndex.js";
import { unwrap } from "../_util/common.js";
import { getColorOrLegendIndex } from "./waterfallChartsSeries.js";
function isTotalColumnEnabled(chartConfig) {
    var _a, _b;
    return !hasTotalMeasure(chartConfig) && ((_b = (_a = chartConfig.total) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : true);
}
function hasTotalMeasure(chartConfig) {
    var _a, _b;
    return ((_b = (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.total) === null || _a === void 0 ? void 0 : _a.measures) === null || _b === void 0 ? void 0 : _b.length) > 0;
}
function isMeasureIdATotal(totalConfig, measureId) {
    const totalMeasures = (totalConfig === null || totalConfig === void 0 ? void 0 : totalConfig.measures) || [];
    if (totalMeasures.length === 0 || !measureId) {
        return false;
    }
    return totalMeasures.includes(measureId);
}
function getTotalValue(pointDataSet) {
    var _a;
    const lastTotalIndex = findLastIndex(pointDataSet, (item) => item.visible === false);
    let total = 0;
    if (lastTotalIndex + 1 === pointDataSet.length) {
        total = pointDataSet[lastTotalIndex].y;
    }
    else {
        const startFromIndex = lastTotalIndex + 1;
        for (let i = startFromIndex; i < pointDataSet.length; i += 1) {
            total += ((_a = pointDataSet[i]) === null || _a === void 0 ? void 0 : _a.y) || 0;
        }
    }
    return total * -1;
}
export function getTotalColumnColor(colorAssignment, colorPalette) {
    return isRgbColor(colorAssignment.color)
        ? getRgbStringFromRGB(colorAssignment.color.value)
        : getRgbStringFromRGB(getColorByGuid(colorPalette, colorAssignment.color.value, 0));
}
function buildTotalMetricsSeries(measureGroup, series, chartConfig, colorAssignment, colorPalette) {
    const data = series[0].data.reduce((series, seriesDataItem, pointIndex) => {
        var _a;
        const isTotalMeasure = isMeasureIdATotal(chartConfig.total, (_a = unwrap(measureGroup.items[pointIndex])) === null || _a === void 0 ? void 0 : _a.localIdentifier);
        if (isTotalMeasure) {
            const legendIndex = getColorOrLegendIndex(seriesDataItem.y, isTotalMeasure);
            const color = getTotalColumnColor(colorAssignment, colorPalette);
            const totalSeriesItem = Object.assign(Object.assign({}, seriesDataItem), { color, borderColor: color, legendIndex: legendIndex });
            if (pointIndex > 0) {
                //Adding a shadow column if the series item is a total measure.
                //This shadow column always hidden on the chart
                series.push(Object.assign(Object.assign({}, totalSeriesItem), { y: getTotalValue(series), visible: false }));
            }
            series.push(totalSeriesItem);
        }
        else {
            series.push(seriesDataItem);
        }
        return series;
    }, []);
    return [
        Object.assign(Object.assign({}, series[0]), { data }),
    ];
}
export function buildWaterfallChartSeries(measureGroup, series, chartConfig, colorAssignment, colorPalette, emptyHeaderTitle) {
    var _a, _b;
    const isTotalSeriesEnabled = isTotalColumnEnabled(chartConfig);
    if (!isTotalSeriesEnabled || !series || series.length === 0) {
        if (hasTotalMeasure(chartConfig)) {
            return buildTotalMetricsSeries(measureGroup, series, chartConfig, colorAssignment, colorPalette);
        }
        return series;
    }
    const originalSeriesData = series[0].data;
    const color = isRgbColor(colorAssignment.color)
        ? getRgbStringFromRGB(colorAssignment.color.value)
        : getRgbStringFromRGB(getColorByGuid(colorPalette, colorAssignment.color.value, 0));
    return [
        Object.assign(Object.assign({}, series[0]), { data: [
                ...originalSeriesData,
                {
                    isSum: true,
                    legendIndex: 0,
                    name: (_b = (_a = chartConfig.total) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : emptyHeaderTitle,
                    color,
                    format: originalSeriesData[0].format,
                    borderColor: color,
                },
            ] }),
    ];
}
export function getWaterfallChartCategories(categories, chartConfig, measureGroup, emptyHeaderTitle) {
    var _a, _b, _c, _d, _e;
    const isTotalSeriesEnabled = (_b = (_a = chartConfig.total) === null || _a === void 0 ? void 0 : _a.enabled) !== null && _b !== void 0 ? _b : true;
    const newCategories = categories.length === 0
        ? (_c = measureGroup === null || measureGroup === void 0 ? void 0 : measureGroup.items) === null || _c === void 0 ? void 0 : _c.map((item) => item.measureHeaderItem.name)
        : [...categories];
    if (isTotalSeriesEnabled) {
        newCategories.push((_e = (_d = chartConfig.total) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : emptyHeaderTitle);
    }
    return newCategories;
}
function isColorHeaderItemVisible(color, isTotalEnabled, hasPositiveValues, hasNegativeValues) {
    if (!isColorDescriptor(color.headerItem)) {
        return false;
    }
    const colorItemId = color.headerItem.colorHeaderItem.id;
    return ((colorItemId.includes("total") && isTotalEnabled) ||
        (colorItemId.includes("positive") && hasPositiveValues) ||
        (colorItemId.includes("negative") && hasNegativeValues));
}
export function getColorAssignment(colorAssignments, chartConfig, series) {
    const isTotalEnabled = hasTotalMeasure(chartConfig) || isTotalColumnEnabled(chartConfig);
    const hasPositiveValues = series[0].data.some((item) => item.y > 0 && item.legendIndex === 1);
    const hasNegativeValues = series[0].data.some((item) => item.y < 0 && item.legendIndex === 2);
    const newColorAssignment = colorAssignments.filter((color) => isColorHeaderItemVisible(color, isTotalEnabled, hasPositiveValues, hasNegativeValues));
    return newColorAssignment.map((color) => {
        var _a, _b;
        const colorHeaderItem = (_a = color.headerItem) === null || _a === void 0 ? void 0 : _a.colorHeaderItem;
        const totalName = hasTotalMeasure(chartConfig) ? null : (_b = chartConfig.total) === null || _b === void 0 ? void 0 : _b.name;
        if (isTotalEnabled && colorHeaderItem.id.includes("total") && totalName) {
            return Object.assign(Object.assign({}, color), { headerItem: {
                    colorHeaderItem: Object.assign(Object.assign({}, colorHeaderItem), { name: totalName !== null && totalName !== void 0 ? totalName : colorHeaderItem.name }),
                } });
        }
        return color;
    });
}
//# sourceMappingURL=waterfallChartOptions.js.map