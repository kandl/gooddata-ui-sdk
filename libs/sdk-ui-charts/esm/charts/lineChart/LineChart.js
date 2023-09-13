// (C) 2007-2023 GoodData Corporation
import React from "react";
import { newBucket, } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { stackedChartDimensions } from "../_commons/dimensions.js";
import { CoreLineChart } from "./CoreLineChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
function lineChartDimensions(def) {
    return stackedChartDimensions(def, BucketNames.TREND, BucketNames.SEGMENT);
}
const lineChartDefinition = {
    chartName: "LineChart",
    bucketPropsKeys: ["measures", "trendBy", "segmentBy", "filters", "sortBy"],
    bucketsFactory: (props) => {
        return [
            newBucket(BucketNames.MEASURES, ...props.measures),
            newBucket(BucketNames.TREND, props.trendBy),
            newBucket(BucketNames.SEGMENT, props.segmentBy),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("LineChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(lineChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedLineChart = withChart(lineChartDefinition)(CoreLineChart);
/**
 * Line chart shows data as line-connected dots.
 *
 * @remarks
 * Line charts can display either multiple measures as individual lines
 * or a single measure split by one attribute into multiple lines with points intersecting attribute values.
 *
 * See {@link ILineChartProps} to learn how to configure the LineChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/line_chart_component.html | line chart documentation} for more information.
 *
 * @public
 */
export const LineChart = (props) => {
    const [measures, trendBy, segmentBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.trendBy, props.segmentBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedLineChart, Object.assign({}, props, {
        measures,
        trendBy,
        segmentBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=LineChart.js.map