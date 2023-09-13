// (C) 2020-2022 GoodData Corporation
import React, { useCallback, useMemo, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { insightSetFilters, insightVisualizationUrl } from "@gooddata/sdk-model";
import { useBackendStrict, useWorkspaceStrict, } from "@gooddata/sdk-ui";
import { useDashboardSelector, selectColorPalette, selectLocale, selectMapboxToken, selectSeparators, selectSettings, selectIsExport, selectDrillableItems, } from "../../../../../model/index.js";
import { useWidgetFilters } from "../../../common/index.js";
import { useResolveDashboardInsightProperties } from "../useResolveDashboardInsightProperties.js";
import { useDrillDialogInsightDrills } from "./useDrillDialogInsightDrills.js";
import { CustomError } from "../CustomError/CustomError.js";
import { IntlWrapper } from "../../../../localization/index.js";
import { InsightBody } from "../../InsightBody.js";
const insightStyle = { width: "100%", height: "100%", position: "relative", flex: "1 1 auto" };
const selectCommonDashboardInsightProps = createSelector([selectLocale, selectSettings, selectColorPalette], (locale, settings, colorPalette) => ({
    locale,
    settings,
    colorPalette,
}));
const selectChartConfig = createSelector([selectMapboxToken, selectSeparators, selectDrillableItems, selectIsExport], (mapboxToken, separators, drillableItems, isExport) => ({
    mapboxToken,
    separators,
    forceDisableDrillOnAxes: !drillableItems.length,
    isExportMode: isExport,
}));
/**
 * @internal
 */
export const DrillDialogInsight = (props) => {
    const { insight, widget, backend, workspace, onError, onDrill: onDrillFn, onExportReady, onLoadingChanged, pushData, ErrorComponent, LoadingComponent, } = props;
    // Context
    const effectiveBackend = useBackendStrict(backend);
    const effectiveWorkspace = useWorkspaceStrict(workspace);
    // State props
    const { locale, settings, colorPalette } = useDashboardSelector(selectCommonDashboardInsightProps);
    const chartConfig = useDashboardSelector(selectChartConfig);
    // Loading and rendering
    const [isVisualizationLoading, setIsVisualizationLoading] = useState(false);
    const [visualizationError, setVisualizationError] = useState();
    const handleLoadingChanged = useCallback(({ isLoading }) => {
        setIsVisualizationLoading(isLoading);
        onLoadingChanged === null || onLoadingChanged === void 0 ? void 0 : onLoadingChanged({ isLoading });
    }, []);
    // Filtering
    const { result: filtersForInsight, status: filtersStatus, error: filtersError, } = useWidgetFilters(widget, insight);
    const insightWithAddedFilters = useMemo(() => insightSetFilters(insight, filtersForInsight), [insight, filtersForInsight]);
    const insightWithAddedWidgetProperties = useResolveDashboardInsightProperties({
        insight: insightWithAddedFilters !== null && insightWithAddedFilters !== void 0 ? insightWithAddedFilters : insight,
        widget,
    });
    const { drillableItems, onDrill, onPushData } = useDrillDialogInsightDrills({
        widget,
        insight: insightWithAddedFilters !== null && insightWithAddedFilters !== void 0 ? insightWithAddedFilters : insight,
        onDrill: onDrillFn,
    });
    const handlePushData = useCallback((data) => {
        onPushData(data);
        pushData === null || pushData === void 0 ? void 0 : pushData(data);
    }, [onPushData, pushData]);
    // CSS
    const insightPositionStyle = useMemo(() => {
        return {
            width: "100%",
            height: "100%",
            position: 
            // Headline violates the layout contract.
            // It should fit parent height and adapt to it as other visualizations.
            // Now, it works differently for the Headline - parent container adapts to Headline size.
            insight && insightVisualizationUrl(insight).includes("headline") ? "relative" : "absolute",
        };
    }, [insight]);
    // Error handling
    const handleError = useCallback((error) => {
        setVisualizationError(error);
        onError === null || onError === void 0 ? void 0 : onError(error);
    }, [onError]);
    const effectiveError = filtersError !== null && filtersError !== void 0 ? filtersError : visualizationError;
    const insightWrapperStyle = useMemo(() => {
        return isVisualizationLoading || effectiveError ? { height: 0 } : undefined;
    }, [isVisualizationLoading, effectiveError]);
    return (React.createElement("div", { style: insightStyle },
        React.createElement("div", { style: insightPositionStyle },
            React.createElement(IntlWrapper, { locale: locale },
                filtersStatus === "running" || isVisualizationLoading ? React.createElement(LoadingComponent, null) : null,
                effectiveError ? (React.createElement(CustomError, { error: effectiveError, 
                    // drill dialog does not measure its size but is always large enough to fit the full content
                    forceFullContent: true })) : null,
                filtersStatus === "success" ? (React.createElement("div", { className: "insight-view-visualization", style: insightWrapperStyle },
                    React.createElement(InsightBody, { widget: widget, insight: insightWithAddedWidgetProperties, backend: effectiveBackend, workspace: effectiveWorkspace, drillableItems: drillableItems, onDrill: onDrill, config: chartConfig, onLoadingChanged: handleLoadingChanged, locale: locale, settings: settings, colorPalette: colorPalette, onError: handleError, onExportReady: onExportReady, pushData: handlePushData, ErrorComponent: ErrorComponent, LoadingComponent: LoadingComponent }))) : null))));
};
//# sourceMappingURL=DrillDialogInsight.js.map