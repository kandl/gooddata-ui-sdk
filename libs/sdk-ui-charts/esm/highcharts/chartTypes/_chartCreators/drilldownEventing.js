// (C) 2007-2023 GoodData Corporation
import debounce from "lodash/debounce.js";
import cloneDeep from "lodash/cloneDeep.js";
import { invariant } from "ts-invariant";
import { getVisualizationType, VisualizationTypes, } from "@gooddata/sdk-ui";
import { isBulletChart, isComboChart, isHeatmap, isTreemap } from "../_util/common.js";
import { isGroupHighchartsDrillEvent } from "./isGroupHighchartsDrillEvent.js";
export function getClickableElementNameByChartType(type) {
    switch (type) {
        case VisualizationTypes.LINE:
        case VisualizationTypes.AREA:
        case VisualizationTypes.SCATTER:
        case VisualizationTypes.BUBBLE:
            return "point";
        case VisualizationTypes.COLUMN:
        case VisualizationTypes.BAR:
        case VisualizationTypes.WATERFALL:
            return "bar";
        case VisualizationTypes.PIE:
        case VisualizationTypes.TREEMAP:
        case VisualizationTypes.DONUT:
        case VisualizationTypes.FUNNEL:
        case VisualizationTypes.PYRAMID:
        case VisualizationTypes.DEPENDENCY_WHEEL:
        case VisualizationTypes.SANKEY:
            return "slice";
        case VisualizationTypes.HEATMAP:
            return "cell";
        default:
            invariant(false, `Unknown visualization type: ${type}`);
            return null;
    }
}
function fireEvent(onDrill, data, target) {
    const returnValue = onDrill(data);
    // if user-specified onDrill fn returns false, do not fire default DOM event
    if (returnValue !== false) {
        const event = new CustomEvent("drill", {
            detail: data,
            bubbles: true,
        });
        target.dispatchEvent(event);
    }
}
const getElementChartType = (chartType, point) => {
    var _a, _b;
    return (_b = (_a = point === null || point === void 0 ? void 0 : point.series) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : chartType;
};
const getDrillPointCustomProps = (point, chartType) => {
    var _a, _b, _c;
    if (isComboChart(chartType)) {
        return { type: (_a = point === null || point === void 0 ? void 0 : point.series) === null || _a === void 0 ? void 0 : _a.type };
    }
    if (isBulletChart(chartType)) {
        return { type: (_c = (_b = point === null || point === void 0 ? void 0 : point.series) === null || _b === void 0 ? void 0 : _b.userOptions) === null || _c === void 0 ? void 0 : _c.bulletChartMeasureType };
    }
    return {};
};
const getYValueForBulletChartTarget = (point) => {
    if (point.isNullTarget) {
        return null;
    }
    return point.target;
};
function composeDrillContextGroup(points, chartType) {
    const sanitizedPoints = sanitizeContextPoints(chartType, points);
    const contextPoints = sanitizedPoints.map((point) => {
        const elementChartType = getElementChartType(chartType, point);
        const customProps = getDrillPointCustomProps(point, chartType);
        return Object.assign({ x: point.x, y: elementChartType === "bullet" ? getYValueForBulletChartTarget(point) : point.y, intersection: point.drillIntersection }, customProps);
    });
    return {
        type: chartType,
        element: "label",
        points: contextPoints,
    };
}
function getClickableElementNameForBulletChart(point) {
    return point.series.userOptions.bulletChartMeasureType;
}
function composeDrillContextPoint(point, chartType) {
    const zProp = isNaN(point.z) ? {} : { z: point.z };
    const valueProp = isTreemap(chartType) || isHeatmap(chartType)
        ? {
            value: point.value ? point.value.toString() : "",
        }
        : {};
    const elementChartType = getElementChartType(chartType, point);
    const xyProp = isTreemap(chartType)
        ? {}
        : {
            x: point.x,
            y: elementChartType === "bullet" ? point.target : point.y,
        };
    const customProp = isComboChart(chartType)
        ? {
            elementChartType,
        }
        : {};
    return Object.assign(Object.assign(Object.assign(Object.assign({ type: chartType, element: isBulletChart(chartType)
            ? getClickableElementNameForBulletChart(point)
            : getClickableElementNameByChartType(elementChartType), intersection: point.drillIntersection }, xyProp), zProp), valueProp), customProp);
}
const chartClickDebounced = debounce((drillConfig, event, target, chartType) => {
    const { dataView, onDrill } = drillConfig;
    const type = getVisualizationType(chartType);
    let drillContext;
    if (isGroupHighchartsDrillEvent(event)) {
        const points = event.points;
        drillContext = composeDrillContextGroup(points, type);
    }
    else {
        const point = event.point;
        drillContext = composeDrillContextPoint(point, type);
    }
    const data = {
        dataView,
        drillContext,
    };
    fireEvent(onDrill, data, target);
});
export function chartClick(drillConfig, event, target, chartType) {
    chartClickDebounced(drillConfig, event, target, chartType);
}
const tickLabelClickDebounce = debounce((drillConfig, points, target, chartType) => {
    const { dataView, onDrill } = drillConfig;
    const sanitizedPoints = sanitizeContextPoints(chartType, points);
    const contextPoints = sanitizedPoints.map((point) => {
        var _a, _b;
        const customProps = isBulletChart(chartType)
            ? { type: (_b = (_a = point === null || point === void 0 ? void 0 : point.series) === null || _a === void 0 ? void 0 : _a.userOptions) === null || _b === void 0 ? void 0 : _b.bulletChartMeasureType }
            : {};
        return Object.assign({ x: point.x, y: point.y, intersection: cloneDeep(point.drillIntersection) }, customProps);
    });
    const drillContext = {
        type: chartType,
        element: "label",
        points: contextPoints,
    };
    const data = {
        dataView,
        drillContext,
    };
    fireEvent(onDrill, data, target);
});
function sanitizeContextPoints(chartType, points) {
    if (isHeatmap(chartType)) {
        return points.filter((point) => !point.ignoredInDrillEventContext);
    }
    return points;
}
export function tickLabelClick(drillConfig, points, target, chartType) {
    tickLabelClickDebounce(drillConfig, points, target, chartType);
}
//# sourceMappingURL=drilldownEventing.js.map