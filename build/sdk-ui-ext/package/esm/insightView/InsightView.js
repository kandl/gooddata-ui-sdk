// (C) 2019-2023 GoodData Corporation
import React, { useCallback, useMemo, useRef, useState } from "react";
import { injectIntl } from "react-intl";
import { idRef, insightTitle, insightVisualizationUrl, areObjRefsEqual, insightRef, } from "@gooddata/sdk-model";
import { withContexts, LoadingComponent as DefaultLoading, ErrorComponent as DefaultError, IntlWrapper, useCancelablePromise, convertError, resolveLocale, } from "@gooddata/sdk-ui";
import { withMapboxToken } from "@gooddata/sdk-ui-geo";
import InsightTitle from "./InsightTitle";
import { InsightRenderer } from "./InsightRenderer";
import { InsightError } from "./InsightError";
import { colorPaletteDataLoaderFactory, insightDataLoaderFactory, userWorkspaceSettingsDataLoaderFactory, } from "../dataLoaders";
const InsightViewCore = (props) => {
    const { insight, backend, workspace, filters, executeByReference, showTitle, colorPalette, config, execConfig, locale, drillableItems, onDrill, onLoadingChanged, onExportReady, onError, onInsightLoaded, pushData, ErrorComponent = DefaultError, LoadingComponent = DefaultLoading, TitleComponent = InsightTitle, } = props;
    const [state, setState] = useState({
        isVisualizationLoading: false,
        visualizationError: undefined,
    });
    // ref of the insight last reported by the onInsightLoaded
    const lastReportedRef = useRef();
    const { error: insightError, result: insightResult, status: insightStatus, } = useCancelablePromise({
        promise: async () => {
            const ref = typeof insight === "string" ? idRef(insight, "insight") : insight;
            const insightData = await insightDataLoaderFactory
                .forWorkspace(workspace)
                .getInsight(backend, ref);
            if (!lastReportedRef.current ||
                !areObjRefsEqual(lastReportedRef.current, insightRef(insightData))) {
                onInsightLoaded === null || onInsightLoaded === void 0 ? void 0 : onInsightLoaded(insightData);
                lastReportedRef.current = insightRef(insightData);
            }
            if (executeByReference) {
                /*
                 * In execute-by-reference, filter merging happens on the server
                 */
                return insightData;
            }
            /*
             * In freeform execution, frontend is responsible for filter merging. Code defers the merging to the
             * implementation of analytical backend because the merging may first need to unify how the different
             * filter entities are referenced (id vs uri).
             */
            return backend
                .workspace(workspace)
                .insights()
                .getInsightWithAddedFilters(insightData, filters !== null && filters !== void 0 ? filters : []);
        },
    }, [insight, backend, workspace, executeByReference, filters, onInsightLoaded]);
    const { error: colorPaletteError, result: colorPaletteResult, status: colorPaletteStatus, } = useCancelablePromise({
        promise: () => {
            return colorPaletteDataLoaderFactory.forWorkspace(workspace).getColorPalette(backend);
        },
    }, [backend, workspace]);
    const { error: workspaceSettingsError, result: workspaceSettingsResult, status: workspaceSettingsStatus, } = useCancelablePromise({
        promise: () => {
            return userWorkspaceSettingsDataLoaderFactory
                .forWorkspace(workspace)
                .getUserWorkspaceSettings(backend);
        },
    }, [backend, workspace]);
    // extract the url outside backendWithTelemetry and use it as a dependency instead of the whole insight
    // this reduces the amount of re-renders in case just filters change for example
    const currentInsightVisualizationUrl = insightResult && insightVisualizationUrl(insightResult);
    const backendWithTelemetry = useMemo(() => {
        const telemetryProps = Object.assign({}, props);
        // add a fake prop so that the type of the visualization rendered is present in the telemetry
        if (currentInsightVisualizationUrl) {
            const key = `visualizationUrl_${currentInsightVisualizationUrl}`;
            telemetryProps[key] = true;
        }
        return backend.withTelemetry("InsightView", telemetryProps);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentInsightVisualizationUrl, backend]);
    const handleLoadingChanged = useCallback(({ isLoading }) => {
        setState((oldState) => {
            return {
                isVisualizationLoading: isLoading,
                // if we started loading, any previous vis error is obsolete at this point, get rid of it
                visualizationError: isLoading ? undefined : oldState.visualizationError,
            };
        });
        onLoadingChanged === null || onLoadingChanged === void 0 ? void 0 : onLoadingChanged({ isLoading });
    }, [onLoadingChanged]);
    const handleError = useCallback((visualizationError) => {
        setState((oldState) => {
            return Object.assign(Object.assign({}, oldState), { visualizationError });
        });
        onError === null || onError === void 0 ? void 0 : onError(visualizationError);
    }, [onError]);
    const isDataLoading = insightStatus === "loading" ||
        insightStatus === "pending" ||
        colorPaletteStatus === "loading" ||
        colorPaletteStatus === "pending" ||
        workspaceSettingsStatus === "loading" ||
        workspaceSettingsStatus === "pending";
    const resolveInsightTitle = (insight) => {
        switch (typeof showTitle) {
            case "string":
                return showTitle;
            case "boolean":
                return !isDataLoading && showTitle && insight ? insightTitle(insight) : undefined;
            case "function":
                return !isDataLoading && insight && showTitle(insight);
            default:
                return undefined;
        }
    };
    const resolvedTitle = resolveInsightTitle(insightResult);
    const isLoadingShown = isDataLoading || state.isVisualizationLoading;
    const error = state.visualizationError || insightError || colorPaletteError || workspaceSettingsError;
    return (React.createElement("div", { className: "insight-view-container" },
        resolvedTitle ? React.createElement(TitleComponent, { title: resolvedTitle }) : null,
        isLoadingShown ? React.createElement(LoadingComponent, { className: "insight-view-loader" }) : null,
        error && !isDataLoading ? (React.createElement(InsightError, { error: convertError(error), ErrorComponent: ErrorComponent })) : null,
        React.createElement("div", { className: "insight-view-visualization", 
            // make the visualization div 0 height so that the loading component can take up the whole area
            style: isLoadingShown ? { height: 0 } : undefined },
            React.createElement(InsightRenderer, { insight: insightResult, workspace: workspace, backend: backendWithTelemetry, colorPalette: colorPalette !== null && colorPalette !== void 0 ? colorPalette : colorPaletteResult, config: config, execConfig: execConfig, drillableItems: drillableItems, executeByReference: executeByReference, filters: filters, locale: locale || resolveLocale(workspaceSettingsResult === null || workspaceSettingsResult === void 0 ? void 0 : workspaceSettingsResult.locale), settings: workspaceSettingsResult, ErrorComponent: ErrorComponent, LoadingComponent: LoadingComponent, onDrill: onDrill, onError: handleError, onExportReady: onExportReady, onLoadingChanged: handleLoadingChanged, pushData: pushData }))));
};
export const IntlInsightView = withMapboxToken(withContexts(injectIntl(InsightViewCore)));
/**
 * Renders insight which was previously created and saved in the Analytical Designer.
 *
 * @public
 */
export class InsightView extends React.Component {
    render() {
        return (React.createElement(IntlWrapper, { locale: this.props.locale },
            React.createElement(IntlInsightView, Object.assign({}, this.props))));
    }
}
//# sourceMappingURL=InsightView.js.map