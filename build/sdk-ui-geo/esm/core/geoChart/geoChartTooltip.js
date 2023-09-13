// (C) 2020-2022 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import isFinite from "lodash/isFinite.js";
import escape from "lodash/escape.js";
import { DEFAULT_PUSHPIN_COLOR_VALUE, NULL_TOOLTIP_VALUE } from "./constants/geoChart.js";
import { parseGeoProperties } from "./helpers/geoChart/data.js";
import { formatValueForTooltip, getTooltipContentWidth } from "./helpers/geoChart/format.js";
const TOOLTIP_FULLSCREEN_THRESHOLD = 480;
export const TOOLTIP_MAX_WIDTH = 320;
function isTooltipItemValid(item) {
    if (!item) {
        return false;
    }
    const { title } = item;
    return Boolean(title);
}
function escapeAttributeValue(value) {
    return isFinite(value) ? value : escape(String(value));
}
function formatMeasure(item, separators) {
    const { title, value, format } = item;
    return {
        title,
        value: isFinite(value) ? formatValueForTooltip(value, format, separators) : NULL_TOOLTIP_VALUE,
    };
}
function formatAttribute(item) {
    const { value } = item;
    return {
        ...item,
        value: value ? escapeAttributeValue(value) : NULL_TOOLTIP_VALUE,
    };
}
// Tooltips are now switched off in edit/export mode
function isTooltipDisabled(config) {
    const { viewport = {} } = config;
    return Boolean(viewport.frozen);
}
function isTooltipShownInFullScreen() {
    return document.documentElement.clientWidth <= TOOLTIP_FULLSCREEN_THRESHOLD;
}
export function shouldShowTooltip(geoProperties) {
    if (isEmpty(geoProperties)) {
        return false;
    }
    const { locationName, color, size, segment } = geoProperties;
    return (isTooltipItemValid(locationName) ||
        isTooltipItemValid(size) ||
        isTooltipItemValid(color) ||
        isTooltipItemValid(segment));
}
function getInteractionMessage(drillableItems, intl) {
    const message = intl ? intl.formatMessage({ id: "visualization.tooltip.interaction" }) : null;
    return drillableItems?.length && intl ? `<div class="gd-viz-tooltip-interaction">${message}</div>` : "";
}
export function getTooltipHtml(geoProperties, tooltipStroke, maxWidth, separators, drillableItems, intl) {
    const { locationName = {}, size = {}, color = {}, segment = {} } = geoProperties || {};
    const interactionMessage = getInteractionMessage(drillableItems, intl);
    const tooltipItems = [
        formatAttribute(locationName),
        formatMeasure(size, separators),
        formatMeasure(color, separators),
        formatAttribute(segment),
    ]
        .map(getTooltipItemHtml)
        .join("");
    return `<div class="gd-viz-tooltip" style="max-width:${maxWidth}px">
                <span class="gd-viz-tooltip-stroke" style="border-top-color: ${tooltipStroke}"></span>
                <div class="gd-viz-tooltip-content">${tooltipItems}${interactionMessage}</div>
            </div>`;
}
function getTooltipItemHtml(item) {
    if (!isTooltipItemValid(item)) {
        return "";
    }
    // value is escaped in formatAttribute or formatMeasure function
    const { title, value } = item;
    return `<div class="gd-viz-tooltip-item">
                <span class="gd-viz-tooltip-title">${escape(title)}</span>
                <div class="gd-viz-tooltip-value-wraper">
                    <span class="gd-viz-tooltip-value">${value}</span>
                </div>
            </div>`;
}
export const handlePushpinMouseEnter = (e, chart, tooltip, config, drillableItems, intl) => {
    if (isTooltipDisabled(config)) {
        return;
    }
    const { separators } = config;
    const [feature] = e.features;
    const { properties } = feature;
    const parsedProps = parseGeoProperties(properties);
    if (!shouldShowTooltip(parsedProps)) {
        return;
    }
    chart.getCanvas().style.cursor = "pointer";
    const coordinates = feature.geometry.coordinates.slice();
    const tooltipStroke = parsedProps?.color?.background ?? DEFAULT_PUSHPIN_COLOR_VALUE;
    const isFullScreenTooltip = isTooltipShownInFullScreen();
    const chartWidth = chart.getCanvas().clientWidth;
    const maxTooltipContentWidth = getTooltipContentWidth(isFullScreenTooltip, chartWidth, TOOLTIP_MAX_WIDTH);
    const tooltipHtml = getTooltipHtml(parsedProps, tooltipStroke, maxTooltipContentWidth, separators, drillableItems, intl);
    tooltip
        .setLngLat(coordinates)
        .setHTML(tooltipHtml)
        .setMaxWidth(`${maxTooltipContentWidth}px`)
        .addTo(chart);
};
export const handlePushpinMouseLeave = (_e, chart, tooltip, config) => {
    if (isTooltipDisabled(config)) {
        return;
    }
    chart.getCanvas().style.cursor = "";
    tooltip.remove();
};
//# sourceMappingURL=geoChartTooltip.js.map