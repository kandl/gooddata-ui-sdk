import { BucketNames } from "@gooddata/sdk-ui";
import { getDateItems, findBucket, limitNumberOfMeasuresInBuckets, getAllMeasures, } from "../../../utils/bucketHelper.js";
export const getXirrBuckets = ({ buckets }) => {
    const limitedMeasureBuckets = limitNumberOfMeasuresInBuckets(buckets, 1);
    const currentMeasureBucket = findBucket(limitedMeasureBuckets, BucketNames.MEASURES);
    const currentAttributeBucket = findBucket(buckets, BucketNames.ATTRIBUTE);
    const measureItem = getAllMeasures(limitedMeasureBuckets)[0];
    const dateAttributeItem = getDateItems(buckets)[0];
    return [
        Object.assign(Object.assign({}, currentMeasureBucket), { localIdentifier: BucketNames.MEASURES, items: measureItem ? [measureItem] : [] }),
        Object.assign(Object.assign({}, currentAttributeBucket), { localIdentifier: BucketNames.ATTRIBUTE, items: dateAttributeItem ? [dateAttributeItem] : [] }),
    ];
};
//# sourceMappingURL=xirrBucketHelper.js.map