// (C) 2023 GoodData Corporation
import { ColorStrategy, getColorFromMapping, isValidMappedColor, } from "@gooddata/sdk-ui-vis-commons";
import { DEFAULT_WATERFALL_COLORS } from "../_util/color.js";
const DEFAULT_COLOR_PALETTE_ITEMS = DEFAULT_WATERFALL_COLORS.map((id) => ({
    colorHeaderItem: { id, name: id },
}));
const getColorHeaderItem = (colorPalette, colorMapping, dv, item, index) => {
    const mappedColor = getColorFromMapping(item, colorMapping, dv);
    return mappedColor && isValidMappedColor(mappedColor, colorPalette)
        ? mappedColor
        : {
            type: "guid",
            value: colorPalette[index % colorPalette.length].guid,
        };
};
export class WaterfallChartColorStrategy extends ColorStrategy {
    createColorAssignment(colorPalette, colorMapping, _viewByParentAttribute, _viewByAttribute, dv) {
        const colorAssignment = DEFAULT_COLOR_PALETTE_ITEMS.map((headerItem, index) => {
            return {
                headerItem,
                color: getColorHeaderItem(colorPalette, colorMapping, dv, headerItem, index),
            };
        });
        return {
            fullColorAssignment: colorAssignment,
        };
    }
}
//# sourceMappingURL=waterfallChartColoring.js.map