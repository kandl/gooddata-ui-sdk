// (C) 2019-2022 GoodData Corporation
import React from "react";
import { withExecution } from "./withExecution.js";
import isEqual from "lodash/isEqual.js";
import { useResolveValuesWithPlaceholders, withContexts, UnexpectedSdkError, } from "../base/index.js";
import { createExecution } from "./createExecution.js";
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
    return props.componentName || "Execute";
}
function exportTitle(props) {
    return props.exportTitle || componentName(props);
}
const WrappedExecute = withContexts(withExecution({
    exportTitle,
    execution: (props) => {
        const { seriesBy, slicesBy, totals, filters, sortBy } = props;
        if (!(seriesBy === null || seriesBy === void 0 ? void 0 : seriesBy.length) && !(slicesBy === null || slicesBy === void 0 ? void 0 : slicesBy.length)) {
            throw new UnexpectedSdkError("In the Execute component, either seriesBy or slicesBy must be defined and must contain at least one item");
        }
        return createExecution(Object.assign(Object.assign({}, props), { componentName: componentName(props), seriesBy: seriesBy, slicesBy: slicesBy, totals: totals, filters: filters, sortBy: sortBy }));
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
            "seriesBy",
            "slicesBy",
            "totals",
            "filters",
            "sortBy",
            "window",
            "workspace",
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
/**
 * The executor provides a more curated experience to obtain and work with data from backends.
 *
 * @remarks
 * It is aligned with the `DataAccess` infrastructure which exposes the underlying data as data series that can be
 * sliced by additional attributes.
 *
 * Once the executor finishes, the {@link DataViewFacade.data} method will expose the data as series and
 * slices according to the specification to the executor.
 * Note that if the resulting data is empty this will NOT throw a NoDataError. It is the responsibility
 * of the child component to handle that if they need to.
 *
 * See {@link IDataAccessMethods} for additional documentation
 * @public
 */
export const Execute = (props) => {
    const [seriesBy, slicesBy, totals, filters, sortBy] = useResolveValuesWithPlaceholders([props.seriesBy, props.slicesBy, props.totals, props.filters, props.sortBy], props.placeholdersResolutionContext);
    return React.createElement(WrappedExecute, Object.assign({}, props, { seriesBy, slicesBy, totals, filters, sortBy }));
};
//# sourceMappingURL=Execute.js.map