// (C) 2023 GoodData Corporation
import React from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { dependencyWheelDimensions } from "../_commons/dimensions.js";
import { CoreDependencyWheelChart } from "./CoreDependencyWheelChart.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const dependencyWheelChartDefinition = {
    chartName: "DependencyWheelChart",
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
            .withTelemetry("DependencyWheelChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withDimensions(dependencyWheelDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedDependencyWheelChart = withChart(dependencyWheelChartDefinition)(CoreDependencyWheelChart);
/**
 * A dependency wheel is a type of flow diagram, where nodes are laid out in a circle, and links are drawn between them.
 * This width of the link and size of the nodes are proportional to the flow quantity or weight of each link.
 *
 * @remarks
 * A DependencyWheel diagram can be displayed with one measure and one or two attributes,
 * where the measure represents the width of the links and the attributes represent the nodes of the links
 *
 * See {@link IDependencyWheelChartProps} to learn how to configure the DependencyWheelChart.
 *
 * @public
 */
export const DependencyWheelChart = (props) => {
    const [measure, attributeFrom, attributeTo, filters, sortBy] = useResolveValuesWithPlaceholders([props.measure, props.attributeFrom, props.attributeTo, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedDependencyWheelChart, Object.assign({}, props, {
        measure,
        attributeFrom,
        attributeTo,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=DependencyWheelChart.js.map