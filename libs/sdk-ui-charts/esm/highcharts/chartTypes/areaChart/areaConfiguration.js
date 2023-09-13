import { styleVariables } from "../_chartCreators/styles/variables.js";
const LINE_WIDTH = 3;
export function getAreaConfiguration(_config, _definition, theme) {
    var _a, _b, _c, _d, _e;
    const series = {
        type: "area",
        marker: {
            symbol: "circle",
            radius: 4.5,
            lineColor: (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _a === void 0 ? void 0 : _a.backgroundColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c0) !== null && _e !== void 0 ? _e : styleVariables.gdColorBackground,
        },
        lineWidth: LINE_WIDTH,
        fillOpacity: 0.6,
        states: {
            hover: {
                lineWidth: LINE_WIDTH + 1,
            },
        },
    };
    return {
        chart: {
            type: "area",
        },
        plotOptions: {
            area: {
                lineWidth: LINE_WIDTH,
            },
            series,
            column: {
                dataLabels: {},
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
}
//# sourceMappingURL=areaConfiguration.js.map