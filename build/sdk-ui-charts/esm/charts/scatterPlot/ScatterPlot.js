// (C) 2007-2023 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { pointyChartDimensions } from "../_commons/dimensions.js";
import { CoreScatterPlot } from "./CoreScatterPlot.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const scatterPlotDefinition = {
    chartName: "ScatterPlot",
    bucketPropsKeys: ["xAxisMeasure", "yAxisMeasure", "attribute", "filters", "sortBy"],
    bucketsFactory: (props) => {
        return [
            newBucket(BucketNames.MEASURES, props.xAxisMeasure),
            newBucket(BucketNames.SECONDARY_MEASURES, props.yAxisMeasure),
            newBucket(BucketNames.ATTRIBUTE, props.attribute),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("ScatterPlot", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(pointyChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedScatterPlot = withChart(scatterPlotDefinition)(CoreScatterPlot);
/**
 * Scatter plot shows data as points using Cartesian coordinates.
 *
 * @remarks
 * Scatter plots typically have a minimum of two measures, one for the X-axis and the other for the Y-axis, and one
 * attribute, which determines the meaning of each data point. Scatter plots are useful for analyzing trends between
 * two measures or for tracking the magnitude of two measures from the same chart.
 *
 * See {@link IScatterPlotProps} to learn how to configure the ScatterPlot and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/scatter_plot_component.html | scatter plot documentation} for more information.
 *
 * @public
 */
export const ScatterPlot = (props) => {
    const [xAxisMeasure, yAxisMeasure, attribute, filters, sortBy] = useResolveValuesWithPlaceholders([props.xAxisMeasure, props.yAxisMeasure, props.attribute, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedScatterPlot, Object.assign({}, props, {
        xAxisMeasure,
        yAxisMeasure,
        attribute,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=ScatterPlot.js.map