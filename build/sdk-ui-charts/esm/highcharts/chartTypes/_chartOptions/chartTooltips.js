import { ClientFormatterFacade } from "@gooddata/number-formatter";
import { customEscape, isCssMultiLineTruncationSupported, isOneOfTypes, isTreemap, unwrap, } from "../_util/common.js";
import { formatValueForTooltip, getFormattedValueForTooltip } from "./tooltip.js";
import { multiMeasuresAlternatingTypes } from "./chartCapabilities.js";
import cx from "classnames";
import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
const TOOLTIP_PADDING = 10;
const renderTooltipHTML = (textData, maxTooltipContentWidth) => {
    const maxItemWidth = maxTooltipContentWidth - TOOLTIP_PADDING * 2;
    const titleMaxWidth = maxItemWidth;
    const multiLineTruncationSupported = isCssMultiLineTruncationSupported();
    const threeDotsWidth = 16;
    const valueMaxWidth = multiLineTruncationSupported ? maxItemWidth : maxItemWidth - threeDotsWidth;
    const titleStyle = `style="max-width: ${titleMaxWidth}px;"`;
    const valueStyle = `style="max-width: ${valueMaxWidth}px;"`;
    const itemClass = cx("gd-viz-tooltip-item", {
        "gd-multiline-supported": multiLineTruncationSupported,
    });
    const valueClass = cx("gd-viz-tooltip-value", {
        "gd-clamp-two-line": multiLineTruncationSupported,
    });
    return textData
        .map((item) => {
        // the third span is hidden, that help to have tooltip work with max-width
        return `<div class="${itemClass}">
                        <span class="gd-viz-tooltip-title" ${titleStyle}>${item[0]}</span>
                        <div class="gd-viz-tooltip-value-wraper" ${titleStyle}>
                            <span class="${valueClass}" ${valueStyle}>${item[1]}</span>
                        </div>
                        <div class="gd-viz-tooltip-value-wraper" ${titleStyle}>
                            <span class="gd-viz-tooltip-value-max-content" ${valueStyle}>${item[1]}</span>
                        </div>
                    </div>`;
    })
        .join("\n");
};
function isPointOnOppositeAxis(point) {
    var _a, _b;
    return (_b = (_a = point.series) === null || _a === void 0 ? void 0 : _a.yAxis.opposite) !== null && _b !== void 0 ? _b : false;
}
function getMeasureTextData(measure, formattedValue) {
    if (measure) {
        return [[customEscape(measure.measureHeaderItem.name), formattedValue]];
    }
    return [];
}
function getTextDataWithStackByAttribute(measure, formattedValue, stackByAttribute, point) {
    const textData = getMeasureTextData(measure, formattedValue);
    textData.unshift([
        customEscape(stackByAttribute.formOf.name),
        customEscape(customEscape(point.series.name)),
    ]);
    return textData;
}
export function buildTooltipFactory(viewByAttribute, type, config = {}, isDualAxis = false, measure, stackByAttribute) {
    const { separators, stackMeasuresToPercent = false } = config;
    return (point, maxTooltipContentWidth, percentageValue) => {
        var _a;
        const isDualChartWithRightAxis = isDualAxis && isPointOnOppositeAxis(point);
        const formattedValue = getFormattedValueForTooltip(isDualChartWithRightAxis, stackMeasuresToPercent, point, separators, percentageValue);
        let textData = [[customEscape(point.series.name), formattedValue]];
        if (stackByAttribute) {
            textData = getTextDataWithStackByAttribute(measure, formattedValue, stackByAttribute, point);
        }
        if (viewByAttribute) {
            // For some reason, highcharts ommit categories for pie charts with attribute. Use point.name instead.
            // use attribute name instead of attribute display form name
            textData.unshift([
                customEscape(viewByAttribute.formOf.name),
                // since applying 'grouped-categories' plugin,
                // 'category' type is replaced from string to object in highchart
                customEscape(((_a = point.category) === null || _a === void 0 ? void 0 : _a.name) || point.name),
            ]);
        }
        else if (isOneOfTypes(type, multiMeasuresAlternatingTypes)) {
            // Pie charts with measure only have to use point.name instead of series.name to get the measure name
            textData[0][0] = customEscape(point.name);
        }
        return renderTooltipHTML(textData, maxTooltipContentWidth);
    };
}
export function buildTooltipForTwoAttributesFactory(viewByAttribute, viewByParentAttribute, config = {}, isDualAxis = false, measure, stackByAttribute) {
    const { separators, stackMeasuresToPercent = false } = config;
    return (point, maxTooltipContentWidth, percentageValue) => {
        const category = point.category;
        const isDualChartWithRightAxis = isDualAxis && isPointOnOppositeAxis(point);
        const formattedValue = getFormattedValueForTooltip(isDualChartWithRightAxis, stackMeasuresToPercent, point, separators, percentageValue);
        let textData = [[customEscape(point.series.name), formattedValue]];
        if (stackByAttribute) {
            textData = getTextDataWithStackByAttribute(measure, formattedValue, stackByAttribute, point);
        }
        if (category) {
            if (viewByAttribute) {
                textData.unshift([customEscape(viewByAttribute.formOf.name), customEscape(category.name)]);
            }
            if (viewByParentAttribute && category.parent) {
                textData.unshift([
                    customEscape(viewByParentAttribute.formOf.name),
                    customEscape(category.parent.name),
                ]);
            }
        }
        return renderTooltipHTML(textData, maxTooltipContentWidth);
    };
}
export function generateTooltipXYFn(measures, stackByAttribute, config = {}) {
    const { separators } = config;
    return (point, maxTooltipContentWidth) => {
        const textData = [];
        const name = point.name ? point.name : point.series.name;
        if (stackByAttribute) {
            textData.unshift([customEscape(stackByAttribute.formOf.name), customEscape(name)]);
        }
        if (measures[0]) {
            textData.push([
                customEscape(measures[0].measureHeaderItem.name),
                formatValueForTooltip(point.x, measures[0].measureHeaderItem.format, separators),
            ]);
        }
        if (measures[1]) {
            textData.push([
                customEscape(measures[1].measureHeaderItem.name),
                formatValueForTooltip(point.y, measures[1].measureHeaderItem.format, separators),
            ]);
        }
        if (measures[2]) {
            textData.push([
                customEscape(measures[2].measureHeaderItem.name),
                formatValueForTooltip(point.z, measures[2].measureHeaderItem.format, separators),
            ]);
        }
        return renderTooltipHTML(textData, maxTooltipContentWidth);
    };
}
export function generateTooltipHeatmapFn(viewByAttribute, stackByAttribute, emptyHeaderTitle, config = {}) {
    const { separators } = config;
    const formatValue = (val, format) => {
        if (val === null) {
            return "-";
        }
        return ClientFormatterFacade.formatValue(val, format, separators).formattedValue;
    };
    return (point, maxTooltipContentWidth) => {
        const formattedValue = customEscape(formatValue(point.value, point.series.userOptions.dataLabels.formatGD));
        const textData = [];
        textData.unshift([customEscape(point.series.name), formattedValue]);
        if (viewByAttribute) {
            textData.unshift([
                customEscape(viewByAttribute.formOf.name),
                customEscape(valueWithEmptyHandling(getMappingHeaderFormattedName(viewByAttribute.items[point.x]), emptyHeaderTitle)),
            ]);
        }
        if (stackByAttribute) {
            textData.unshift([
                customEscape(stackByAttribute.formOf.name),
                customEscape(valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[point.y]), emptyHeaderTitle)),
            ]);
        }
        return renderTooltipHTML(textData, maxTooltipContentWidth);
    };
}
export function buildTooltipTreemapFactory(viewByAttribute, stackByAttribute, emptyHeaderTitle, config = {}) {
    const { separators } = config;
    return (point, maxTooltipContentWidth) => {
        var _a;
        // show tooltip for leaf node only
        if (!point.node || point.node.isLeaf === false) {
            return null;
        }
        const formattedValue = formatValueForTooltip(point.value, point.format, separators);
        const textData = [];
        if (stackByAttribute) {
            textData.push([
                customEscape(stackByAttribute.formOf.name),
                customEscape(valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[point.y]), emptyHeaderTitle)),
            ]);
        }
        if (viewByAttribute) {
            textData.unshift([
                customEscape(viewByAttribute.formOf.name),
                customEscape(valueWithEmptyHandling(getMappingHeaderFormattedName(viewByAttribute.items[point.x]), emptyHeaderTitle)),
            ]);
            textData.push([customEscape(point.series.name), formattedValue]);
        }
        else {
            textData.push([customEscape((_a = point.category) === null || _a === void 0 ? void 0 : _a.name), formattedValue]);
        }
        return renderTooltipHTML(textData, maxTooltipContentWidth);
    };
}
export function generateTooltipSankeyChartFn(viewByAttribute, viewByParentAttribute, measure, config = {}) {
    const { separators } = config;
    return (point, maxTooltipContentWidth) => {
        const textData = [];
        const format = unwrap(measure).format;
        if (point.isNode) {
            const formattedValue = formatValueForTooltip(point.sum, format, separators);
            if (point.name) {
                textData.push(["", point.name]);
            }
            textData.push([measure.measureHeaderItem.name, formattedValue]);
        }
        else {
            const formattedValue = formatValueForTooltip(point.weight, format, separators);
            textData.push([viewByParentAttribute.formOf.name, point.from]);
            textData.push([viewByAttribute.formOf.name, point.to]);
            textData.push([measure.measureHeaderItem.name, formattedValue]);
        }
        return renderTooltipHTML(textData, maxTooltipContentWidth);
    };
}
export function getTooltipWaterfallChart(viewByAttribute, config = {}) {
    const { separators } = config;
    return (point, maxTooltipContentWidth, percentageValue) => {
        var _a;
        const formattedValue = getFormattedValueForTooltip(false, false, point, separators, percentageValue);
        const isNormalDataPoint = viewByAttribute && !(point === null || point === void 0 ? void 0 : point.isSum);
        const textData = [[customEscape(isNormalDataPoint ? point.series.name : point.name), formattedValue]];
        if (isNormalDataPoint) {
            textData.unshift([
                customEscape(viewByAttribute.formOf.name),
                customEscape(((_a = point.category) === null || _a === void 0 ? void 0 : _a.name) || point.name),
            ]);
        }
        return renderTooltipHTML(textData, maxTooltipContentWidth);
    };
}
export function getTooltipFactory(isViewByTwoAttributes, viewByAttribute, viewByParentAttribute, stackByAttribute, measure, emptyHeaderTitle, config = {}, isDualAxis = false) {
    const { type } = config;
    if (isTreemap(type)) {
        return buildTooltipTreemapFactory(viewByAttribute, stackByAttribute, emptyHeaderTitle, config);
    }
    if (isViewByTwoAttributes) {
        return buildTooltipForTwoAttributesFactory(viewByAttribute, viewByParentAttribute, config, isDualAxis, measure, stackByAttribute);
    }
    return buildTooltipFactory(viewByAttribute, type, config, isDualAxis, measure, stackByAttribute);
}
//# sourceMappingURL=chartTooltips.js.map