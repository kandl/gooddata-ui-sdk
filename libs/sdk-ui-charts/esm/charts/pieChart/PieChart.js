// (C) 2007-2023 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { roundChartDimensions } from "../_commons/dimensions.js";
import { CorePieChart } from "./CorePieChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const pieChartDefinition = {
    chartName: "PieChart",
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
            .withTelemetry("PieChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(roundChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedPieChart = withChart(pieChartDefinition)(CorePieChart);
/**
 * Pie chart shows data as proportional segments of a disc.
 *
 * @remarks
 * Pie charts can be segmented by either multiple measures or an attribute.
 *
 * See {@link IPieChartProps} to learn how to configure the PieChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/pie_chart_component.html | pie chart documentation} for more information.
 *
 * @public
 */
export const PieChart = (props) => {
    const [measures, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedPieChart, Object.assign({}, props, {
        measures,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=PieChart.js.map