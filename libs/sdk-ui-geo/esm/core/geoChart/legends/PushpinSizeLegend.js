// (C) 2020-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { calculateAverage } from "../helpers/geoChart/common.js";
import { formatLegendLabel } from "@gooddata/sdk-ui-vis-commons";
export default function PushpinSizeLegend(props) {
    const { sizes = [], format, numericSymbols = [], measureName, isSmall, showMiddleCircle } = props;
    const sizeData = getSizeData(sizes);
    if (!sizeData.length) {
        return null;
    }
    const min = getMin(sizeData);
    const max = getMax(sizeData);
    if (min === max) {
        return null;
    }
    const diff = max - min;
    const classNamesContainer = cx("pushpin-size-legend s-pushpin-size-legend", {
        "is-small-container": isSmall,
    });
    const classNamesCircles = cx("pushpin-size-legend-circle-list", { "is-small-circles": isSmall });
    return (React.createElement("div", { className: classNamesContainer },
        measureName ? (React.createElement("div", { className: "metric-name", title: measureName },
            measureName,
            ":")) : null,
        React.createElement("div", { className: classNamesCircles },
            React.createElement("div", { className: "pushpin-size-legend-circle circle-min-value" },
                React.createElement("span", { className: "circle-min-icon" }),
                React.createElement("span", { className: "circle-value" }, formatLegendLabel(min, format, diff, numericSymbols))),
            showMiddleCircle ? renderMiddleCircle(props) : null,
            !measureName ? React.createElement("div", { className: "circle-separator" }) : null,
            React.createElement("div", { className: "pushpin-size-legend-circle circle-max-value" },
                React.createElement("span", { className: "circle-max-icon" }),
                React.createElement("span", { className: "circle-value" }, formatLegendLabel(max, format, diff, numericSymbols))))));
}
function renderMiddleCircle(props) {
    const { sizes = [], format, numericSymbols = [], measureName } = props;
    const sizeData = getSizeData(sizes);
    const diff = getMax(sizeData) - getMin(sizeData);
    return (React.createElement(React.Fragment, null,
        !measureName && React.createElement("div", { className: "circle-separator" }),
        React.createElement("div", { className: "pushpin-size-legend-circle circle-average-value" },
            React.createElement("span", { className: "circle-average-icon" }),
            React.createElement("span", { className: "circle-value" }, formatLegendLabel(calculateAverage(sizeData), format, diff, numericSymbols)))));
}
function getSizeData(sizes) {
    return sizes.filter((value) => value !== null && isFinite(value) && !isNaN(value));
}
function getMin(sizeData) {
    return Math.min(...sizeData);
}
function getMax(sizeData) {
    return Math.max(...sizeData);
}
//# sourceMappingURL=PushpinSizeLegend.js.map