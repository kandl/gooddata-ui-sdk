// (C) 2007-2022 GoodData Corporation
import React, { useEffect, useState } from "react";
import { newBucket } from "@gooddata/sdk-model";
import { BucketNames, useResolveValuesWithPlaceholders, withContexts, } from "@gooddata/sdk-ui";
import omit from "lodash/omit.js";
import { invariant } from "ts-invariant";
import { CoreHeadline } from "./CoreHeadline.js";
import { createHeadlineProvider } from "./HeadlineProviderFactory.js";
const WrappedHeadline = withContexts(RenderHeadline);
/**
 * Headline shows a single number or compares two numbers. You can display both measures and attributes.
 *
 * @remarks
 * Headlines have two sections: Measure (primary) and Measure (secondary).
 * You can add one item to each section. If you add two items, the headline also displays the change in percent.
 *
 * See {@link IHeadlineProps} to learn how to configure the Headline and the
 * {@link https://sdk.gooddata.com/gooddata-ui/docs/headline_component.html | headline documentation} for more information.
 *
 * @public
 */
export const Headline = (props) => {
    const [primaryMeasure, secondaryMeasure, filters] = useResolveValuesWithPlaceholders([props.primaryMeasure, props.secondaryMeasure, props.filters], props.placeholdersResolutionContext);
    return React.createElement(WrappedHeadline, Object.assign({}, props, { primaryMeasure, secondaryMeasure, filters }));
};
export function RenderHeadline(props) {
    const { backend, workspace, primaryMeasure } = props;
    invariant(primaryMeasure, "The property primaryMeasure must be specified.");
    const [isEnableNewHeadline, setEnableNewHeadline] = useState();
    // TODO - this block should be removed when removing FF enableNewHeadline (JIRA: EGL-162)
    useEffect(() => {
        if (backend && workspace) {
            backend
                .workspace(workspace)
                .settings()
                .getSettingsForCurrentUser()
                .then((featureFlags) => {
                setEnableNewHeadline(!!featureFlags.enableNewHeadline);
            }, () => {
                setEnableNewHeadline(false);
            });
        }
    }, [backend, workspace]);
    return isEnableNewHeadline !== undefined ? (React.createElement(CoreHeadline, Object.assign({}, toCoreHeadlineProps(props, isEnableNewHeadline)))) : null;
}
export function toCoreHeadlineProps(props, enableNewHeadline) {
    const primaryMeasure = props.primaryMeasure;
    const secondaryMeasures = [props.secondaryMeasure, ...(props.secondaryMeasures || [])];
    const buckets = [
        newBucket(BucketNames.MEASURES, primaryMeasure),
        newBucket(BucketNames.SECONDARY_MEASURES, ...secondaryMeasures),
    ];
    const newProps = omit(props, [
        "primaryMeasure",
        "secondaryMeasure",
        "filters",
        "backend",
    ]);
    const provider = createHeadlineProvider(buckets, props.config, enableNewHeadline);
    return Object.assign(Object.assign({}, newProps), { headlineTransformation: provider.getHeadlineTransformationComponent(), execution: createExecution(provider, buckets, props), exportTitle: props.exportTitle || "Headline" });
}
function createExecution(provider, buckets, props) {
    const { backend, workspace, execConfig, filters } = props;
    const executionFactory = backend.withTelemetry("Headline", props).workspace(workspace).execution();
    return provider.createExecution(executionFactory, {
        buckets,
        filters: filters,
        executionConfig: execConfig,
    });
}
//# sourceMappingURL=Headline.js.map