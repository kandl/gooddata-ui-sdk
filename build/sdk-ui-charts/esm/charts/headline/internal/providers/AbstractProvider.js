// (C) 2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import clone from "lodash/clone.js";
import { MeasureGroupIdentifier, newDimension } from "@gooddata/sdk-model";
class AbstractProvider {
    createExecution(executionFactory, params) {
        const { buckets, filters, executionConfig, dateFormat, sortItems } = params;
        const execution = executionFactory
            .forBuckets(this.prepareBuckets(clone(buckets)), filters)
            .withExecConfig(executionConfig)
            .withDimensions(newDimension([MeasureGroupIdentifier]));
        if (dateFormat) {
            execution.withDateFormat(dateFormat);
        }
        if (!isEmpty(sortItems)) {
            execution.withSorting(...sortItems);
        }
        return execution;
    }
    prepareBuckets(originalBuckets) {
        return originalBuckets;
    }
}
export default AbstractProvider;
//# sourceMappingURL=AbstractProvider.js.map