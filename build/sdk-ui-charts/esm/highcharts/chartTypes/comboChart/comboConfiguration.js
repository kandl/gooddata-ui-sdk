// (C) 2007-2022 GoodData Corporation
import { MAX_POINT_WIDTH } from "../_chartCreators/commonConfiguration.js";
import { LINE_WIDTH } from "../lineChart/lineConfiguration.js";
import { isLineChart } from "../_util/common.js";
import { BucketNames, VisualizationTypes } from "@gooddata/sdk-ui";
import { bucketIsEmpty, bucketsFind } from "@gooddata/sdk-model";
import { styleVariables } from "../_chartCreators/styles/variables.js";
const { COLUMN, LINE } = VisualizationTypes;
function getDefaultComboTypes(config) {
    var _a, _b;
    return {
        primaryChartType: (_a = config === null || config === void 0 ? void 0 : config.primaryChartType) !== null && _a !== void 0 ? _a : COLUMN,
        secondaryChartType: (_b = config === null || config === void 0 ? void 0 : config.secondaryChartType) !== null && _b !== void 0 ? _b : LINE,
    };
}
export function getDefaultChartType(config) {
    const { primaryChartType, secondaryChartType } = getDefaultComboTypes(config);
    if (primaryChartType === secondaryChartType) {
        return primaryChartType;
    }
    if (primaryChartType === COLUMN || secondaryChartType === COLUMN) {
        return COLUMN;
    }
    return LINE;
}
function isOnlyLineSeries(config, definition) {
    const { primaryChartType, secondaryChartType } = getDefaultComboTypes(config);
    const buckets = definition ? definition.buckets : [];
    const primaryBucket = bucketsFind(buckets, BucketNames.MEASURES);
    const secondaryBucket = bucketsFind(buckets, BucketNames.SECONDARY_MEASURES);
    const isEmptyPrimaryMeasure = !primaryBucket || bucketIsEmpty(primaryBucket);
    const isEmptySecondaryMeasure = !secondaryBucket || bucketIsEmpty(secondaryBucket);
    const isLineChartOnLeftAxis = isLineChart(primaryChartType);
    const isLineChartOnRightAxis = isLineChart(secondaryChartType);
    return ((isLineChartOnLeftAxis && isLineChartOnRightAxis) ||
        (isLineChartOnLeftAxis && isEmptySecondaryMeasure) ||
        (isEmptyPrimaryMeasure && isLineChartOnRightAxis));
}
export function getComboConfiguration(config, definition, theme) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const series = isOnlyLineSeries(config, definition)
        ? {
            series: {
                states: {
                    inactive: {
                        opacity: 1,
                    },
                },
                borderColor: "#00000000",
            },
        }
        : {
            series: {
                borderColor: "#00000000",
            },
        };
    return {
        chart: {
            type: getDefaultChartType(config),
            spacingTop: 20,
        },
        plotOptions: Object.assign({ column: {
                dataLabels: {
                    enabled: true,
                    crop: false,
                    overflow: "none",
                    padding: 2,
                },
                maxPointWidth: MAX_POINT_WIDTH,
                borderColor: "#00000000",
            }, line: {
                marker: {
                    symbol: "circle",
                    radius: 4.5,
                    lineColor: (_e = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _a === void 0 ? void 0 : _a.backgroundColor) !== null && _b !== void 0 ? _b : (_d = (_c = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _c === void 0 ? void 0 : _c.complementary) === null || _d === void 0 ? void 0 : _d.c0) !== null && _e !== void 0 ? _e : styleVariables.gdColorBackground,
                },
                lineWidth: LINE_WIDTH,
                fillOpacity: 0.3,
                stickyTracking: false,
                states: {
                    hover: {
                        lineWidth: LINE_WIDTH + 1,
                    },
                },
                dataLabels: {
                    style: {
                        fontWeight: "normal",
                    },
                },
            }, area: {
                marker: {
                    symbol: "circle",
                    radius: 4.5,
                    lineColor: (_k = (_g = (_f = theme === null || theme === void 0 ? void 0 : theme.chart) === null || _f === void 0 ? void 0 : _f.backgroundColor) !== null && _g !== void 0 ? _g : (_j = (_h = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _h === void 0 ? void 0 : _h.complementary) === null || _j === void 0 ? void 0 : _j.c0) !== null && _k !== void 0 ? _k : styleVariables.gdColorBackground,
                },
                lineWidth: LINE_WIDTH,
                fillOpacity: 0.6,
                stickyTracking: false,
                states: {
                    hover: {
                        lineWidth: LINE_WIDTH + 1,
                    },
                },
            } }, series),
    };
}
//# sourceMappingURL=comboConfiguration.js.map