// (C) 2019-2023 GoodData Corporation
import React from "react";
import { disableComputeRatio, newBucket, } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { ViewByAttributesLimit } from "../../interfaces/index.js";
import { truncate } from "../_commons/truncate.js";
import { CoreBulletChart } from "./CoreBulletChart.js";
import { stackedChartDimensions } from "../_commons/dimensions.js";
import { withChart } from "../_base/withChart.js";
import { sanitizeConfig } from "../_commons/sanitizeStacking.js";
//
// Internals
//
const bulletChartDefinition = {
    chartName: "BulletChart",
    bucketPropsKeys: ["primaryMeasure", "targetMeasure", "comparativeMeasure", "viewBy", "filters", "sortBy"],
    propTransformation: (props) => {
        /*
         * Modify input props - disable compute ratio on all measures
         */
        return Object.assign(Object.assign({}, props), { primaryMeasure: disableComputeRatio(props.primaryMeasure), targetMeasure: props.targetMeasure
                ? disableComputeRatio(props.targetMeasure)
                : undefined, comparativeMeasure: props.comparativeMeasure
                ? disableComputeRatio(props.comparativeMeasure)
                : undefined });
    },
    bucketsFactory: (props) => {
        const viewBy = truncate(props.viewBy, ViewByAttributesLimit);
        return [
            newBucket(BucketNames.MEASURES, props.primaryMeasure),
            newBucket(BucketNames.SECONDARY_MEASURES, props.targetMeasure),
            newBucket(BucketNames.TERTIARY_MEASURES, props.comparativeMeasure),
            newBucket(BucketNames.VIEW, ...viewBy),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("BulletChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(stackedChartDimensions)
            .withExecConfig(execConfig);
    },
    propOverridesFactory: (props, _buckets) => {
        return {
            config: sanitizeConfig([
                props.primaryMeasure,
                props.targetMeasure,
                props.comparativeMeasure,
            ], props.config),
        };
    },
};
const WrappedBulletChart = withChart(bulletChartDefinition)(CoreBulletChart);
/**
 * Bullet chart is a variation of a bar chart that displays performance of a measure (primary measure) and its progress
 * towards a goal (target measure).
 *
 * @remarks
 * Optionally, the primary measure can also be compared to another measure (comparative measure).
 *
 * See {@link IBulletChartProps} to learn how to configure the BulletChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/bullet_chart_component.html | bullet chart documentation} for more information.
 *
 * @public
 */
export const BulletChart = (props) => {
    const [primaryMeasure, targetMeasure, comparativeMeasure, viewBy, filters, sortBy] = useResolveValuesWithPlaceholders([
        props.primaryMeasure,
        props.targetMeasure,
        props.comparativeMeasure,
        props.viewBy,
        props.filters,
        props.sortBy,
    ], props.placeholdersResolutionContext);
    return (React.createElement(WrappedBulletChart, Object.assign({}, props, {
        primaryMeasure,
        targetMeasure,
        comparativeMeasure,
        viewBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=BulletChart.js.map