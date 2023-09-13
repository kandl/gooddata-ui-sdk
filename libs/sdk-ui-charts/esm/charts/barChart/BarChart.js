// (C) 2019-2023 GoodData Corporation
import React from "react";
import { applyRatioRule, newBucket, } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { ViewByAttributesLimit } from "../../interfaces/index.js";
import { truncate } from "../_commons/truncate.js";
import { CoreBarChart } from "./CoreBarChart.js";
import { stackedChartDimensions } from "../_commons/dimensions.js";
import { withChart } from "../_base/withChart.js";
import { sanitizeConfig } from "../_commons/sanitizeStacking.js";
//
// Internals
//
const barChartDefinition = {
    chartName: "BarChart",
    bucketPropsKeys: ["measures", "viewBy", "stackBy", "filters", "sortBy"],
    bucketsFactory: (props) => {
        const measures = applyRatioRule(props.measures);
        const viewBy = truncate(props.viewBy, ViewByAttributesLimit);
        return [
            newBucket(BucketNames.MEASURES, ...measures),
            newBucket(BucketNames.VIEW, ...viewBy),
            newBucket(BucketNames.STACK, props.stackBy),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("BarChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(stackedChartDimensions)
            .withExecConfig(execConfig);
    },
    propOverridesFactory: (props, buckets) => {
        return {
            config: sanitizeConfig(buckets, props.config),
        };
    },
};
const WrappedBarChart = withChart(barChartDefinition)(CoreBarChart);
/**
 * Bar chart shows data in horizontal bars.
 *
 * @remarks
 * Bar charts can display one or multiple metrics side by side divided by
 * attribute values or a single measure stacked by attribute values.
 *
 * See {@link IBarChartProps} to learn how to configure the BarChart and the
 *  {@link https://sdk.gooddata.com/gooddata-ui/docs/bar_chart_component.html | bar chart documentation} for more information.
 *
 * @public
 */
export const BarChart = (props) => {
    const [measures, viewBy, stackBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.stackBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedBarChart, Object.assign({}, props, {
        measures,
        viewBy,
        stackBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=BarChart.js.map