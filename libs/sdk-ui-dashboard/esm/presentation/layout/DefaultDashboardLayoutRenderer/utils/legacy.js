import { DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT_PX } from "@gooddata/sdk-ui-ext";
import { DASHBOARD_LAYOUT_GRID_COLUMNS_COUNT } from "../../../../_staging/dashboard/fluidLayout/index.js";
const RATIO_16_9 = 9 / 16;
const HEADER_HEIGHT = 330;
const PADDING_BOTTOM = 55;
const HEADLINE_OUTER_HEIGHT = 48 + 20; // item-headline-outer + padding-top/bottom
export function calculateGeoPushpinWidgetHeight(windowHeight, visualizationItemWidth) {
    const widgetHeight = Math.round(visualizationItemWidth * RATIO_16_9);
    const widgetMaxHeight = windowHeight - HEADER_HEIGHT - PADDING_BOTTOM;
    const defaultVisualizationHeight = DASHBOARD_LAYOUT_DEFAULT_VIS_HEIGHT_PX - HEADLINE_OUTER_HEIGHT;
    const maxHeight = widgetMaxHeight > defaultVisualizationHeight ? widgetMaxHeight : defaultVisualizationHeight;
    return {
        height: widgetHeight,
        maxHeight,
    };
}
export function isGeoPushpin(visType) {
    return visType === "pushpin";
}
export function isFullWidthGeoPushpin(currentColumnWidth, visType) {
    return isGeoPushpin(visType) && currentColumnWidth === DASHBOARD_LAYOUT_GRID_COLUMNS_COUNT;
}
export function getGeoPushpinWidgetStyle(visType, visualizationItemWidth, currentColumnWidth, windowHeight, enableCustomHeight) {
    if (isFullWidthGeoPushpin(currentColumnWidth, visType) && !enableCustomHeight) {
        const { height, maxHeight } = calculateGeoPushpinWidgetHeight(windowHeight, visualizationItemWidth);
        return {
            height,
            maxHeight,
        };
    }
    return null;
}
//# sourceMappingURL=legacy.js.map