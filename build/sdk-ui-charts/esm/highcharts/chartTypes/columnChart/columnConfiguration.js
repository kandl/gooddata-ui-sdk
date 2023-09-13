import { getCommonResponsiveConfig } from "../_chartCreators/responsive.js";
import { MAX_POINT_WIDTH } from "../_chartCreators/commonConfiguration.js";
import { getAxesCounts } from "../_util/common.js";
export function getColumnConfiguration(config, _definition, theme) {
    var _a, _b, _c;
    const columnConfiguration = {
        chart: {
            type: "column",
            spacingTop: 20,
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true,
                    padding: 2,
                },
                maxPointWidth: MAX_POINT_WIDTH,
            },
            series: {
                states: {
                    hover: {
                        enabled: false,
                    },
                },
            },
        },
        yAxis: [
            {
                stackLabels: Object.assign({ enabled: true, allowOverlap: false }, (((_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) && {
                    style: {
                        color: (_c = (_b = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _b === void 0 ? void 0 : _b.complementary) === null || _c === void 0 ? void 0 : _c.c9,
                        textOutline: "none",
                    },
                })),
            },
        ],
    };
    if ((config === null || config === void 0 ? void 0 : config.enableCompactSize) && !(config === null || config === void 0 ? void 0 : config.zoomInsight)) {
        const [xAxesCount, yAxesCount] = getAxesCounts(config);
        return Object.assign(Object.assign({}, columnConfiguration), { responsive: getCommonResponsiveConfig(false, xAxesCount, yAxesCount) });
    }
    return columnConfiguration;
}
//# sourceMappingURL=columnConfiguration.js.map