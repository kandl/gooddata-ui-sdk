// (C) 2020-2022 GoodData Corporation
import { ColorStrategy, isValidMappedColor, getColorByGuid, getColorFromMapping, getLighterColorFromRGB, } from "@gooddata/sdk-ui-vis-commons";
import { isColorFromPalette, } from "@gooddata/sdk-model";
import { isDarkTheme } from "@gooddata/sdk-ui-theme-provider";
import { findMeasureGroupInDimensions } from "../_util/executionResultHelper.js";
const emptyColorPaletteItem = { type: "guid", value: "none" };
export class MeasureColorStrategy extends ColorStrategy {
    createColorAssignment(colorPalette, colorMapping, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _viewByAttribute, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    _stackByAttribute, dv) {
        const { allMeasuresAssignment, nonDerivedMeasuresAssignment } = this.mapColorsFromMeasures(dv, colorMapping, colorPalette);
        return {
            fullColorAssignment: this.mapColorsFromDerivedMeasure(dv, allMeasuresAssignment, colorPalette),
            outputColorAssignment: nonDerivedMeasuresAssignment,
        };
    }
    mapColorsFromMeasures(dv, colorMapping, colorPalette) {
        let currentColorPaletteIndex = 0;
        const nonDerivedMeasuresAssignment = [];
        const measureGroup = findMeasureGroupInDimensions(dv.meta().dimensions());
        const allMeasuresAssignment = measureGroup.items.map((headerItem, index) => {
            if (dv.meta().isDerivedMeasure(measureGroup.items[index])) {
                return {
                    headerItem,
                    color: emptyColorPaletteItem,
                };
            }
            const mappedMeasure = this.mapMeasureColor(headerItem, currentColorPaletteIndex, colorPalette, colorMapping, dv);
            currentColorPaletteIndex++;
            nonDerivedMeasuresAssignment.push(mappedMeasure);
            return mappedMeasure;
        });
        return {
            allMeasuresAssignment,
            nonDerivedMeasuresAssignment,
        };
    }
    mapMeasureColor(descriptor, currentColorPaletteIndex, colorPalette, colorAssignment, dv) {
        const mappedColor = getColorFromMapping(descriptor, colorAssignment, dv);
        const color = isValidMappedColor(mappedColor, colorPalette)
            ? mappedColor
            : {
                type: "guid",
                value: colorPalette[currentColorPaletteIndex % colorPalette.length].guid,
            };
        return {
            headerItem: descriptor,
            color,
        };
    }
    mapColorsFromDerivedMeasure(dv, measuresColorAssignment, colorPalette) {
        return measuresColorAssignment.map((mapItem, measureItemIndex) => {
            const measureGroup = findMeasureGroupInDimensions(dv.meta().dimensions());
            if (!dv.meta().isDerivedMeasure(measureGroup.items[measureItemIndex])) {
                return mapItem;
            }
            const masterMeasure = dv
                .def()
                .masterMeasureForDerived(measureGroup.items[measureItemIndex].measureHeaderItem.localIdentifier);
            if (!masterMeasure) {
                return mapItem;
            }
            const parentMeasureIndex = dv.def().measureIndex(masterMeasure.measure.localIdentifier);
            if (parentMeasureIndex > -1) {
                const sourceMeasureColor = measuresColorAssignment[parentMeasureIndex].color;
                return this.getDerivedMeasureColorAssignment(sourceMeasureColor, colorPalette, measureItemIndex, mapItem);
            }
            return Object.assign(Object.assign({}, mapItem), { color: mapItem.color });
        });
    }
    getDerivedMeasureColorAssignment(sourceMeasureColor, colorPalette, measureItemIndex, mapItem) {
        const rgbColor = isColorFromPalette(sourceMeasureColor)
            ? getColorByGuid(colorPalette, sourceMeasureColor.value, measureItemIndex)
            : sourceMeasureColor.value;
        return Object.assign(Object.assign({}, mapItem), { color: {
                type: "rgb",
                value: getLighterColorFromRGB(rgbColor, isDarkTheme(this.theme) ? -0.6 : 0.6),
            } });
    }
}
//# sourceMappingURL=measure.js.map