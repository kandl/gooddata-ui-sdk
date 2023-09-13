import { isBarChart } from "../_util/common.js";
import { ALIGN_LEFT, ALIGN_RIGHT, BOTTOM_AXIS_MARGIN, ROTATE_60_DEGREES, ROTATE_90_DEGREES, ROTATE_NEGATIVE_60_DEGREES, ROTATE_NEGATIVE_90_DEGREES, } from "../../constants/axisLabel.js";
function getLabelOptions(index, aligns) {
    const isOppositeAxis = index === 1;
    const align = aligns[index];
    const y = isOppositeAxis ? undefined : BOTTOM_AXIS_MARGIN;
    return {
        labels: {
            align,
            y,
        },
    };
}
export function getAxisLabelConfigurationForDualBarChart(chartOptions) {
    const { type, yAxes = [] } = chartOptions;
    const isBar = isBarChart(type);
    const isDualAxis = yAxes.length === 2;
    const isDualAxisBarChart = isBar && isDualAxis;
    if (!isDualAxisBarChart) {
        return {};
    }
    const { yAxisProps, secondary_yAxisProps } = chartOptions;
    const yAxesConfig = [yAxisProps, secondary_yAxisProps].map((axis = {}, index) => {
        const { rotation } = axis;
        switch (rotation) {
            case ROTATE_60_DEGREES:
            case ROTATE_90_DEGREES:
                return getLabelOptions(index, [ALIGN_RIGHT, ALIGN_LEFT]);
            case ROTATE_NEGATIVE_60_DEGREES:
            case ROTATE_NEGATIVE_90_DEGREES:
                return getLabelOptions(index, [ALIGN_LEFT, ALIGN_RIGHT]);
            default:
                return undefined;
        }
    });
    return {
        yAxis: yAxesConfig, // yAxis in UI SDK is xaxis in Highcharts for bar chart
    };
}
//# sourceMappingURL=getAxisLabelConfigurationForDualBarChart.js.map