import { GRAY, TRANSPARENT, WHITE } from "../_util/color.js";
import { parseValue, unwrap } from "../_util/common.js";
import isNil from "lodash/isNil.js";
const getNullColor = (theme) => {
    var _a, _b, _c, _d, _e, _f;
    return ({
        pattern: {
            path: {
                d: "M 10 0 L 0 10 M 9 11 L 11 9 M 4 11 L 11 4 M -1 1 L 1 -1 M -1 6 L 6 -1",
                stroke: (_c = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c4) !== null && _c !== void 0 ? _c : GRAY,
                strokeWidth: 1,
                fill: (_f = (_e = (_d = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _d === void 0 ? void 0 : _d.complementary) === null || _e === void 0 ? void 0 : _e.c0) !== null && _f !== void 0 ? _f : WHITE,
            },
            width: 10,
            height: 10,
        },
    });
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getHeatmapSeries(dv, measureGroup, theme) {
    const nullColor = getNullColor(theme);
    const data = [];
    dv.rawData()
        .twoDimData()
        .forEach((rowItem, rowItemIndex) => {
        rowItem.forEach((columnItem, columnItemIndex) => {
            var _a, _b, _c;
            const value = parseValue(String(columnItem));
            const pointData = { x: columnItemIndex, y: rowItemIndex, value };
            if (isNil(value)) {
                data.push(Object.assign(Object.assign({}, pointData), { 
                    // with latest highcharts version 9.3.0 it was adding border on null values
                    // set border width as 0 to have it as it was on previous versions
                    borderWidth: 0, borderColor: (_c = (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.palette) === null || _a === void 0 ? void 0 : _a.complementary) === null || _b === void 0 ? void 0 : _b.c4) !== null && _c !== void 0 ? _c : GRAY, color: TRANSPARENT }));
                data.push(Object.assign(Object.assign({}, pointData), { borderWidth: 0, pointPadding: 2, color: nullColor, 
                    // ignoredInDrillEventContext flag is used internally, not related to Highchart
                    // to check and remove this null-value point in drill message
                    ignoredInDrillEventContext: true }));
            }
            else {
                data.push(pointData);
            }
        });
    });
    return [
        {
            name: measureGroup.items[0].measureHeaderItem.name,
            data,
            turboThreshold: 0,
            yAxis: 0,
            dataLabels: {
                formatGD: unwrap(measureGroup.items[0]).format,
            },
            legendIndex: 0,
            seriesIndex: 0,
        },
    ];
}
//# sourceMappingURL=heatmapChartSeries.js.map