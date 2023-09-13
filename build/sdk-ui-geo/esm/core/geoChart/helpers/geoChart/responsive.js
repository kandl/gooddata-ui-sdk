/**
 * Geo chart has special breakpoints related to responsive behavior
 */
const MIN_WIDTH_TO_RENDER_LEGEND_WITH_TITLES = 260;
const MIN_WIDTH_TO_RENDER_CIRCLE_SIZE_LEGEND = 330;
// We keep this as two separate constants because they handle different things
const MIN_WIDTH_TO_RENDER_MIDDLE_CIRCLE_IN_CIRCLE_SIZE_LEGEND = 410;
const MIN_WIDTH_TO_RENDER_LARGE_COLOR_LEGEND = 410;
function shouldRenderLegendTitles(width) {
    return width ? width >= MIN_WIDTH_TO_RENDER_LEGEND_WITH_TITLES : true;
}
function shouldRenderWholeCircleLegend(width) {
    return width ? width >= MIN_WIDTH_TO_RENDER_CIRCLE_SIZE_LEGEND : true;
}
function shouldRenderLargeColorLegend(width) {
    return width ? width >= MIN_WIDTH_TO_RENDER_LARGE_COLOR_LEGEND : true;
}
export function getResponsiveInfo(responsive) {
    if (isAutoPositionWithPopup(responsive)) {
        return responsive;
    }
    return Boolean(responsive);
}
export function isAutoPositionWithPopup(responsive) {
    return responsive === "autoPositionWithPopup";
}
export function getPushpinColorLegendSize(width, isFluidLegend, responsive) {
    const isAutoPosition = isAutoPositionWithPopup(responsive);
    const isSmall = isAutoPosition && !shouldRenderLargeColorLegend(width);
    let size = "large";
    if (isSmall) {
        size = "small";
    }
    if (isFluidLegend) {
        size = "medium";
    }
    return size;
}
export function getPushpinColorLegendTitle(title, width, responsive) {
    const isAutoPosition = isAutoPositionWithPopup(responsive);
    return isAutoPosition && title && shouldRenderLegendTitles(width) ? title : undefined;
}
export function isSmallPushpinSizeLegend(width, ignoreSmallSize, responsive) {
    return !ignoreSmallSize && isAutoPositionWithPopup(responsive) && !shouldRenderWholeCircleLegend(width);
}
export function getPushpinSizeLegendTitle(title, width, ignoreMeasureName) {
    return !ignoreMeasureName && shouldRenderLegendTitles(width) ? title : undefined;
}
export function shouldRenderCircleLegendInsidePopUp(width, renderPopUp) {
    return !shouldRenderWholeCircleLegend(width) && Boolean(renderPopUp);
}
export function shouldRenderMiddleCircle(width, ignoreSmallSize) {
    return (ignoreSmallSize ||
        (shouldRenderWholeCircleLegend(width) &&
            (width ? width >= MIN_WIDTH_TO_RENDER_MIDDLE_CIRCLE_IN_CIRCLE_SIZE_LEGEND : true)));
}
//# sourceMappingURL=responsive.js.map