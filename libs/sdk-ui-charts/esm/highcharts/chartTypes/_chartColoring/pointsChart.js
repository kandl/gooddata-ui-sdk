// (C) 2020 GoodData Corporation
import { isColorFromPalette } from "@gooddata/sdk-model";
import { findMeasureGroupInDimensions } from "../_util/executionResultHelper.js";
import { isValidMappedColor, getColorByGuid, getColorFromMapping, getRgbStringFromRGB, AttributeColorStrategy, } from "@gooddata/sdk-ui-vis-commons";
export class PointsChartColorStrategy extends AttributeColorStrategy {
    singleMeasureColorMapping(colorPalette, colorMapping, dv) {
        const measureGroup = findMeasureGroupInDimensions(dv.meta().dimensions());
        const measureHeaderItem = measureGroup.items[0];
        const measureColorMapping = getColorFromMapping(measureHeaderItem, colorMapping, dv);
        const color = isValidMappedColor(measureColorMapping, colorPalette)
            ? measureColorMapping
            : { type: "guid", value: colorPalette[0].guid };
        return [
            {
                headerItem: measureHeaderItem,
                color,
            },
        ];
    }
    createSingleColorPalette(colorPalette, colorAssignment, 
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    viewByAttribute) {
        const length = viewByAttribute ? viewByAttribute.items.length : 1;
        const color = isColorFromPalette(colorAssignment[0].color)
            ? getColorByGuid(colorPalette, colorAssignment[0].color.value, 0)
            : colorAssignment[0].color.value;
        const colorString = getRgbStringFromRGB(color);
        return Array(length).fill(colorString);
    }
}
//# sourceMappingURL=pointsChart.js.map