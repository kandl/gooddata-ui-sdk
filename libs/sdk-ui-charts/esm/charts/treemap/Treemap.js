// (C) 2007-2022 GoodData Corporation
import React from "react";
import { bucketAttribute, bucketsFind, bucketsMeasures, newAttributeSort, newBucket, newMeasureSort, } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { treemapDimensions } from "../_commons/dimensions.js";
import { CoreTreemap } from "./CoreTreemap.js";
import { withChart } from "../_base/withChart.js";
//
// Internals
//
const treemapDefinition = {
    chartName: "Treemap",
    bucketPropsKeys: ["measures", "viewBy", "segmentBy", "filters"],
    bucketsFactory: (props) => {
        return [
            newBucket(BucketNames.MEASURES, ...props.measures),
            newBucket(BucketNames.VIEW, props.viewBy),
            newBucket(BucketNames.SEGMENT, props.segmentBy),
        ];
    },
    executionFactory: (props, buckets) => {
        const { backend, workspace, execConfig } = props;
        const sortBy = getDefaultTreemapSort(buckets);
        return backend
            .withTelemetry("Treemap", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(treemapDimensions)
            .withExecConfig(execConfig);
    },
};
const WrappedTreemap = withChart(treemapDefinition)(CoreTreemap);
/**
 * Treemap chart presents your data hierarchically as nested rectangles.
 *
 * @remarks
 * Treemaps are useful for comparing proportions within the hierarchy.
 *
 * See {@link ITreemapProps} to learn how to configure the Treemap and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/treemap_component.html | treemap documentation} for more information.
 *
 * @public
 */
export const Treemap = (props) => {
    const [measures, viewBy, segmentBy, filters] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.segmentBy, props.filters], props.placeholdersResolutionContext);
    return (React.createElement(WrappedTreemap, Object.assign({}, props, {
        measures,
        viewBy,
        segmentBy,
        filters,
    })));
};
function getDefaultTreemapSort(buckets) {
    const viewBucket = bucketsFind(buckets, BucketNames.VIEW);
    const segmentBucket = bucketsFind(buckets, BucketNames.SEGMENT);
    const viewAttribute = viewBucket ? bucketAttribute(viewBucket) : undefined;
    const segmentAttribute = segmentBucket
        ? bucketAttribute(segmentBucket)
        : undefined;
    if (viewAttribute && segmentAttribute) {
        const measures = bucketsMeasures(buckets);
        return [
            newAttributeSort(viewAttribute, "asc"),
            ...measures.map((measure) => newMeasureSort(measure, "desc")),
        ];
    }
    return [];
}
//# sourceMappingURL=Treemap.js.map