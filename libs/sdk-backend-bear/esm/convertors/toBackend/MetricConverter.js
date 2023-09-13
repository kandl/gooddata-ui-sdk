// (C) 2021-2022 GoodData Corporation
import { isMeasureMetadataObject, } from "@gooddata/sdk-model";
export function convertMetricToBackend(measure) {
    return {
        meta: Object.assign(Object.assign({}, (isMeasureMetadataObject(measure) && {
            identifier: measure.id,
            uri: measure.uri,
        })), { title: measure.title || "", summary: measure.description, locked: measure.isLocked }),
        content: {
            expression: measure.expression,
            format: measure.format,
        },
    };
}
//# sourceMappingURL=MetricConverter.js.map