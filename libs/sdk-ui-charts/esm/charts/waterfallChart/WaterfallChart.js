// (C) 2023 GoodData Corporation
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { withChart } from "../_base/withChart.js";
import { CoreWaterfallChart } from "../waterfallChart/CoreWaterfallChart.js";
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { roundChartDimensions } from "../_commons/dimensions.js";
//
// Internals
//
const waterfallChartDefinition = {
    chartName: "WaterfallChart",
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
            .withTelemetry("WaterfallChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(roundChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedWaterfallChart = withChart(waterfallChartDefinition)(CoreWaterfallChart);
/**
 * Waterfall chart shows data as proportional segments of a disc.
 *
 * @remarks
 * Waterfall charts can be segmented by either multiple measures or an attribute.
 *
 * See {@link IWaterfallChartProps} to learn how to configure the WaterfallChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/waterfall_chart_component.html | Waterfall chart documentation} for more information.
 *
 * @public
 */
export const WaterfallChart = (props) => {
    const [measures, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedWaterfallChart, Object.assign({}, props, {
        measures,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=WaterfallChart.js.map