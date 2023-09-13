// (C) 2007-2023 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import { VisualizationTypes } from "@gooddata/sdk-ui";
import { getChartType, getVisibleSeries, isStacked, getShapeAttributes, } from "../../chartTypes/_chartCreators/helpers.js";
import { getDataLabelAttributes } from "../../chartTypes/_chartCreators/dataLabelsHelpers.js";
import { parseRGBColorCode } from "@gooddata/sdk-ui-vis-commons";
import { isOneOfTypes } from "../../chartTypes/_util/common.js";
const setWhiteColor = (point) => {
    point.dataLabel.element.childNodes[0].style.fill = "#fff";
    point.dataLabel.element.childNodes[0].style["text-shadow"] = "rgb(0, 0, 0) 0px 0px 1px";
    point.dataLabel.element.classList.remove("gd-contrast-label");
};
const setBlackColor = (point) => {
    point.dataLabel.element.childNodes[0].style.fill = "#000";
    point.dataLabel.element.childNodes[0].style["text-shadow"] = "none";
    point.dataLabel.element.classList.remove("gd-contrast-label");
};
const setContrastColor = (point) => {
    point.dataLabel.element.childNodes[0].style.fill = "";
    point.dataLabel.element.childNodes[0].style["text-shadow"] = "none";
    point.dataLabel.element.classList.add("gd-contrast-label");
};
const changeDataLabelsColor = (condition, point) => condition ? setWhiteColor(point) : setContrastColor(point);
function getVisiblePointsWithLabel(chart) {
    return flatMap(getVisibleSeries(chart), (series) => series.points).filter((point) => point.dataLabel && point.graphic);
}
function setBarDataLabelsColor(chart) {
    const points = getVisiblePointsWithLabel(chart);
    return points.forEach((point) => {
        const labelDimensions = getDataLabelAttributes(point);
        const barDimensions = getShapeAttributes(point);
        const barRight = barDimensions.x + barDimensions.width;
        const barLeft = barDimensions.x;
        const labelLeft = labelDimensions.x;
        if (point.negative) {
            if (labelLeft > barLeft) {
                // labelRight is overlapping bar even it is outside of it
                setWhiteColor(point);
            }
            else {
                setContrastColor(point);
            }
        }
        else {
            if (labelLeft < barRight) {
                setWhiteColor(point);
            }
            else {
                setContrastColor(point);
            }
        }
    });
}
function setColumnDataLabelsColor(chart) {
    const points = getVisiblePointsWithLabel(chart);
    return points
        .filter((point) => point.shapeArgs) // skip if shapeArgs missing (such as line points in line/column combo chart)
        .forEach((point) => {
        const labelDimensions = getDataLabelAttributes(point);
        const columnDimensions = getShapeAttributes(point);
        const columnTop = columnDimensions.y + columnDimensions.height;
        const columnDown = columnDimensions.y;
        const labelDown = labelDimensions.y;
        if (point.negative) {
            changeDataLabelsColor(labelDown < columnDown, point);
        }
        else if (!isStacked(chart)) {
            changeDataLabelsColor(labelDown > columnTop, point);
        }
        else {
            changeDataLabelsColor(labelDown < columnTop, point);
        }
    });
}
export function isWhiteNotContrastEnough(color) {
    // to keep first 17 colors from our default palette with white labels
    const HIGHCHARTS_CONTRAST_THRESHOLD = 530;
    const { R, G, B } = parseRGBColorCode(color);
    const lightnessHCH = R + G + B;
    return lightnessHCH > HIGHCHARTS_CONTRAST_THRESHOLD;
}
function setContrastLabelsColor(chart) {
    const points = getVisiblePointsWithLabel(chart);
    return points.forEach((point) => {
        if (isWhiteNotContrastEnough(point.color)) {
            setBlackColor(point);
        }
        else {
            setWhiteColor(point);
        }
    });
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function extendDataLabelColors(Highcharts) {
    Highcharts.Chart.prototype.callbacks.push((chart) => {
        const type = getChartType(chart);
        const changeLabelColor = () => {
            if (type === VisualizationTypes.BAR) {
                setTimeout(() => {
                    setBarDataLabelsColor(chart);
                }, 500);
            }
            else if (isOneOfTypes(type, [
                VisualizationTypes.COLUMN,
                VisualizationTypes.PIE,
                VisualizationTypes.FUNNEL,
                VisualizationTypes.PYRAMID,
            ])) {
                setTimeout(() => {
                    setColumnDataLabelsColor(chart);
                }, 500);
            }
            else if (isOneOfTypes(type, [VisualizationTypes.HEATMAP, VisualizationTypes.TREEMAP])) {
                setContrastLabelsColor(chart);
            }
        };
        changeLabelColor();
        Highcharts.addEvent(chart, "redraw", changeLabelColor);
    });
}
//# sourceMappingURL=dataLabelsColors.js.map