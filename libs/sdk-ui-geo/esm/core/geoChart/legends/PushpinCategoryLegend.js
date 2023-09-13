// (C) 2020-2022 GoodData Corporation
import React from "react";
import noop from "lodash/noop.js";
import { PopUpLegend, StaticLegend, LegendPosition, FluidLegend, } from "@gooddata/sdk-ui-vis-commons";
export const HEIGHT_OF_SIZE_LEGEND = 161;
export default function PushpinCategoryLegend(props) {
    const { contentRect, hasSizeLegend, isFluidLegend, renderPopUp, isSizeLegendVisible = true } = props;
    if (renderPopUp) {
        return React.createElement(GeoPopUpLegend, { ...props, isSizeLegendVisible: isSizeLegendVisible });
    }
    return (React.createElement("div", { className: "s-geo-category-legend" }, isFluidLegend
        ? renderFluidCategoryLegend(props, contentRect)
        : renderStaticCategoryLegend(props, contentRect, hasSizeLegend)));
}
function renderFluidCategoryLegend(props, contentRect) {
    const { categoryItems, onItemClick } = props;
    const legendProps = {
        series: categoryItems ?? [],
        onItemClick,
    };
    const { client: contentRectClient } = contentRect;
    const usedWidth = contentRectClient?.width ? Math.floor(contentRectClient.width) : 0;
    return React.createElement(FluidLegend, { ...legendProps, containerWidth: usedWidth });
}
function renderStaticCategoryLegend(props, contentRect, hasSizeLegend) {
    const { categoryItems = [], position = "top", height, format, locale, onItemClick, responsive } = props;
    // For Geo Pushpin with position left/right
    // we set the height of series to number of actual displayed items
    // so that, size legend will be visible
    const shouldFillAvailableSpace = position !== "left" && position !== "right";
    const legendProps = {
        format,
        locale,
        position,
        responsive,
        series: categoryItems,
        shouldFillAvailableSpace,
        onItemClick,
    };
    const { client: contentRectClient } = contentRect;
    const hasSizeAndLeftRightPosition = hasSizeLegend && (position === LegendPosition.LEFT || position === LegendPosition.RIGHT);
    const measuredHeight = contentRectClient?.height ? Math.floor(contentRectClient.height) : 0;
    const usedHeight = (height || measuredHeight) - (hasSizeAndLeftRightPosition ? HEIGHT_OF_SIZE_LEGEND : 0);
    return React.createElement(StaticLegend, { ...legendProps, containerHeight: usedHeight });
}
function GeoPopUpLegend(props) {
    const { containerId, categoryItems = [], onItemClick = noop, name, maxRows, customComponent, customComponentName, hasSizeLegend, isSizeLegendVisible, } = props;
    return (React.createElement(PopUpLegend, { series: categoryItems, onLegendItemClick: onItemClick, maxRows: hasSizeLegend && isSizeLegendVisible && maxRows ? maxRows - 1 : maxRows, name: name, containerId: containerId, customComponent: customComponent, customComponentName: customComponentName }));
}
//# sourceMappingURL=PushpinCategoryLegend.js.map