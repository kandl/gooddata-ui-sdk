// (C) 2023 GoodData Corporation
import { isWaterfall } from "../_util/common.js";
export function getWaterfallXAxisConfiguration(chartOptions, _config, chartConfig) {
    var _a, _b;
    const { data, type } = chartOptions;
    if (!isWaterfall(type)) {
        return {};
    }
    const hasTotalMeasure = ((_b = (_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.total) === null || _a === void 0 ? void 0 : _a.measures) === null || _b === void 0 ? void 0 : _b.length) > 0;
    return {
        xAxis: [
            {
                categories: hasTotalMeasure ? undefined : data === null || data === void 0 ? void 0 : data.categories,
                type: "category",
            },
        ],
    };
}
//# sourceMappingURL=getWaterfallXAxisConfiguration.js.map