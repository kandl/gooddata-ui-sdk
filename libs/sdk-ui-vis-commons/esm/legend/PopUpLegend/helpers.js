import { TOP, RIGHT, BOTTOM } from "../PositionTypes.js";
const LEGEND_WIDTH_BREAKPOINT = 610;
const LEGEND_HEIGHT_BREAKPOINT_SM = 194;
const LEGEND_HEIGHT_BREAKPOINT_ML = 274;
function getLegendDetailsForAutoResponsive(legendPosition, contentRect, legendLabel) {
    const width = contentRect?.client?.width;
    const height = contentRect?.client?.height;
    if (!width || !height) {
        return null;
    }
    const name = legendLabel ? { name: legendLabel } : {};
    // Decision logic: https://gooddata.invisionapp.com/console/share/KJ2A59MOAQ/548340571
    if (width < LEGEND_WIDTH_BREAKPOINT) {
        const maxRowsForTop = height < LEGEND_HEIGHT_BREAKPOINT_ML ? 1 : 2;
        return { ...name, position: TOP, renderPopUp: true, maxRows: maxRowsForTop };
    }
    else {
        const isLegendTopBottom = legendPosition === "top" || legendPosition === "bottom";
        if (height < LEGEND_HEIGHT_BREAKPOINT_SM) {
            return { ...name, position: RIGHT, renderPopUp: false };
        }
        else {
            const maxRowsForTopBottom = height < LEGEND_HEIGHT_BREAKPOINT_ML ? 1 : 2;
            return {
                ...name,
                position: legendPosition,
                renderPopUp: isLegendTopBottom,
                maxRows: isLegendTopBottom ? maxRowsForTopBottom : undefined,
            };
        }
    }
}
function getLegendDetailsForStandard(legendPosition, responsive, showFluidLegend, isHeatmap) {
    let pos = legendPosition;
    if (isHeatmap) {
        const isSmall = Boolean(responsive && showFluidLegend);
        if (isSmall) {
            pos = legendPosition === TOP ? TOP : BOTTOM;
        }
        else {
            pos = legendPosition || RIGHT;
        }
    }
    return {
        position: pos,
        renderPopUp: false,
    };
}
/**
 * @internal
 */
export function getLegendDetails(legendPosition, responsive, options) {
    if (responsive !== "autoPositionWithPopup") {
        return getLegendDetailsForStandard(legendPosition, responsive, options.showFluidLegend, options.isHeatmap);
    }
    return getLegendDetailsForAutoResponsive(legendPosition, options.contentRect, options.legendLabel);
}
//# sourceMappingURL=helpers.js.map