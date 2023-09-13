// (C) 2007-2021 GoodData Corporation
import cloneDeep from "lodash/cloneDeep.js";
import { MAX_POINT_WIDTH } from "../_chartCreators/commonConfiguration.js";
import { getCommonResponsiveConfig } from "../_chartCreators/responsive.js";
const BULLET_TEMPLATE = {
    chart: {
        type: "bar",
    },
    plotOptions: {
        bar: {
            maxPointWidth: MAX_POINT_WIDTH,
            dataLabels: {
                enabled: false,
            },
        },
        bullet: {
            maxPointWidth: MAX_POINT_WIDTH,
            tooltip: {
                followPointer: true,
            },
            targetOptions: {
                borderWidth: 0,
            },
        },
        series: {
            states: {
                hover: {
                    enabled: false,
                },
            },
            grouping: false,
            borderWidth: 0,
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
export function getBulletConfiguration(config) {
    const bulletConfiguration = cloneDeep(BULLET_TEMPLATE);
    if ((config === null || config === void 0 ? void 0 : config.enableCompactSize) && !(config === null || config === void 0 ? void 0 : config.zoomInsight)) {
        const reversed = true;
        return Object.assign(Object.assign({}, bulletConfiguration), { responsive: getCommonResponsiveConfig(reversed) });
    }
    return bulletConfiguration;
}
//# sourceMappingURL=bulletConfiguration.js.map