// (C) 2019-2023 GoodData Corporation
import { isDashboardWidget, isInsight, isInsightWidget, isKpi, isKpiWidget, isKpiWithoutComparison, isWidget, widgetType as getWidgetType, } from "@gooddata/sdk-model";
import { fluidLayoutDescriptor, getInsightSizeInfo, INSIGHT_WIDGET_SIZE_INFO_DEFAULT, INSIGHT_WIDGET_SIZE_INFO_DEFAULT_LEGACY, KPI_WIDGET_SIZE_INFO_DEFAULT, KPI_WIDGET_SIZE_INFO_DEFAULT_LEGACY, } from "@gooddata/sdk-ui-ext";
import { KPI_WITHOUT_COMPARISON_SIZE_INFO, KPI_WITH_COMPARISON_SIZE_INFO, GRID_ROW_HEIGHT_IN_PX, } from "./constants.js";
/**
 * @internal
 */
export function getSizeInfo(settings, widgetType, widgetContent) {
    if (widgetType === "kpi") {
        return getKpiSizeInfo(settings, widgetContent);
    }
    return getVisualizationSizeInfo(settings, widgetContent);
}
/**
 * @internal
 */
export function getInsightPlaceholderSizeInfo(settings) {
    return getVisualizationSizeInfo(settings);
}
function getVisualizationSizeInfo(settings, insight) {
    let sizeInfo;
    if (isInsight(insight)) {
        sizeInfo = getInsightSizeInfo(insight, settings);
    }
    if (!sizeInfo) {
        if (!settings.enableKDWidgetCustomHeight) {
            return INSIGHT_WIDGET_SIZE_INFO_DEFAULT_LEGACY;
        }
        return INSIGHT_WIDGET_SIZE_INFO_DEFAULT;
    }
    return sizeInfo;
}
function getKpiSizeInfo(settings, kpi) {
    if (!settings.enableKDWidgetCustomHeight) {
        return KPI_WIDGET_SIZE_INFO_DEFAULT_LEGACY;
    }
    if (!isKpi(kpi)) {
        return KPI_WIDGET_SIZE_INFO_DEFAULT;
    }
    return isKpiWithoutComparison(kpi) ? KPI_WITHOUT_COMPARISON_SIZE_INFO : KPI_WITH_COMPARISON_SIZE_INFO;
}
/**
 * @internal
 */
export function getDashboardLayoutWidgetDefaultHeight(settings, widgetType, widgetContent) {
    const sizeInfo = getSizeInfo(settings, widgetType, widgetContent);
    return fluidLayoutDescriptor.toHeightInPx(sizeInfo.height.default);
}
/**
 * @internal
 */
export function getDashboardLayoutWidgetMinGridHeight(settings, widgetType, widgetContent) {
    const sizeInfo = getSizeInfo(settings, widgetType, widgetContent);
    return sizeInfo.height.min;
}
/**
 * @internal
 */
export function getDashboardLayoutWidgetMaxGridHeight(settings, widgetType, widgetContent) {
    const sizeInfo = getSizeInfo(settings, widgetType, widgetContent);
    return sizeInfo.height.max;
}
/**
 * @internal
 */
export function getMinHeight(widgets, insightMap, defaultMin = 0) {
    const mins = widgets
        .filter(isDashboardWidget)
        .map((widget) => getDashboardLayoutWidgetMinGridHeight({ enableKDWidgetCustomHeight: true }, getWidgetType(widget), isKpiWidget(widget) ? widget.kpi : insightMap.get(widget.insight)));
    return Math.max(defaultMin, ...mins);
}
/**
 * @internal
 */
export function getMaxHeight(widgets, insightMap) {
    const maxs = widgets
        .filter(isDashboardWidget)
        .map((widget) => getDashboardLayoutWidgetMaxGridHeight({ enableKDWidgetCustomHeight: true }, getWidgetType(widget), isKpiWidget(widget) ? widget.kpi : insightMap.get(widget.insight)));
    return Math.min(...maxs);
}
/**
 * @internal
 */
export function getDashboardLayoutWidgetMinGridWidth(settings, widgetType, widgetContent) {
    const sizeInfo = getSizeInfo(settings, widgetType, widgetContent);
    return sizeInfo.width.min;
}
/**
 * @internal
 */
export function getMinWidth(widget, insightMap) {
    return getDashboardLayoutWidgetMinGridWidth({ enableKDWidgetCustomHeight: true }, getWidgetType(widget), isKpiWidget(widget) ? widget.kpi : insightMap.get(widget.insight));
}
/**
 * @internal
 */
export function calculateWidgetMinHeight(widget, currentSize, insightMap, settings) {
    let widgetType;
    let insight;
    let content;
    if (isWidget(widget)) {
        widgetType = getWidgetType(widget);
    }
    if (isInsightWidget(widget)) {
        insight = insightMap.get(widget.insight);
        content = insight;
    }
    if (isKpiWidget(widget)) {
        content = widget.kpi;
    }
    return currentSize
        ? getDashboardLayoutItemHeight(currentSize) ||
            (!currentSize.heightAsRatio
                ? getDashboardLayoutWidgetDefaultHeight(settings, widgetType, content)
                : undefined)
        : undefined;
}
export const getDashboardLayoutItemHeight = (size) => {
    const { gridHeight } = size;
    if (gridHeight) {
        return getDashboardLayoutItemHeightForGrid(gridHeight);
    }
    return undefined;
};
export const getDashboardLayoutItemHeightForGrid = (gridHeight) => gridHeight * GRID_ROW_HEIGHT_IN_PX;
//# sourceMappingURL=sizing.js.map