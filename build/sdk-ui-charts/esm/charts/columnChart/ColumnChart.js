// (C) 2007-2023 GoodData Corporation
import React from "react";
import { applyRatioRule, newBucket, } from "@gooddata/sdk-model";
import { truncate } from "../_commons/truncate.js";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { stackedChartDimensions } from "../_commons/dimensions.js";
import { ViewByAttributesLimit } from "../../interfaces/index.js";
import { CoreColumnChart } from "./CoreColumnChart.js";
import { withChart } from "../_base/withChart.js";
import { sanitizeConfig } from "../_commons/sanitizeStacking.js";
//
// Internals
//
const columnChartDefinition = {
    chartName: "ColumnChart",
    bucketPropsKeys: ["measures", "viewBy", "stackBy", "filters", "sortBy"],
    bucketsFactory: (props) => {
        const measures = applyRatioRule(props.measures);
        const viewBy = truncate(props.viewBy, ViewByAttributesLimit); // could be one or two attributes
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
            .withTelemetry("ColumnChart", props)
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
const WrappedColumnChart = withChart(columnChartDefinition)(CoreColumnChart);
/**
 * Column chart shows data in vertical columns.
 *
 * @remarks
 * Column charts can display one or multiple measures side by side,
 * divided by either attribute values or by a single measure stacked by attribute values.
 *
 * See {@link IColumnChartProps} to learn how to configure the ColumnChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/column_chart_component.html | column chart documentation} for more information.
 *
 * @public
 */
export const ColumnChart = (props) => {
    const [measures, viewBy, stackBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.stackBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedColumnChart, Object.assign({}, props, {
        measures,
        viewBy,
        stackBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=ColumnChart.js.map