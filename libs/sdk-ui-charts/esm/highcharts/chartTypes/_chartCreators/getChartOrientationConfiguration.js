// (C) 2023 GoodData Corporation
import { isWaterfall } from "../_util/common.js";
function shortenXAxisLabel(xAxis) {
    var _a;
    if (!((_a = xAxis === null || xAxis === void 0 ? void 0 : xAxis[0]) === null || _a === void 0 ? void 0 : _a.categories) || !xAxis[0].categories.some((item) => item.length >= 50)) {
        return {};
    }
    return {
        xAxis: [
            {
                labels: {
                    useHTML: true,
                    style: {
                        width: 200,
                        textOverflow: "ellipsis",
                    },
                },
            },
        ],
    };
}
export function getChartOrientationConfiguration(chartOptions, config, chartConfig) {
    var _a;
    const { type } = chartOptions;
    const isInverted = ((_a = chartConfig === null || chartConfig === void 0 ? void 0 : chartConfig.orientation) === null || _a === void 0 ? void 0 : _a.position) === "vertical";
    if (!isWaterfall(type) || !isInverted) {
        return {};
    }
    return Object.assign({ chart: {
            inverted: isInverted,
        }, plotOptions: {
            waterfall: {
                dataLabels: Object.assign(Object.assign({}, config.plotOptions.waterfall.dataLabels), { crop: false, overflow: "allow", inside: false, verticalAlign: "middle", y: 0 }),
            },
        } }, shortenXAxisLabel(config.xAxis));
}
//# sourceMappingURL=getChartOrientationConfiguration.js.map