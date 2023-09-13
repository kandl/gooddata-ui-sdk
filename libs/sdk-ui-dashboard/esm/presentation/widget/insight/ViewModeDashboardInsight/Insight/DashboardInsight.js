// (C) 2020-2023 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { insightProperties, insightSetFilters, insightVisualizationUrl, objRefToString, widgetRef, } from "@gooddata/sdk-model";
import { useBackendStrict, useWorkspaceStrict, } from "@gooddata/sdk-ui";
import stringify from "json-stable-stringify";
import cx from "classnames";
import { useDashboardComponentsContext } from "../../../../dashboardContexts/index.js";
import { selectColorPalette, selectDrillableItems, selectIsExport, selectLocale, selectMapboxToken, selectSeparators, selectSettings, useDashboardAsyncRender, useDashboardSelector, useWidgetExecutionsHandler, selectIsInEditMode, } from "../../../../../model/index.js";
import { useResolveDashboardInsightProperties } from "../useResolveDashboardInsightProperties.js";
import { useWidgetFilters } from "../../../common/index.js";
import { useDashboardInsightDrills } from "./useDashboardInsightDrills.js";
import { CustomError } from "../CustomError/CustomError.js";
import { DASHBOARD_LAYOUT_RESPONSIVE_SMALL_WIDTH } from "../../../../constants/index.js";
import { IntlWrapper } from "../../../../localization/index.js";
import { InsightBody } from "../../InsightBody.js";
import { useHandlePropertiesPushData } from "./useHandlePropertiesPushData.js";
const selectCommonDashboardInsightProps = createSelector([selectLocale, selectSettings, selectColorPalette], (locale, settings, colorPalette) => ({
    locale,
    settings,
    colorPalette,
}));
const selectChartConfig = createSelector([selectMapboxToken, selectSeparators, selectDrillableItems, selectIsExport, selectIsInEditMode], (mapboxToken, separators, drillableItems, isExportMode, isInEditMode) => ({
    mapboxToken,
    separators,
    forceDisableDrillOnAxes: !(drillableItems === null || drillableItems === void 0 ? void 0 : drillableItems.length),
    isExportMode,
    isInEditMode,
}));
/**
 * @internal
 */
