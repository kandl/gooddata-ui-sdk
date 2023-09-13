import { getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import compact from "lodash/compact.js";
const KEYS = ["from", "to", "weight", "name"];
const DEFAULT_ATTRIBUTE_HEADER = "";
const DEFAULT_WEIGHT = 1;
const buildNodes = (colorStrategy, emptyHeaderTitle) => {
    return colorStrategy.getColorAssignment().map((colorAssignment, index) => ({
        id: valueWithEmptyHandling(getMappingHeaderFormattedName(colorAssignment.headerItem), emptyHeaderTitle),
        color: colorStrategy.getColorByIndex(index),
    }));
};
const buildEmptyData = (dv) => {
    return [
        {
            from: DEFAULT_ATTRIBUTE_HEADER,
            to: DEFAULT_ATTRIBUTE_HEADER,
            weight: Number(dv.rawData().dataAt(0)[0]) || DEFAULT_WEIGHT,
            name: DEFAULT_ATTRIBUTE_HEADER,
        },
    ];
};
const buildData = (dv, attributeHeaders, emptyHeaderTitle) => {
    const [from, to] = compact(attributeHeaders);
    const isExistingAttributeHeader = from || to;
    if (!isExistingAttributeHeader) {
        return buildEmptyData(dv);
    }
    return dv.rawData().dataAt(0).map((it, index) => {
        const fromValue = from &&
            valueWithEmptyHandling(getMappingHeaderFormattedName(from.items[index]), emptyHeaderTitle);
        const toValue = to && valueWithEmptyHandling(getMappingHeaderFormattedName(to.items[index]), emptyHeaderTitle);
        return {
            from: fromValue,
            to: toValue,
            weight: Number(it),
            name: fromValue,
        };
    });
};
export const buildSankeyChartSeries = (dv, attributeHeaders, colorStrategy, emptyHeaderTitle) => {
    return [
        {
            keys: KEYS,
            data: buildData(dv, attributeHeaders, emptyHeaderTitle),
            nodes: buildNodes(colorStrategy, emptyHeaderTitle),
            seriesIndex: 0,
        },
    ];
};
//# sourceMappingURL=sankeyChartOptions.js.map