import { MAX_POINT_WIDTH } from "../_chartCreators/commonConfiguration.js";
import { getCommonResponsiveConfig } from "../_chartCreators/responsive.js";
import { getAxesCounts } from "../_util/common.js";
export function getWaterfallConfiguration(config) {
    const waterfallConfiguration = {
        chart: {
            type: "waterfall",
        },
        plotOptions: {
            waterfall: {
                maxPointWidth: MAX_POINT_WIDTH,
                dataLabels: {
                    enabled: true,
                    padding: 2,
                    verticalAlign: "top",
                    y: -20,
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
        legend: {
            enabled: false,
        },
    };
    return !(config === null || config === void 0 ? void 0 : config.enableCompactSize)
        ? waterfallConfiguration
        : Object.assign(Object.assign({}, waterfallConfiguration), { responsive: getCommonResponsiveConfig(false, ...getAxesCounts(config)) });
}
//# sourceMappingURL=waterfallConfiguration.js.map