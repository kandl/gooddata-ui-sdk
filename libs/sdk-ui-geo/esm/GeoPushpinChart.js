// (C) 2019-2023 GoodData Corporation
import React from "react";
import compact from "lodash/compact.js";
import omit from "lodash/omit.js";
import { CoreGeoChart } from "./core/CoreGeoChart.js";
import { BucketNames, IntlTranslationsProvider, IntlWrapper, withContexts, useResolveValuesWithPlaceholders, } from "@gooddata/sdk-ui";
import { isGeoPushpinChartProps, } from "./GeoChart.js";
import { bucketsAttributes, bucketsMeasures, disableComputeRatio, MeasureGroupIdentifier, newBucket, newDimension, } from "@gooddata/sdk-model";
import { withTheme } from "@gooddata/sdk-ui-theme-provider";
const getBuckets = (props) => {
    const { color, segmentBy, size, config } = props;
    const buckets = [
        newBucket(BucketNames.SIZE, ...(size ? [disableComputeRatio(size)] : [])),
        newBucket(BucketNames.COLOR, ...(color ? [disableComputeRatio(color)] : [])),
    ];
    if (isGeoPushpinChartProps(props)) {
        const { location } = props;
        buckets.push(newBucket(BucketNames.LOCATION, ...(location ? [location] : [])));
    }
    else {
        const { latitude, longitude } = props;
        buckets.push(newBucket(BucketNames.LATITUDE, ...(latitude ? [latitude] : [])));
        buckets.push(newBucket(BucketNames.LONGITUDE, ...(longitude ? [longitude] : [])));
    }
    buckets.push(newBucket(BucketNames.SEGMENT, ...(segmentBy ? [segmentBy] : [])));
    const tooltipText = config?.[BucketNames.TOOLTIP_TEXT];
    if (tooltipText) {
        buckets.push(newBucket(BucketNames.TOOLTIP_TEXT, tooltipText));
    }
    return buckets;
};
/**
 * @internal
 */
export function getGeoChartDimensions(def) {
    const buckets = def.buckets;
    const measures = bucketsMeasures(buckets);
    const attributes = bucketsAttributes(buckets);
    return compact([measures.length > 0 && newDimension([MeasureGroupIdentifier]), newDimension(attributes)]);
}
/**
 * Specifies props that are on geo chart props but not on core chart props - these must not be passed
 * down to core chart.
 */
const getNonCoreProps = (props) => {
    const base = [
        "backend",
        "workspace",
        "segmentBy",
        "filters",
        "sortBy",
        "color",
        "size",
    ];
    if (isGeoPushpinChartProps(props)) {
        return [...base, "location"];
    }
    return [...base, "longitude", "latitude"];
};
function GeoPushpinChartInner(props) {
    const { backend, workspace, sortBy, filters, exportTitle, execConfig = {} } = props;
    const buckets = getBuckets(props);
    const newProps = omit(props, getNonCoreProps(props));
    const execution = backend
        .withTelemetry("GeoPushpinChart", props)
        .workspace(workspace)
        .execution()
        .forBuckets(buckets, filters)
        .withSorting(...(sortBy || []))
        .withDimensions(getGeoChartDimensions)
        .withExecConfig(execConfig);
    return (React.createElement(IntlWrapper, { locale: props.locale },
        React.createElement(IntlTranslationsProvider, null, (translationProps) => {
            return (React.createElement(CoreGeoChart, { intl: translationProps.intl, execution: execution, exportTitle: exportTitle || "GeoPushpinChart", ...newProps }));
        })));
}
const WrappedGeoPushpinChart = withTheme(withContexts(GeoPushpinChartInner));
const GeoPushpinChartLocation = (props) => {
    const [location, size, color, segmentBy, filters, sortBy] = useResolveValuesWithPlaceholders([props.location, props.size, props.color, props.segmentBy, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return React.createElement(WrappedGeoPushpinChart, { ...props, ...{ location, size, color, segmentBy, filters, sortBy } });
};
const GeoPushpinChartLatitudeLongitude = (props) => {
    const [longitude, latitude, size, color, segmentBy, filters, sortBy] = useResolveValuesWithPlaceholders([
        props.longitude,
        props.latitude,
        props.size,
        props.color,
        props.segmentBy,
        props.filters,
        props.sortBy,
    ], props.placeholdersResolutionContext);
    return (React.createElement(WrappedGeoPushpinChart, { ...props, ...{ longitude, latitude, size, color, segmentBy, filters, sortBy } }));
};
/**
 * @public
 */
export const GeoPushpinChart = (props) => {
    if (isGeoPushpinChartProps(props)) {
        return React.createElement(GeoPushpinChartLocation, { ...props });
    }
    return React.createElement(GeoPushpinChartLatitudeLongitude, { ...props });
};
//# sourceMappingURL=GeoPushpinChart.js.map