import { styleVariables } from "../_chartCreators/styles/variables.js";
export function getBubbleConfiguration(_config, _definition, theme) {
    var _a, _b, _c, _d, _e;
    const series = [
        {
            type: "bubble",
            states: {
                hover: {
                    enabled: false,
                },
            },
        },
    ];
    return {
        chart: {
            type: "bubble",
        },
        plotOptions: {
            bubble: {
                stickyTracking: false,
                marker: {
                    symbol: "circle",
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _a === void 0 ? void 0 : _a.backgroundColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c0) !== null && _e !== void 0 ? _e : styleVariables.gdColorBackground,
                        },
                    },
                },
                dataLabels: {
                    enabled: false,
                    allowOverlap: false,
                },
            },
        },
        xAxis: [
            {
                startOnTick: true,
            },
        ],
        series,
        legend: {
            enabled: false,
        },
    };
}
//# sourceMappingURL=bubbleConfiguration.js.map