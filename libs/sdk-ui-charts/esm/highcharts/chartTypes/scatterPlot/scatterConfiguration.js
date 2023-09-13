import { styleVariables } from "../_chartCreators/styles/variables.js";
export const LINE_WIDTH = 3;
export function getScatterConfiguration(_config, _definition, theme) {
    var _a, _b, _c, _d, _e;
    return {
        chart: {
            type: "scatter",
        },
        plotOptions: {
            scatter: {
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
                states: {
                    hover: {
                        marker: {
                            enabled: false,
                        },
                    },
                },
            },
        },
        xAxis: [
            {
                startOnTick: true,
            },
        ],
        series: {
            lineWidth: LINE_WIDTH,
            fillOpacity: 0.3,
            states: {
                hover: {
                    lineWidth: LINE_WIDTH + 1,
                },
            },
        },
        legend: {
            enabled: false,
        },
    };
}
//# sourceMappingURL=scatterConfiguration.js.map