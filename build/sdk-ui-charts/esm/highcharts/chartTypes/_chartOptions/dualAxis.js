import { __rest } from "tslib";
// (C) 2019-2020 GoodData Corporation
import { measureLocalId } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { isComboChart } from "../_util/common.js";
export function setMeasuresToSecondaryAxis(config = {}, dv) {
    var _a;
    const isDualAxis = (_a = config.dualAxis) !== null && _a !== void 0 ? _a : true;
    const type = config.type;
    const { secondary_yaxis: secondaryYAxis } = config, remainConfig = __rest(config, ["secondary_yaxis"]);
    const secondaryMeasuresIds = dv.def().bucketMeasures(BucketNames.SECONDARY_MEASURES).map(measureLocalId);
    if (!isComboChart(type)) {
        return config;
    }
    if (!isDualAxis) {
        return remainConfig;
    }
    return Object.assign(Object.assign({}, remainConfig), { secondary_yaxis: Object.assign(Object.assign({}, secondaryYAxis), { measures: secondaryMeasuresIds }) });
}
//# sourceMappingURL=dualAxis.js.map