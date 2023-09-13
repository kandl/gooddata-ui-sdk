// (C) 2007-2023 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { pointyChartDimensions } from "../_commons/dimensions.js";
import { CoreBubbleChart } from "./CoreBubbleChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const bubbleChartDefinition = {
    chartName: "BubbleChart",
    bucketPropsKeys: ["xAxisMeasure", "yAxisMeasure", "size", "viewBy", "filters", "sortBy"],
    bucketsFactory: (props) => {
        return [
            newBucket(BucketNames.MEASURES, props.xAxisMeasure),
            newBucket(BucketNames.SECONDARY_MEASURES, props.yAxisMeasure),
            newBucket(BucketNames.TERTIARY_MEASURES, props.size),
            newBucket(BucketNames.VIEW, props.viewBy),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("BubbleChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(pointyChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedBubbleChart = withChart(bubbleChartDefinition)(CoreBubbleChart);
/**
 * Bubble chart shows data as bubbles using Cartesian coordinates.
 *
 * @remarks
 * Bubble charts typically have three measures, one
 * for the X-axis, one for the Y-axis, and one that determines the size of each bubble. The data is sliced by an
 * attribute, with each bubble (an attribute item) noted with a different color.
 *
 * See {@link IBubbleChartProps} to learn how to configure the BubbleChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/bubble_chart_component.html | bubble chart documentation} for more information.
 *
 * @public
 */
export const BubbleChart = (props) => {
    const [xAxisMeasure, yAxisMeasure, size, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.xAxisMeasure, props.yAxisMeasure, props.size, props.viewBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedBubbleChart, Object.assign({}, props, {
        xAxisMeasure,
        yAxisMeasure,
        size,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=BubbleChart.js.map