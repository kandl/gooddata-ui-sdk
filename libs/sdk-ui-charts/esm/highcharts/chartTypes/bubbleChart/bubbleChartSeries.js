import { BucketNames, getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { parseValue, unwrap } from "../_util/common.js";
import last from "lodash/last.js";
function getCountOfEmptyBuckets(bucketEmptyFlags = []) {
    return bucketEmptyFlags.filter((bucketEmptyFlag) => bucketEmptyFlag).length;
}
export function getBubbleChartSeries(dv, measureGroup, 
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
stackByAttribute, colorStrategy, emptyHeaderTitle) {
    const primaryMeasuresBucketEmpty = dv.def().isBucketEmpty(BucketNames.MEASURES);
    const secondaryMeasuresBucketEmpty = dv.def().isBucketEmpty(BucketNames.SECONDARY_MEASURES);
    let legendIndex = 0;
    let seriesIndex = 0;
    return dv
        .rawData()
        .twoDimData()
        .map((resData, index) => {
        if (resData[0] === null || resData[1] === null || resData[2] === null) {
            seriesIndex++;
            return null;
        }
        let data = [];
        const emptyBucketsCount = getCountOfEmptyBuckets([
            primaryMeasuresBucketEmpty,
            secondaryMeasuresBucketEmpty,
        ]);
        data = [
            {
                x: !primaryMeasuresBucketEmpty ? parseValue(resData[0]) : 0,
                y: !secondaryMeasuresBucketEmpty ? parseValue(resData[1 - emptyBucketsCount]) : 0,
                // we want to allow NaN on z to be able show bubble of default size when Size bucket is empty
                z: parseFloat(resData[2 - emptyBucketsCount]),
                format: unwrap(last(measureGroup.items)).format, // only for dataLabel format
            },
        ];
        return {
            name: stackByAttribute
                ? valueWithEmptyHandling(getMappingHeaderFormattedName(stackByAttribute.items[index]), emptyHeaderTitle)
                : "",
            color: colorStrategy.getColorByIndex(seriesIndex),
            legendIndex: legendIndex++,
            data,
            seriesIndex: seriesIndex++,
        };
    })
        .filter((serie) => serie !== null);
}
//# sourceMappingURL=bubbleChartSeries.js.map