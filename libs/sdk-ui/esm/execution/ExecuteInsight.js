// (C) 2019-2022 GoodData Corporation
import React from "react";
import { withExecution } from "./withExecution.js";
import isEqual from "lodash/isEqual.js";
import { withContexts } from "../base/index.js";
import { invariant } from "ts-invariant";
const CoreExecute = (props) => {
    const { children, error, isLoading, reload, result, LoadingComponent, ErrorComponent } = props;
    if (ErrorComponent && error) {
        return React.createElement(ErrorComponent, { error: error });
    }
    if (LoadingComponent && isLoading) {
        return React.createElement(LoadingComponent, null);
    }
    if (LoadingComponent && ErrorComponent && !result) {
        return null;
    }
    return children({
        error,
        isLoading,
        reload,
        result,
    });
};
function componentName(props) {
    return props.componentName || "ExecuteInsight";
}
function exportTitle(props) {
    return props.exportTitle || componentName(props);
}
/**
 * Gets data for a specific stored insight.
 *
 * @public
 */
export const ExecuteInsight = withContexts(withExecution({
    exportTitle,
    execution: async (props) => {
        const { insight: insightRef, filters, sorts, dimensions, dateFormat, backend, workspace, executeByReference, } = props;
        invariant(backend, "The backend in ExecuteInsight must be defined. Either pass it as a prop or make sure there is a BackendProvider up the component tree.");
        invariant(workspace, "The workspace in ExecuteInsight must be defined. Either pass it as a prop or make sure there is a WorkspaceProvider up the component tree.");
        const insight = await backend.workspace(workspace).insights().getInsight(insightRef);
        const executionFactory = backend.workspace(workspace).execution();
        const executeFn = (executeByReference ? executionFactory.forInsightByRef : executionFactory.forInsight).bind(executionFactory);
        let insightExecution = executeFn(insight, filters);
        if (sorts) {
            const resolvedSorts = typeof sorts === "function" ? sorts(insightExecution.definition, props) : sorts;
            insightExecution = insightExecution.withSorting(...resolvedSorts);
        }
        if (dimensions) {
            const resolvedDimensions = typeof dimensions === "function"
                ? dimensions(insightExecution.definition, props)
                : dimensions;
            insightExecution = insightExecution.withDimensions(...resolvedDimensions);
        }
        if (dateFormat) {
            const resolvedDateFormat = typeof dateFormat === "function"
                ? dateFormat(insightExecution.definition, props)
                : dateFormat;
            insightExecution = insightExecution.withDateFormat(resolvedDateFormat);
        }
        return insightExecution;
    },
    events: (props) => {
        const { onError, onLoadingChanged, onLoadingFinish, onLoadingStart, onExportReady } = props;
        return {
            onError,
            onLoadingChanged,
            onLoadingFinish,
            onLoadingStart,
            onExportReady,
        };
    },
    shouldRefetch: (prevProps, nextProps) => {
        const relevantProps = [
            "onError",
            "onLoadingChanged",
            "onLoadingFinish",
            "onLoadingStart",
        ];
        const relevantPropsDeepEqual = [
            "insight",
            "filters",
            "window",
        ];
        return (relevantProps.some((propName) => prevProps[propName] !== nextProps[propName]) ||
            relevantPropsDeepEqual.some((propName) => !isEqual(prevProps[propName], nextProps[propName])));
    },
    loadOnMount: (props) => {
        const { loadOnMount = true } = props !== null && props !== void 0 ? props : {};
        return loadOnMount;
    },
    window: (props) => props.window,
})(CoreExecute));
//# sourceMappingURL=ExecuteInsight.js.map