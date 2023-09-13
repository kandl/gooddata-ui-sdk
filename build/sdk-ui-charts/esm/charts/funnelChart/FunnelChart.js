// (C) 2007-2022 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { roundChartDimensions } from "../_commons/dimensions.js";
import { CoreFunnelChart } from "./CoreFunnelChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const funnelChartDefinition = {
    chartName: "FunnelChart",
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
            .withTelemetry("FunnelChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(roundChartDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedFunnelChart = withChart(funnelChartDefinition)(CoreFunnelChart);
/**
 * A funnel chart displays values as progressively decreasing proportions.
 *
 * @remarks
 * You can define funnel chart using either multiple measures or single measure and a viewBy attribute whose
 * values will be used to slice the single measure.
 *
 * In either case, the measure values will be charted into a funnel. With the largest values being on the broadest
 * part of the funnel, and the smallest values towards the narrow part of the funnel.
 *
 * See {@link IFunnelChartProps} to learn how to configure the FunnelChart.
 *
 * @public
 */
export const FunnelChart = (props) => {
    const [measures, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedFunnelChart, Object.assign({}, props, {
        measures,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=FunnelChart.js.map