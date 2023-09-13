// (C) 2020-2022 GoodData Corporation
import { ColorStrategy, getColorByGuid, getColorFromMapping, getRgbStringFromRGB, isCustomPalette, normalizeColorToRGB, } from "@gooddata/sdk-ui-vis-commons";
import { isColorFromPalette, isRgbColor } from "@gooddata/sdk-model";
import { isDarkTheme } from "@gooddata/sdk-ui-theme-provider";
import { findMeasureGroupInDimensions } from "../_util/executionResultHelper.js";
import range from "lodash/range.js";
import isEqual from "lodash/isEqual.js";
import { DEFAULT_HEATMAP_BLUE_BASE_COLOR, DEFAULT_HEATMAP_BLUE_COLOR, HEATMAP_BLUE_COLOR_PALETTE, } from "../_util/color.js";
import { darken, mix, saturate } from "polished";
export class HeatmapColorStrategy extends ColorStrategy {
    getColorByIndex(index) {
        return this.palette[index % this.palette.length];
    }
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _stackByAttribute, dv) {
        let mappedColor;
        let colorAssignment;
        const measureGroup = findMeasureGroupInDimensions(dv.meta().dimensions());
        const headerItem = measureGroup === null || measureGroup === void 0 ? void 0 : measureGroup.items[0];
        if (colorMapping) {
            mappedColor = getColorFromMapping(headerItem, colorMapping, dv);
            if (mappedColor) {
                colorAssignment = [
                    {
                        headerItem,
                        color: mappedColor,
                    },
                ];
            }
        }
        colorAssignment = colorAssignment || this.getDefaultColorAssignment(colorPalette, headerItem);
        return {
            fullColorAssignment: colorAssignment,
            outputColorAssignment: colorAssignment,
        };
    }
    getThemeBackgroundColor() {
        var _a, _b, _c, _d, _e, _f;
        return (_c = (_b = (_a = this.theme) === null || _a === void 0 ? void 0 : _a.chart) === null || _b === void 0 ? void 0 : _b.backgroundColor) !== null && _c !== void 0 ? _c : (_f = (_e = (_d = this.theme) === null || _d === void 0 ? void 0 : _d.palette) === null || _e === void 0 ? void 0 : _e.complementary) === null || _f === void 0 ? void 0 : _f.c0;
    }
    getBackgroundColor() {
        var _a;
        return (_a = this.getThemeBackgroundColor()) !== null && _a !== void 0 ? _a : "#fff";
    }
    createPalette(colorPalette, colorAssignment) {
        const colorAssignmentColor = colorAssignment[0].color;
        if (isRgbColor(colorAssignmentColor) &&
            isEqual(colorAssignmentColor.value, DEFAULT_HEATMAP_BLUE_COLOR)) {
            return normalizeColorToRGB(this.getBackgroundColor()) === "rgb(255,255,255)"
                ? HEATMAP_BLUE_COLOR_PALETTE
                : this.getCustomHeatmapColorPalette(DEFAULT_HEATMAP_BLUE_BASE_COLOR);
        }
        if (isColorFromPalette(colorAssignmentColor)) {
            const colorFromPalette = getColorByGuid(colorPalette, colorAssignmentColor.value, 0);
            return this.getCustomHeatmapColorPalette(colorFromPalette);
        }
        return this.getCustomHeatmapColorPalette(colorAssignmentColor.value);
    }
    getCustomHeatmapColorPalette(baseColorRGB) {
        const themeBackgroundColor = this.getThemeBackgroundColor();
        const backgroundColor = this.getBackgroundColor();
        const baseColor = getRgbStringFromRGB(baseColorRGB);
        const baseColorLast = saturate(0.16, darken(0.2, baseColor));
        if (themeBackgroundColor && !isDarkTheme(this.theme)) {
            return [
                ...this.generatePalette(baseColor, backgroundColor, 5),
                ...this.generatePalette(baseColorLast, baseColor, 3).slice(1), // Need to remove overlapping color with slice
            ];
        }
        else {
            return this.generatePalette(baseColor, backgroundColor, 7);
        }
    }
    generatePalette(colorA, colorB, steps) {
        return range(steps).map((step) => normalizeColorToRGB(mix((1 / (steps - 1)) * step, colorA, colorB)));
    }
    getDefaultColorAssignment(colorPalette, headerItem) {
        const hasCustomPaletteWithColors = colorPalette && isCustomPalette(colorPalette) && colorPalette[0];
        if (hasCustomPaletteWithColors) {
            return [
                {
                    headerItem,
                    color: {
                        type: "guid",
                        value: colorPalette[0].guid,
                    },
                },
            ];
        }
        return [
            {
                headerItem,
                color: {
                    type: "rgb",
                    value: DEFAULT_HEATMAP_BLUE_COLOR,
                },
            },
        ];
    }
}
//# sourceMappingURL=heatmapColoring.js.map