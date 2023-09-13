// (C) 2020-2022 GoodData Corporation
import { getOccupiedMeasureBucketsLocalIdentifiers, isComparativeSeries, isPrimarySeries, isTargetSeries, } from "./bulletChartSeries.js";
import { isColorFromPalette, isRgbColor, } from "@gooddata/sdk-model";
import { isDarkTheme } from "@gooddata/sdk-ui-theme-provider";
import { findMeasureGroupInDimensions } from "../_util/executionResultHelper.js";
import { ColorStrategy, isValidMappedColor, getColorByGuid, getColorFromMapping, getLighterColorFromRGB, getRgbStringFromRGB, normalizeColorToRGB, parseRGBString, } from "@gooddata/sdk-ui-vis-commons";
import { DEFAULT_BULLET_GRAY_COLOR } from "../_util/color.js";
class BulletChartColorStrategy extends ColorStrategy {
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _stackByAttribute, dv) {
        const occupiedMeasureBucketsLocalIdentifiers = getOccupiedMeasureBucketsLocalIdentifiers(dv);
        const measureGroup = findMeasureGroupInDimensions(dv.meta().dimensions());
        const defaultColorsAssignment = this.getDefaultColorAssignment(colorPalette, measureGroup, occupiedMeasureBucketsLocalIdentifiers);
        const colorAssignment = measureGroup.items.map((headerItem) => {
            const color = this.mapMeasureColor(headerItem, colorPalette, colorMapping, dv, defaultColorsAssignment);
            return {
                headerItem,
                color,
            };
        });
        return {
            fullColorAssignment: colorAssignment,
        };
    }
    createPalette(colorPalette, colorAssignments) {
        return colorAssignments
            .map((colorAssignment, index) => {
            if (isRgbColor(colorAssignment.color)) {
                return colorAssignment.color.value;
            }
            else if (isColorFromPalette(colorAssignment.color)) {
                return getColorByGuid(colorPalette, colorAssignment.color.value, index);
            }
        })
            .filter(Boolean)
            .map((color) => getRgbStringFromRGB(color));
    }
    mapMeasureColor(headerItem, colorPalette, colorMapping, dv, defaultColorsAssignment) {
        const mappedColor = getColorFromMapping(headerItem, colorMapping, dv);
        if (isValidMappedColor(mappedColor, colorPalette)) {
            return mappedColor;
        }
        const defaultColorAssignment = defaultColorsAssignment.find((colorAssignment) => colorAssignment.headerItem.measureHeaderItem.localIdentifier ===
            headerItem.measureHeaderItem.localIdentifier);
        return defaultColorAssignment.color;
    }
    getDefaultColorAssignment(colorPalette, measureGroup, occupiedMeasureBucketsLocalIdentifiers) {
        return measureGroup.items.map((headerItem, index) => {
            var _a, _b, _c, _d, _e;
            const color = (isPrimarySeries(index, occupiedMeasureBucketsLocalIdentifiers) && {
                type: "guid",
                value: colorPalette[0].guid,
            }) ||
                (isTargetSeries(index, occupiedMeasureBucketsLocalIdentifiers) && {
                    type: "rgb",
                    value: getLighterColorFromRGB(colorPalette[0].fill, isDarkTheme(this.theme) ? 0.5 : -0.3),
                }) ||
                (isComparativeSeries(index, occupiedMeasureBucketsLocalIdentifiers) && {
                    type: "rgb",
                    value: ((_b = (_a = this.theme) === null || _a === void 0 ? void 0 : _a.palette) === null || _b === void 0 ? void 0 : _b.complementary)
                        ? parseRGBString(normalizeColorToRGB((_e = (_d = (_c = this.theme) === null || _c === void 0 ? void 0 : _c.palette) === null || _d === void 0 ? void 0 : _d.complementary) === null || _e === void 0 ? void 0 : _e.c2))
                        : DEFAULT_BULLET_GRAY_COLOR,
                });
            return {
                headerItem,
                color,
            };
        });
    }
}
export default BulletChartColorStrategy;
//# sourceMappingURL=bulletChartColoring.js.map