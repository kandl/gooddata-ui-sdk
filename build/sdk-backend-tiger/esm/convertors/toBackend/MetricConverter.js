// (C) 2021-2023 GoodData Corporation
export function convertMetricToBackend(measure) {
    return {
        title: measure.title,
        description: measure.description,
        content: {
            format: measure.format,
            maql: measure.expression,
        },
    };
}
//# sourceMappingURL=MetricConverter.js.map