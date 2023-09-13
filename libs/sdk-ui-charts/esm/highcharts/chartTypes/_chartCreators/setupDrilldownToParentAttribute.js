// (C) 2007-2022 GoodData Corporation
import partial from "lodash/partial.js";
import { styleVariables } from "./styles/variables.js";
import { tickLabelClick } from "./drilldownEventing.js";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getDDPointsInParentTick(axis, tick) {
    const { startAt, leaves } = tick;
    const ddPoints = []; // drilldown points
    for (let i = startAt; i < startAt + leaves; i++) {
        const currentDDPoints = axis.getDDPoints(i);
        ddPoints.push(...currentDDPoints.filter((point) => !!point));
    }
    // replace y value by target value for bullet chart target
    return ddPoints.map((ddPoint) => {
        var _a, _b;
        if (((_b = (_a = ddPoint.series) === null || _a === void 0 ? void 0 : _a.userOptions) === null || _b === void 0 ? void 0 : _b.bulletChartMeasureType) === "target") {
            return Object.assign({}, ddPoint, { y: ddPoint.isNullTarget ? null : ddPoint.target });
        }
        return ddPoint;
    });
}
function setParentTickDrillable(drillConfig, target, chartType, tick, ddPoints) {
    // copy behavior 'Tick.prototype.drillable' from 'highcharts/module/drilldown.js'
    const label = tick.label;
    const drilldownStyle = {
        cursor: "pointer",
        color: styleVariables.gdColorText,
    };
    if (label && ddPoints && ddPoints.length) {
        if (!label.basicStyles) {
            label.basicStyles = Object.assign({}, label.styles);
        }
        label
            .addClass("highcharts-drilldown-axis-label")
            .css(drilldownStyle)
            .on("click", () => {
            tickLabelClick(drillConfig, ddPoints, target, chartType);
        });
    }
    else if (label === null || label === void 0 ? void 0 : label.basicStyles) {
        label.styles = {}; // reset for full overwrite of styles
        label.css(label.basicStyles);
        label.on("click", null);
    }
}
export function setupDrilldown(chart, chartType) {
    const xAxes = (chart === null || chart === void 0 ? void 0 : chart.xAxis) || [];
    const axis = xAxes[0];
    if (!axis) {
        return;
    }
    // not support chart without type
    if (!chartType) {
        return;
    }
    const { categoriesTree, userOptions: { drillConfig }, } = axis;
    const setParentTickDrillableFunc = partial(setParentTickDrillable, drillConfig, chart.container, chartType);
    (categoriesTree || []).forEach((categories) => {
        const { tick } = categories;
        if (!tick) {
            return;
        }
        const ddPoints = getDDPointsInParentTick(axis, tick);
        setParentTickDrillableFunc(tick, ddPoints);
    });
}
//# sourceMappingURL=setupDrilldownToParentAttribute.js.map