// (C) 2007-2021 GoodData Corporation
import merge from "lodash/merge.js";
import { getPieConfiguration } from "../pieChart/pieConfiguration.js";
import { alignChart } from "../_chartCreators/helpers.js";
export function getDonutConfiguration(config) {
    return merge({}, getPieConfiguration(config), {
        chart: {
            events: {
                load() {
                    var _a, _b, _c, _d, _e;
                    this.series[0].update({
                        dataLabels: {
                            distance: -(((_d = (_c = (_b = (_a = this.series[0].points) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.shapeArgs) === null || _c === void 0 ? void 0 : _c.r) !== null && _d !== void 0 ? _d : 40) * 0.25),
                        },
                    });
                    alignChart(this, (_e = config.chart) === null || _e === void 0 ? void 0 : _e.verticalAlign);
                },
            },
        },
        plotOptions: {
            pie: {
                innerSize: "50%",
            },
        },
    });
}
//# sourceMappingURL=donutConfiguration.js.map