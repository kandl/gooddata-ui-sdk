import omit from "lodash/omit.js";
/**
 * Specifies props that are on bucket chart props but not on core chart props - these must not be passed
 * down to core chart.
 */
const NON_CORE_PROPS = ["backend", "workspace"];
export const getCoreChartProps = (chart) => (props) => {
    const propsToUse = chart.propTransformation ? chart.propTransformation(props) : props;
    if (chart.onBeforePropsConversion) {
        chart.onBeforePropsConversion(propsToUse);
    }
    const buckets = chart.bucketsFactory(propsToUse);
    const execution = chart.executionFactory(propsToUse, buckets);
    const nonBucketProps = omit(propsToUse, chart.bucketPropsKeys);
    const propOverrides = chart.propOverridesFactory
        ? chart.propOverridesFactory(propsToUse, buckets)
        : {};
    const exportTitle = propsToUse.exportTitle || chart.chartName;
    const coreChartProps = Object.assign(Object.assign(Object.assign({}, nonBucketProps), propOverrides), { execution,
        exportTitle });
    return omit(coreChartProps, NON_CORE_PROPS);
};
//# sourceMappingURL=chartDefinition.js.map