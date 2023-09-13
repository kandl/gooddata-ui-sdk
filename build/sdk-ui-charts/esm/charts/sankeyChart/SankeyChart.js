// (C) 2007-2023 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { sankeyDimensions } from "../_commons/dimensions.js";
import { CoreSankeyChart } from "./CoreSankeyChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const sankeyChartDefinition = {
    chartName: "SankeyChart",
    bucketPropsKeys: ["measure", "attributeFrom", "attributeTo", "filters", "sortBy"],
    bucketsFactory: (props) => {
        return [
            newBucket(BucketNames.MEASURES, props.measure),
            newBucket(BucketNames.ATTRIBUTE_FROM, props.attributeFrom),
            newBucket(BucketNames.ATTRIBUTE_TO, props.attributeTo),
        ];
    },
    executionFactory: (props, buckets) => {
        const { backend, workspace, execConfig } = props;
        return backend
            .withTelemetry("SankeyChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withDimensions(sankeyDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedSankeyChart = withChart(sankeyChartDefinition)(CoreSankeyChart);
/**
 * A Sankey diagram is a type of flow diagram,
 * in which the width of the link between two nodes is shown proportionally to the flow quantity.
 *
 * @remarks
 * A Sankey diagram can be displayed with one measure and one or two attributes,
 * where the measure represents the width of the links and the attributes represent the nodes of the links
 *
 * See {@link ISankeyChartProps} to learn how to configure the SankeyChart.
 *
 * @public
 */
export const SankeyChart = (props) => {
    const [measure, attributeFrom, attributeTo, filters, sortBy] = useResolveValuesWithPlaceholders([props.measure, props.attributeFrom, props.attributeTo, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedSankeyChart, Object.assign({}, props, {
        measure,
        attributeFrom,
        attributeTo,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=SankeyChart.js.map