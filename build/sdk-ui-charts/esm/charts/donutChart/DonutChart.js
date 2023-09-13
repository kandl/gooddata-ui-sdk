// (C) 2007-2023 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { roundChartDimensions } from "../_commons/dimensions.js";
import { CoreDonutChart } from "./CoreDonutChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const donutChartDefinition = {
    chartName: "DonutChart",
    bucketPropsKeys: ["measures", "viewBy", "filters", "sortBy"],
    bucketsFactory: (props) => {
        const measures = (Array.isArray(props.measures) ? props.measures : [props.measures]);
        return [
            newBucket(BucketNames.MEASURES, ...measures),
            newBucket(BucketNames.VIEW, props.viewBy),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("DonutChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(roundChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedDonutChart = withChart(donutChartDefinition)(CoreDonutChart);
/**
 * Donut chart shows data as proportional segments of a disc and has a hollowed out center.
 *
 * @remarks
 * Donut charts can be segmented by either multiple measures or an attribute, and allow viewers to visualize
 * component parts of a whole.
 *
 * Note: the donut chart slices are by default sorted from largest to smallest. There is also a limit on the
 * number of slices that will be charted.
 *
 * See {@link IDonutChartProps} to learn how to configure the DonutChart and
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/donut_chart_component.html | donut chart documentation} for more information.
 *
 * @public
 */
export const DonutChart = (props) => {
    const [measures, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedDonutChart, Object.assign({}, props, {
        measures,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=DonutChart.js.map