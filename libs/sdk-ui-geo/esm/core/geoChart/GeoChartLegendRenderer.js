// (C) 2020-2022 GoodData Corporation
import React from "react";
import ReactMeasure from "react-measure";
import cx from "classnames";
import { defaultImport } from "default-import";
import { generateLegendColorData } from "./geoChartColor.js";
import PushpinCategoryLegend, { HEIGHT_OF_SIZE_LEGEND } from "./legends/PushpinCategoryLegend.js";
import PushpinSizeLegend from "./legends/PushpinSizeLegend.js";
import { getAvailableLegends } from "./helpers/geoChart/data.js";
import { Paging, ColorLegend } from "@gooddata/sdk-ui-vis-commons";
import { getPushpinColorLegendSize, getPushpinColorLegendTitle, isSmallPushpinSizeLegend, getPushpinSizeLegendTitle, shouldRenderCircleLegendInsidePopUp, shouldRenderMiddleCircle, } from "./helpers/geoChart/responsive.js";
const HEIGHT_OF_COLOR_LEGEND = 210;
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const Measure = defaultImport(ReactMeasure);
function getClassnames(props, availableLegends) {
    const { position, isFluidLegend } = props;
    const { hasSizeLegend } = availableLegends;
    const isBottomPosition = isFluidLegend || position === "bottom";
    return cx("geo-legend", "s-geo-legend", "viz-legend", {
        "viz-fluid-legend-wrap": isFluidLegend,
        "viz-static-legend-wrap": !isFluidLegend,
        static: !isFluidLegend,
        "has-size-legend": hasSizeLegend,
        [`position-${position}`]: !isBottomPosition,
        // this is required in case
        // position is not BOTTOM but isFluidLegend is true
        "position-bottom": isBottomPosition,
    });
}
export default function GeoChartLegendRenderer(props) {
    const { categoryItems = [], geoData = {}, height, numericSymbols = [] } = props;
    const position = props.position ?? "top";
    const availableLegends = getAvailableLegends(categoryItems, geoData);
    const { hasCategoryLegend, hasColorLegend, hasSizeLegend } = availableLegends;
    const isLegendVisible = hasCategoryLegend || hasColorLegend || hasSizeLegend;
    if (!isLegendVisible) {
        return null;
    }
    if (hasCategoryLegend) {
        return renderCategoryAndSizeLegend(props, availableLegends);
    }
    if (hasColorLegend && hasSizeLegend && shouldShowPagingLegend(height, position)) {
        return (React.createElement(ColorAndSizeLegendWithPaging, { ...props, numericSymbols: numericSymbols, availableLegends: availableLegends }));
    }
    return renderColorAndSizeLegend(props, availableLegends);
}
function renderCategoryAndSizeLegend(props, availableLegends) {
    const { contentRect, renderPopUp } = props;
    const { hasSizeLegend } = availableLegends;
    const classNames = cx(getClassnames(props, availableLegends));
    return (React.createElement(Measure, { client: true }, ({ measureRef, contentRect: contentRectLegend }) => {
        if (shouldRenderCircleLegendInsidePopUp(contentRect?.client?.width, renderPopUp)) {
            return (React.createElement("div", { className: classNames, ref: measureRef }, renderPushpinLegend(props, contentRectLegend, hasSizeLegend)));
        }
        return (React.createElement("div", { className: classNames, ref: measureRef },
            renderPushpinCategoryLegend(props, contentRectLegend, hasSizeLegend),
            renderPushpinSizeLegend(props, hasSizeLegend)));
    }));
}
// if height of color + size is bigger than container, we will show paging for legends
function shouldShowPagingLegend(height, legendPosition) {
    if (height !== undefined && (legendPosition === "left" || legendPosition === "right")) {
        const heightOfColorAndSizeLegend = HEIGHT_OF_COLOR_LEGEND + HEIGHT_OF_SIZE_LEGEND;
        return height < heightOfColorAndSizeLegend;
    }
    return false;
}
function ColorAndSizeLegendWithPaging(props) {
    const [page, setPage] = React.useState(1);
    const showNextPage = () => setPage(2);
    const showPrevPage = () => setPage(1);
    const { availableLegends } = props;
    const classNames = getClassnames(props, availableLegends);
    return (React.createElement("div", { className: classNames },
        React.createElement("div", { className: "geo-legend-paging" },
            renderPushpinColorLegend(props, page === 1),
            renderPushpinSizeLegend(props, page === 2)),
        React.createElement(Paging, { page: page, pagesCount: 2, showNextPage: showNextPage, showPrevPage: showPrevPage })));
}
function renderColorAndSizeLegend(props, availableLegends) {
    const { hasColorLegend, hasSizeLegend } = availableLegends;
    const classNames = getClassnames(props, availableLegends);
    return (React.createElement("div", { className: classNames },
        renderPushpinColorLegend(props, hasColorLegend),
        renderPushpinSizeLegend(props, hasSizeLegend)));
}
function renderPushpinColorLegend(props, hasColorLegend) {
    if (!hasColorLegend) {
        return null;
    }
    const { geoData, position = "top", responsive, isFluidLegend, colorLegendValue, numericSymbols = [], contentRect, } = props;
    const data = geoData.color.data;
    const format = geoData.color.format;
    const dataWithoutNull = data.filter(isFinite);
    const colorData = generateLegendColorData(dataWithoutNull, colorLegendValue);
    const width = contentRect?.client?.width;
    const size = getPushpinColorLegendSize(width, isFluidLegend, responsive);
    const title = getPushpinColorLegendTitle(geoData?.color?.name, width, responsive);
    return (React.createElement(ColorLegend, { data: colorData, format: format, size: size, numericSymbols: numericSymbols, position: position, title: title }));
}
function renderPushpinCategoryLegend(props, contentRect, hasSizeLegend) {
    const { containerId } = props;
    if (!containerId) {
        return null;
    }
    return (React.createElement(PushpinCategoryLegend, { ...props, contentRect: contentRect, hasSizeLegend: hasSizeLegend, containerId: containerId }));
}
function renderPushpinSizeLegend(props, hasSizeLegend, ignoreMeasureName = false, ignoreSmallSize = false) {
    if (!hasSizeLegend) {
        return null;
    }
    const { geoData, numericSymbols = [], responsive, contentRect } = props;
    if (!geoData?.size) {
        return null;
    }
    const { size: { data, format, name }, } = geoData;
    const width = contentRect?.client?.width;
    const isSmall = isSmallPushpinSizeLegend(width, ignoreSmallSize, responsive);
    const title = getPushpinSizeLegendTitle(name, width, ignoreMeasureName);
    const showMiddleCircle = shouldRenderMiddleCircle(width, ignoreSmallSize);
    return (React.createElement(PushpinSizeLegend, { format: format, measureName: title, numericSymbols: numericSymbols, sizes: data, isSmall: isSmall, showMiddleCircle: showMiddleCircle }));
}
function renderPushpinLegend(props, contentRect, hasSizeLegend) {
    const { containerId } = props;
    if (!containerId) {
        return null;
    }
    return (React.createElement(PushpinCategoryLegend, { ...props, contentRect: contentRect, hasSizeLegend: hasSizeLegend, isSizeLegendVisible: false, containerId: containerId, customComponent: renderPushpinSizeLegend(props, hasSizeLegend, true, true), customComponentName: props.geoData?.size?.name }));
}
//# sourceMappingURL=GeoChartLegendRenderer.js.map