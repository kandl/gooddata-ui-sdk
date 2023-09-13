import { alignChart } from "../_chartCreators/helpers.js";
import { getPieResponsiveConfig } from "../_chartCreators/responsive.js";
export function getPieConfiguration(config) {
    const pieConfiguration = {
        chart: {
            type: "pie",
            events: {
                load() {
                    var _a, _b, _c, _d, _e;
                    const distance = -(((_d = (_c = (_b = (_a = this.series[0].points) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.shapeArgs) === null || _c === void 0 ? void 0 : _c.r) !== null && _d !== void 0 ? _d : 30) / 3);
                    const options = {
                        type: "pie",
                        dataLabels: {
                            distance,
                        },
                    };
                    this.series[0].update(options);
                    alignChart(this, (_e = config.chart) === null || _e === void 0 ? void 0 : _e.verticalAlign);
                },
            },
        },
        plotOptions: {
            pie: {
                size: "100%",
                allowPointSelect: false,
                dataLabels: {
                    enabled: false,
                },
                showInLegend: true,
            },
        },
        legend: {
            enabled: false,
        },
    };
    if (config === null || config === void 0 ? void 0 : config.enableCompactSize) {
        return Object.assign(Object.assign({}, pieConfiguration), { responsive: getPieResponsiveConfig() });
    }
    return pieConfiguration;
}
//# sourceMappingURL=pieConfiguration.js.map