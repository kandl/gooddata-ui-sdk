// (C) 2019-2020 GoodData Corporation
import { VisualizationTypes } from "@gooddata/sdk-ui";
export const AXIS = {
    PRIMARY: "primary",
    SECONDARY: "secondary",
    DUAL: "dual",
};
export var AXIS_NAME;
(function (AXIS_NAME) {
    AXIS_NAME["X"] = "xaxis";
    AXIS_NAME["Y"] = "yaxis";
    AXIS_NAME["SECONDARY_X"] = "secondary_xaxis";
    AXIS_NAME["SECONDARY_Y"] = "secondary_yaxis";
})(AXIS_NAME || (AXIS_NAME = {}));
export const DUAL_AXES_SUPPORTED_CHARTS = [
    VisualizationTypes.COLUMN,
    VisualizationTypes.BAR,
    VisualizationTypes.LINE,
    VisualizationTypes.COMBO,
];
const BASE_X_AXIS = {
    name: AXIS_NAME.X,
    title: "properties.xaxis.title",
    subtitle: "",
    primary: false,
};
const BASE_Y_AXIS = {
    name: AXIS_NAME.Y,
    title: "properties.yaxis.title",
    subtitle: "",
    primary: true,
};
const BASE_SECONDARY_Y_AXIS = Object.assign(Object.assign({}, BASE_Y_AXIS), { name: AXIS_NAME.SECONDARY_Y });
const BAR_X_AXIS = Object.assign(Object.assign({}, BASE_X_AXIS), { primary: true });
const BAR_SECONDARY_X_AXIS = Object.assign(Object.assign({}, BASE_X_AXIS), { name: AXIS_NAME.SECONDARY_X, primary: true });
const BAR_Y_AXIS = Object.assign(Object.assign({}, BASE_Y_AXIS), { primary: false });
export const BASE_CHART_AXIS_CONFIG = {
    [AXIS.PRIMARY]: [BASE_X_AXIS, BASE_Y_AXIS],
    [AXIS.SECONDARY]: [BASE_X_AXIS, BASE_SECONDARY_Y_AXIS],
    [AXIS.DUAL]: [
        BASE_X_AXIS,
        Object.assign(Object.assign({}, BASE_Y_AXIS), { subtitle: "properties.axis.left" }),
        Object.assign(Object.assign({}, BASE_SECONDARY_Y_AXIS), { subtitle: "properties.axis.right" }),
    ],
};
export const BAR_CHART_AXIS_CONFIG = {
    [AXIS.PRIMARY]: [BAR_X_AXIS, BAR_Y_AXIS],
    [AXIS.SECONDARY]: [BAR_SECONDARY_X_AXIS, BAR_Y_AXIS],
    [AXIS.DUAL]: [
        Object.assign(Object.assign({}, BAR_SECONDARY_X_AXIS), { subtitle: "properties.axis.top" }),
        Object.assign(Object.assign({}, BAR_X_AXIS), { subtitle: "properties.axis.bottom" }),
        BAR_Y_AXIS,
    ],
};
//# sourceMappingURL=axis.js.map