// (C) 2007-2022 GoodData Corporation
import React from "react";
import { bucketAttribute, bucketsFind, newAttributeSort, newBucket, } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { heatmapDimensions } from "../_commons/dimensions.js";
import { CoreHeatmap } from "./CoreHeatmap.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const heatmapDefinition = {
    chartName: "Heatmap",
    bucketPropsKeys: ["measure", "rows", "columns", "filters", "sortBy"],
    bucketsFactory: (props) => {
        return [
            newBucket(BucketNames.MEASURES, props.measure),
            newBucket(BucketNames.VIEW, props.rows),
            newBucket(BucketNames.STACK, props.columns),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : getDefaultHeatmapSort(buckets);
        return backend
            .withTelemetry("Heatmap", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(heatmapDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedHeatmap = withChart(heatmapDefinition)(CoreHeatmap);
/**
 * Heatmap represents data as a matrix where individual values are represented as colors.
 * Heatmaps can help you discover trends and understand complex datasets.
 *
 * @remarks
 * See {@link IHeatmapProps} to learn how to configure the Heatmap and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/heatmap_component.html | heatmap documentation} for more information.
 *
 * @public
 */
export const Heatmap = (props) => {
    const [measure, rows, columns, filters, sortBy] = useResolveValuesWithPlaceholders([props.measure, props.rows, props.columns, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedHeatmap, Object.assign({}, props, {
        measure,
        rows,
        columns,
        filters,
        sortBy,
    })));
};
function getDefaultHeatmapSort(buckets) {
    const viewBucket = bucketsFind(buckets, BucketNames.VIEW);
    const viewAttribute = viewBucket ? bucketAttribute(viewBucket) : undefined;
    if (viewAttribute) {
        return [newAttributeSort(viewAttribute, "desc")];
    }
    return [];
}
//# sourceMappingURL=Heatmap.js.map