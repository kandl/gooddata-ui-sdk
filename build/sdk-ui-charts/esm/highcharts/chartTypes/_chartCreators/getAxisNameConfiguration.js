import { VisualizationTypes } from "@gooddata/sdk-ui";
import { isOneOfTypes } from "../_util/common.js";
import { ROTATE_NEGATIVE_90_DEGREES, ALIGN_LEFT, ALIGN_RIGHT } from "../../constants/axisLabel.js";
const axisNameConfigGetter = (chartOptions) => (axisNamePrefix) => {
    var _a;
    return ((_a = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[`${axisNamePrefix}Axes`]) !== null && _a !== void 0 ? _a : []).map((axis) => {
        if (!axis) {
            return {};
        }
        return {
            title: getHighchartsAxisTitleConfiguration(chartOptions, axis, axisNamePrefix),
        };
    });
};
function getHighchartsAxisTitleConfiguration(chartOptions, axis, axisNamePrefix) {
    var _a, _b, _c;
    const isYAxis = axisNamePrefix === "y";
    const opposite = (_a = axis === null || axis === void 0 ? void 0 : axis.opposite) !== null && _a !== void 0 ? _a : false;
    const axisPropsKey = (opposite ? `secondary_${axisNamePrefix}AxisProps` : `${axisNamePrefix}AxisProps`);
    const axisNameConfig = (_c = (_b = chartOptions === null || chartOptions === void 0 ? void 0 : chartOptions[axisPropsKey]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : {};
    const title = {};
    if (axisNameConfig.position) {
        title.align = axisNameConfig.position; // low | middle | high
    }
    // config.visible should be true/undefined by default
    if (axisNameConfig.visible === false) {
        title.text = "";
    }
    // opposite Y axis in combo, column and line chart
    // should be rotated the same way as its counterpart
    // and text alignment reversed from default
    if (opposite &&
        isYAxis &&
        isOneOfTypes(chartOptions.type, [
            VisualizationTypes.COMBO,
            VisualizationTypes.COMBO2,
            VisualizationTypes.COLUMN,
            VisualizationTypes.LINE,
        ])) {
        title.rotation = Number(ROTATE_NEGATIVE_90_DEGREES);
        if (title.align === "low") {
            title.textAlign = ALIGN_LEFT;
        }
        else if (title.align === "high") {
            title.textAlign = ALIGN_RIGHT;
        }
    }
    return title;
}
export function getAxisNameConfiguration(chartOptions) {
    const configGetter = axisNameConfigGetter(chartOptions);
    return {
        xAxis: configGetter("x"),
        yAxis: configGetter("y"),
    };
}
//# sourceMappingURL=getAxisNameConfiguration.js.map