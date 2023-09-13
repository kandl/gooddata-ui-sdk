// (C) 2022 GoodData Corporation
import { BucketNames } from "@gooddata/sdk-ui";
import { getBucketItems } from "../../../utils/bucketHelper";
function areAllMeasuresOnSingleAxis(buckets, secondaryAxis) {
    var _a, _b;
    const measures = getBucketItems(buckets, BucketNames.MEASURES);
    const measureCount = measures.length;
    const numberOfMeasureOnSecondaryAxis = (_b = (_a = secondaryAxis.measures) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
    return numberOfMeasureOnSecondaryAxis === 0 || measureCount === numberOfMeasureOnSecondaryAxis;
}
export function canSortStackTotalValue(buckets, properties) {
    var _a, _b;
    const supportedControls = properties === null || properties === void 0 ? void 0 : properties.controls;
    const stackMeasures = (_a = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.stackMeasures) !== null && _a !== void 0 ? _a : false;
    const secondaryAxis = (_b = supportedControls === null || supportedControls === void 0 ? void 0 : supportedControls.secondary_xaxis) !== null && _b !== void 0 ? _b : { measures: [] };
    const allMeasuresOnSingleAxis = areAllMeasuresOnSingleAxis(buckets, secondaryAxis);
    return stackMeasures && allMeasuresOnSingleAxis;
}
//# sourceMappingURL=sortHelpers.js.map