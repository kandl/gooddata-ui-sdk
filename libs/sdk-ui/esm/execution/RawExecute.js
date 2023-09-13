// (C) 2019-2022 GoodData Corporation
import React from "react";
import { withExecution } from "./withExecution.js";
import isEqual from "lodash/isEqual.js";
const CoreExecutor = (props) => {
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
function exportTitle(props) {
    return props.exportTitle || "RawExecute";
}
/**
 * Raw executor is the most basic React component to drive custom executions to obtain
 * data from backends.
 *
 * @remarks
 * The component accepts an instance of prepared execution and drives all the necessary
 * APIs and boilerplate needed to obtain a {@link DataViewFacade}.
 * Note that if the resulting data is empty this will NOT throw a {@link @gooddata/sdk-backend-spi#NoDataError}.
 * It is the responsibility of the child component to handle that if they need to.
 *
 * The rendering is delegated to a child component. This will be called every time the
 * state of the loading changes.
 *
 * @public
 */
export const RawExecute = withExecution({
    exportTitle,
    execution: (props) => props.execution,
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
        const relevantPropsDeepEqual = ["window"];
        return (relevantProps.some((propName) => prevProps[propName] !== nextProps[propName]) ||
            relevantPropsDeepEqual.some((propName) => !isEqual(prevProps[propName], nextProps[propName])) ||
            prevProps.execution.fingerprint() !== nextProps.execution.fingerprint());
    },
    loadOnMount: (props) => {
        const { loadOnMount = true } = props;
        return loadOnMount;
    },
    window: (props) => props.window,
})(CoreExecutor);
//# sourceMappingURL=RawExecute.js.map