// (C) 2007-2023 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { roundChartDimensions } from "../_commons/dimensions.js";
import { CorePyramidChart } from "./CorePyramidChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const pyramidChartDefinition = {
    chartName: "PyramidChart",
    bucketPropsKeys: ["measures", "viewBy", "filters", "sortBy"],
    bucketsFactory: (props) => {
        return [
            newBucket(BucketNames.MEASURES, ...props.measures),
            newBucket(BucketNames.VIEW, props.viewBy),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("PyramidChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(roundChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedPyramidChart = withChart(pyramidChartDefinition)(CorePyramidChart);
/**
 * A pyramid chart displays values on top of each other, useful for example for showing hierarchies or workflows.
 *
 * @remarks
 * You can define pyramid chart using either multiple measures or single measure and a viewBy attribute whose
 * values will be used to slice the single measure.
 *
 * See {@link IPyramidChartProps} to learn how to configure the PyramidChart.
 *
 * @public
 */
export const PyramidChart = (props) => {
    const [measures, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedPyramidChart, Object.assign({}, props, {
        measures,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=PyramidChart.js.map