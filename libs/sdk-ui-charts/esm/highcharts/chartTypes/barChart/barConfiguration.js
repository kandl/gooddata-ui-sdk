// (C) 2007-2022 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import { MAX_POINT_WIDTH } from "../_chartCreators/commonConfiguration.js";
import { getCommonResponsiveConfig } from "../_chartCreators/responsive.js";
import { getAxesCounts } from "../_util/common.js";
const BAR_TEMPLATE = {
    chart: {
        type: "bar",
    },
    plotOptions: {
        bar: {
            maxPointWidth: MAX_POINT_WIDTH,
            dataLabels: {
                enabled: true,
                padding: 2,
            },
        },
        series: {
            states: {
                hover: {
                    enabled: false,
                },
            },
        },
    },
    yAxis: [
        {
            stackLabels: {
                enabled: false,
            },
        },
    ],
};
export function getBarConfiguration(config) {
    const barConfiguration = cloneDeep(BAR_TEMPLATE);
    if ((config === null || config === void 0 ? void 0 : config.enableCompactSize) && !(config === null || config === void 0 ? void 0 : config.zoomInsight)) {
        const reversed = true;
        const [xAxesCount, yAxesCount] = getAxesCounts(config);
        return Object.assign(Object.assign({}, barConfiguration), { responsive: getCommonResponsiveConfig(reversed, xAxesCount, yAxesCount) });
    }
    return barConfiguration;
}
//# sourceMappingURL=barConfiguration.js.map