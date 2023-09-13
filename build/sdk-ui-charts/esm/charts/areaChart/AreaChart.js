// (C) 2007-2023 GoodData Corporation
import React from "react";
import { applyRatioRule, newBucket, } from "@gooddata/sdk-model";
import { truncate } from "../_commons/truncate.js";
import { ViewByAttributesLimit } from "../../interfaces/index.js";
import { BucketNames, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { stackedChartDimensions } from "../_commons/dimensions.js";
import { CoreAreaChart } from "./CoreAreaChart.js";
import isNil from "lodash/isNil.js";
import { withChart } from "../_base/withChart.js";
import { sanitizeConfig } from "../_commons/sanitizeStacking.js";
//
// Internals
//
const areaChartDefinition = {
    chartName: "AreaChart",
    bucketPropsKeys: ["measures", "viewBy", "stackBy", "filters", "sortBy"],
    bucketsFactory: (props) => {
        const { measures, viewBy, stackBy } = getBucketsProps(props);
        const sanitizedMeasures = applyRatioRule(measures);
        return [
            newBucket(BucketNames.MEASURES, ...sanitizedMeasures),
            newBucket(BucketNames.VIEW, ...viewBy),
            newBucket(BucketNames.STACK, ...stackBy),
        ];
    },
    executionFactory: (props, buckets) => {
        var _a;
        const { backend, workspace, execConfig } = props;
        const sortBy = (_a = props.sortBy) !== null && _a !== void 0 ? _a : [];
        return backend
            .withTelemetry("AreaChart", props)
            .workspace(workspace)
            .execution()
            .forBuckets(buckets, props.filters)
            .withSorting(...sortBy)
            .withDimensions(stackedChartDimensions)
            .withExecConfig(execConfig);
    },
    propOverridesFactory: (props, buckets) => {
        const config = getConfigProps(props);
        return {
            config: sanitizeConfig(buckets, config),
        };
    },
    onBeforePropsConversion: verifyBuckets,
};
function getStackConfiguration(config = {}) {
    const { stackMeasures, stackMeasuresToPercent } = config;
    if (isNil(stackMeasures) && isNil(stackMeasuresToPercent)) {
        return config;
    }
    return Object.assign(Object.assign({}, config), { stacking: Boolean(stackMeasuresToPercent) || Boolean(stackMeasures) });
}
export function getBucketsProps(props) {
    const { measures, stackBy } = props;
    const viewBy = truncate(props.viewBy, ViewByAttributesLimit);
    if (viewBy.length <= 1) {
        return {
            measures: measures || [],
            viewBy: viewBy,
            stackBy: stackBy ? [stackBy] : [],
        };
    }
    // for case viewBy 2 attributes
    const [firstMeasure] = measures; // only take first measure
    const [firstAttribute, secondAttribute] = viewBy; // only take first two attributes
    return {
        measures: [firstMeasure],
        viewBy: [firstAttribute],
        stackBy: [secondAttribute], // one attribute for stackBy which slices measure horizontally
    };
}
export function getConfigProps(props) {
    const viewBy = truncate(props.viewBy, ViewByAttributesLimit);
    if (viewBy.length <= 1) {
        return getStackConfiguration(props.config);
    }
    return Object.assign(Object.assign({}, props.config), { stacking: false, stackMeasures: false, stackMeasuresToPercent: false });
}
/**
 * Show warning to SDK user in console log
 */
function verifyBuckets(props) {
    const viewBy = truncate(props.viewBy, ViewByAttributesLimit);
    if (viewBy.length <= 1) {
        return;
    }
    const { measures = [], stackBy } = props;
    if (measures.length > 1 || stackBy) {
        console.warn("When there are two attributes in viewBy, only first measure is taken and attribute in stackBy is ignored");
    }
}
const WrappedAreaChart = withChart(areaChartDefinition)(CoreAreaChart);
/**
 * Area chart shows data as an area under a line intersecting dots.
 *
 * @remarks
 * It can display either:
 *
 * - multiple measures sliced by a single attribute, as different areas
 * - or a single measure split by one attribute into multiple areas with points intersecting attribute values
 *
 * Areas for multiple measures stack by default. Alternatively, the areas can overlap if `{ stackMeasures: false }`.
 *
 * See {@link IAreaChartProps} to learn how it is possible to configure the AreaChart and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/area_chart_component.html | area chart documentation} for more information.
 *
 * @public
 */
export const AreaChart = (props) => {
    const [measures, viewBy, stackBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.measures, props.viewBy, props.stackBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return (React.createElement(WrappedAreaChart, Object.assign({}, props, {
        measures,
        viewBy,
        stackBy,
        filters,
        sortBy,
    })));
};
//# sourceMappingURL=AreaChart.js.map