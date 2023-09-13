// (C) 2020-2023 GoodData Corporation
import React from "react";
import cx from "classnames";
import { getColorLegendConfiguration, } from "./helpers.js";
import { TOP, BOTTOM } from "./PositionTypes.js";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
export function ColorLabels(colorLabelProps) {
    const { labels } = colorLabelProps;
    return (React.createElement("div", { className: "labels", "aria-label": "Color labels" }, labels.map((item) => {
        const { key, label, style } = item;
        return (React.createElement("span", { key: key, style: style }, label));
    })));
}
export function ColorBoxes(colorBoxProps) {
    const { boxes } = colorBoxProps;
    return (React.createElement("div", { className: "boxes", "aria-label": "Color boxes" }, boxes.map((box) => {
        const classes = cx("box", box.class);
        const { key, style } = box;
        return React.createElement("span", { className: classes, key: key, style: style });
    })));
}
function LegendBoxes({ renderLabelsFirst, boxes, labels }) {
    return (React.createElement(React.Fragment, null,
        renderLabelsFirst ? React.createElement(ColorLabels, { labels: labels }) : null,
        React.createElement(ColorBoxes, { boxes: boxes }),
        !renderLabelsFirst && React.createElement(ColorLabels, { labels: labels })));
}
function LegendWithTitle(props) {
    const { title, position, children } = props;
    const isHorizontal = position === TOP || position === BOTTOM;
    const classes = cx("heatmap-legend-with-title", { horizontal: isHorizontal });
    return (React.createElement("div", { className: classes },
        React.createElement("div", { className: "heatmap-legend-title" }, `${title}:`),
        React.createElement("div", { className: "heatmap-legend-boxes" }, children)));
}
/**
 * @internal
 */
export const ColorLegend = withTheme((colorLegendProps) => {
    const { title, data, format, numericSymbols, size = "large", position, theme } = colorLegendProps;
    if (!data.length) {
        return null;
    }
    const config = getColorLegendConfiguration(data, format, numericSymbols, size, position, theme);
    const classes = cx(...config.classes);
    const renderLabelsFirst = config.position === TOP;
    const { boxes, labels } = config;
    return (React.createElement("div", { className: classes, "aria-label": "Color legend" }, title ? (React.createElement(LegendWithTitle, { title: title, position: position },
        React.createElement(LegendBoxes, { renderLabelsFirst: renderLabelsFirst, boxes: boxes, labels: labels }))) : (React.createElement(LegendBoxes, { renderLabelsFirst: renderLabelsFirst, boxes: boxes, labels: labels }))));
});
//# sourceMappingURL=ColorLegend.js.map