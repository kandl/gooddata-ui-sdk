// (C) 2007-2022 GoodData Corporation
import React from "react";
import { bucketsAttributes, MeasureGroupIdentifier, newBucket, newDimension, } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, withContexts, } from "@gooddata/sdk-ui";
import { CoreXirr } from "./CoreXirr.js";
import omit from "lodash/omit.js";
const WrappedXirr = withContexts(RenderXirr);
/**
 * Xirr computes the {@link https://en.wikipedia.org/wiki/Internal_rate_of_return | Internal Rate of Return} from the given measure and date dimension.
 *
 *
 * @remarks
 * The "X" in the name means that the returns do not have to happen periodically (as in the standard IRR), but they
 * can {@link https://en.wikipedia.org/wiki/Internal_rate_of_return#Exact_dates_of_cash_flows | happen at any day}.
 * You must specify both the measure and date dimension.
 *
 * For date parsing, we currently use the browser's Date constructor. There might be some differences
 * between how browsers implement this, so for best results use the Day granularity if possible.
 *
 * See {@link IXirrProps} to learn how to configure the Xirr.
 *
 * @beta
 */
export const Xirr = (props) => {
    const [measure, attribute, filters] = useResolveValuesWithPlaceholders([props.measure, props.attribute, props.filters], props.placeholdersResolutionContext);
    return React.createElement(WrappedXirr, Object.assign({}, props, { measure, attribute, filters }));
};
export function RenderXirr(props) {
    return React.createElement(CoreXirr, Object.assign({}, toCoreXirrProps(props)));
}
export function toCoreXirrProps(props) {
    const buckets = [
        newBucket(BucketNames.MEASURES, props.measure),
        newBucket(BucketNames.ATTRIBUTE, props.attribute),
    ];
    const newProps = omit(props, [
        "measure",
        "attribute",
        "filters",
        "backend",
    ]);
    return Object.assign(Object.assign({}, newProps), { execution: createExecution(buckets, props), exportTitle: props.exportTitle || "Xirr" });
}
function createExecution(buckets, props) {
    const { backend, workspace, execConfig } = props;
    return backend
        .withTelemetry("Xirr", props)
        .workspace(workspace)
        .execution()
        .forBuckets(buckets, props.filters)
        .withDimensions(newDimension([MeasureGroupIdentifier, ...bucketsAttributes(buckets)]))
        .withExecConfig(execConfig);
}
//# sourceMappingURL=Xirr.js.map