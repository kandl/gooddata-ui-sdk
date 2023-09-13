import { styleVariables } from "../_chartCreators/styles/variables.js";
import { getCommonResponsiveConfig } from "../_chartCreators/responsive.js";
import { getAxesCounts } from "../_util/common.js";
export const LINE_WIDTH = 3;
export function getLineConfiguration(config, _definition, theme) {
    var _a, _b, _c, _d, _e;
    const lineConfiguration = {
        chart: {
            type: "line",
        },
        plotOptions: {
            series: {
                marker: {
                    symbol: "circle",
                    radius: 4.5,
                    lineColor: (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _a === void 0 ? void 0 : _a.backgroundColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c0) !== null && _e !== void 0 ? _e : styleVariables.gdColorBackground,
                },
                lineWidth: LINE_WIDTH,
                fillOpacity: 0.3,
                states: {
                    hover: {
                        lineWidth: LINE_WIDTH + 1,
                    },
                    inactive: {
                        opacity: 1,
                    },
                },
            },
            column: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        xAxis: [
            {
                categories: [],
            },
        ],
        yAxis: [
            {
                stackLabels: {
                    enabled: false,
                },
            },
        ],
    };
    if ((config === null || config === void 0 ? void 0 : config.enableCompactSize) && !(config === null || config === void 0 ? void 0 : config.zoomInsight)) {
        const [xAxesCount, yAxesCount] = getAxesCounts(config);
        return Object.assign(Object.assign({}, lineConfiguration), { responsive: getCommonResponsiveConfig(false, xAxesCount, yAxesCount) });
    }
    return lineConfiguration;
}
//# sourceMappingURL=lineConfiguration.js.map