export const DashboardInsight = (props) => {
    var _a;
    const { insight, widget, clientHeight, clientWidth, backend, workspace, onError, onDrill: onDrillFn, onLoadingChanged, onExportReady, ErrorComponent: CustomErrorComponent, LoadingComponent: CustomLoadingComponent, } = props;
    const ref = widgetRef(widget);
    // Custom components
    const { ErrorComponent, LoadingComponent } = useDashboardComponentsContext({
        ErrorComponent: CustomErrorComponent,
        LoadingComponent: CustomLoadingComponent,
    });
    // Context
    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);
    const executionsHandler = useWidgetExecutionsHandler(ref);
    // State props
    const { locale, settings, colorPalette } = useDashboardSelector(selectCommonDashboardInsightProps);
    const { enableKDWidgetCustomHeight } = useDashboardSelector(selectSettings);
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const chartConfig = useDashboardSelector(selectChartConfig);
    // Loading and rendering
    const [isVisualizationLoading, setIsVisualizationLoading] = useState(false);
    const [visualizationError, setVisualizationError] = useState();
    const { onRequestAsyncRender, onResolveAsyncRender } = useDashboardAsyncRender(objRefToString(ref));
    const handleLoadingChanged = useCallback(({ isLoading }) => {
        if (isLoading) {
            onRequestAsyncRender();
            // if we started loading, any previous vis error is obsolete at this point, get rid of it
            setVisualizationError(undefined);
        }
        else {
            onResolveAsyncRender();
        }
        executionsHandler.onLoadingChanged({ isLoading });
        setIsVisualizationLoading(isLoading);
        onLoadingChanged === null || onLoadingChanged === void 0 ? void 0 : onLoadingChanged({ isLoading });
    }, [onLoadingChanged, executionsHandler.onLoadingChanged]);
    // Filtering
    const { result: filtersForInsight, status: filtersStatus, error: filtersError, } = useWidgetFilters(widget, insight);
    const insightWithAddedFilters = useMemo(() => insightSetFilters(insight, filtersForInsight), [
        insight,
        /**
         * We use stringified value to avoid setting equal filters. This prevents cascading cache invalidation
         * and expensive re-renders down the line. The stringification is worth it as the filters are usually
         * pretty small thus saving more time than it is taking.
         */
        stringify(filtersForInsight),
    ]);
    const insightWithAddedWidgetProperties = useResolveDashboardInsightProperties({
        insight: insightWithAddedFilters !== null && insightWithAddedFilters !== void 0 ? insightWithAddedFilters : insight,
        widget,
    });
    const { drillableItems, onDrill, onPushData } = useDashboardInsightDrills({
        widget,
        insight,
        onDrill: onDrillFn,
    });
    const handlePropertiesPushData = useHandlePropertiesPushData(widget, insight);
    const handlePushData = useCallback((data) => {
        onPushData(data);
        executionsHandler.onPushData(data);
        handlePropertiesPushData(data);
    }, [onPushData, executionsHandler.onPushData, handlePropertiesPushData]);
    const isPositionRelative = insight &&
        insightVisualizationUrl(insight).includes("headline") &&
        clientWidth &&
        clientWidth < DASHBOARD_LAYOUT_RESPONSIVE_SMALL_WIDTH &&
        !enableKDWidgetCustomHeight;
    // Error handling
    const handleError = useCallback((error) => {
        setVisualizationError(error);
        onError === null || onError === void 0 ? void 0 : onError(error);
        executionsHandler.onError(error);
    }, [onError, executionsHandler.onError]);
    const effectiveError = filtersError !== null && filtersError !== void 0 ? filtersError : visualizationError;
    // CSS
    const insightPositionStyle = useMemo(() => {
        return {
            width: "100%",
            height: "100%",
            position: 
            // Headline violates the layout contract.
            // It should fit parent height and adapt to it as other visualizations.
            // Now, it works differently for the Headline - parent container adapts to Headline size.
            isPositionRelative ? "relative" : "absolute",
        };
    }, [isPositionRelative]);
    const insightWrapperStyle = useMemo(() => {
        return isVisualizationLoading || effectiveError ? { height: 0 } : undefined;
    }, [isVisualizationLoading, effectiveError]);
    const visualizationProperties = insightProperties(insightWithAddedWidgetProperties);
    const isZoomable = (_a = visualizationProperties === null || visualizationProperties === void 0 ? void 0 : visualizationProperties.controls) === null || _a === void 0 ? void 0 : _a.zoomInsight;
    return (React.createElement("div", { className: cx("visualization-content", { "in-edit-mode": isInEditMode }) },
        React.createElement("div", { className: cx("gd-visualization-content", { zoomable: isZoomable }), style: insightPositionStyle },
            React.createElement(IntlWrapper, { locale: locale },
                filtersStatus === "running" || isVisualizationLoading ? React.createElement(LoadingComponent, null) : null,
                effectiveError ? (React.createElement(CustomError, { error: effectiveError, isCustomWidgetHeightEnabled: !!(settings === null || settings === void 0 ? void 0 : settings.enableKDWidgetCustomHeight), height: clientHeight, width: clientWidth })) : null,
                filtersStatus === "success" ? (React.createElement("div", { className: "insight-view-visualization", style: insightWrapperStyle },
                    React.createElement(InsightBody, { widget: widget, insight: insightWithAddedWidgetProperties, backend: effectiveBackend, workspace: effectiveWorkspace, drillableItems: drillableItems, onDrill: onDrill, config: chartConfig, onLoadingChanged: handleLoadingChanged, locale: locale, settings: settings, colorPalette: colorPalette, onError: handleError, pushData: handlePushData, ErrorComponent: ErrorComponent, LoadingComponent: LoadingComponent, onExportReady: onExportReady }))) : null))));
};
//# sourceMappingURL=DashboardInsight.js.map