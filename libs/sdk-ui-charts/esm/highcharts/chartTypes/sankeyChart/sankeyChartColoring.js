// (C) 2023 GoodData Corporation
import uniqBy from "lodash/uniqBy.js";
import { ColorStrategy, getColorFromMapping, isValidMappedColor, } from "@gooddata/sdk-ui-vis-commons";
import compact from "lodash/compact.js";
export class SankeyChartColorStrategy extends ColorStrategy {
    createColorAssignment(colorPalette, colorMapping, fromAttribute, toAttribute, dv) {
        var _a, _b;
        const attributeItems = compact([...((_a = fromAttribute === null || fromAttribute === void 0 ? void 0 : fromAttribute.items) !== null && _a !== void 0 ? _a : []), ...((_b = toAttribute === null || toAttribute === void 0 ? void 0 : toAttribute.items) !== null && _b !== void 0 ? _b : [])]);
        const uniqAttributeItems = uniqBy(attributeItems, "attributeHeaderItem.uri");
        const colorAssignment = uniqAttributeItems.map((headerItem, index) => {
            const mappedColor = getColorFromMapping(headerItem, colorMapping, dv);
            const color = mappedColor && isValidMappedColor(mappedColor, colorPalette)
                ? mappedColor
                : {
                    type: "guid",
                    value: colorPalette[index % colorPalette.length].guid,
                };
            return {
                headerItem,
                color,
            };
        });
        return {
            fullColorAssignment: colorAssignment,
        };
    }
}
//# sourceMappingURL=sankeyChartColoring.js.map