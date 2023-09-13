// (C) 2021-2022 GoodData Corporation
import { newMeasureMetadataObject } from "@gooddata/sdk-backend-base";
import { uriRef } from "@gooddata/sdk-model";
export function convertMetricFromBackend(metric) {
    const ref = uriRef(metric.meta.uri);
    const { meta, content } = metric;
    return newMeasureMetadataObject(ref, (m) => m
        .id(meta.identifier)
        .uri(meta.uri)
        .title(meta.title)
        .description(meta.summary || "")
        .expression(content.expression)
        .format(content.format || "#,#.##")
        .deprecated(meta.deprecated === "1")
        .isLocked(Boolean(meta.locked))
        .production(Boolean(meta.isProduction))
        .unlisted(Boolean(meta.unlisted)));
}
export function convertListedMetric(metricLink) {
    const ref = uriRef(metricLink.link);
    return newMeasureMetadataObject(ref, (m) => m
        .id(metricLink.identifier)
        .uri(metricLink.link)
        .title(metricLink.title || "")
        .description(metricLink.summary || ""));
}
//# sourceMappingURL=MetricConverter.js.map