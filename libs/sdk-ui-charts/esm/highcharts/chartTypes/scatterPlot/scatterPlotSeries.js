// (C) 2020-2022 GoodData Corporation
import { BucketNames, getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { parseValue } from "../_util/common.js";
export function getScatterPlotSeries(dv, 
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
stackByAttribute, colorStrategy, emptyHeaderTitle) {
    const primaryMeasuresBucketEmpty = dv.def().isBucketEmpty(BucketNames.MEASURES);
    const secondaryMeasuresBucketEmpty = dv.def().isBucketEmpty(BucketNames.SECONDARY_MEASURES);
    const data = dv
        .rawData()
        .twoDimData()
        .map((seriesItem, seriesIndex) => {
        const values = seriesItem.map((value) => {
            return parseValue(value);
        });
        return {
            x: !primaryMeasuresBucketEmpty ? values[0] : 0,
            y: !secondaryMeasuresBucketEmpty ? (primaryMeasuresBucketEmpty ? values[0] : values[1]) : 0,
            name: stackByAttribute
                ? valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[seriesIndex]), emptyHeaderTitle)
                : "",
        };
    });
    return [
        {
            turboThreshold: 0,
            color: colorStrategy.getColorByIndex(0),
            legendIndex: 0,
            data,
            seriesIndex: 0,
        },
    ];
}
//# sourceMappingURL=scatterPlotSeries.js.map