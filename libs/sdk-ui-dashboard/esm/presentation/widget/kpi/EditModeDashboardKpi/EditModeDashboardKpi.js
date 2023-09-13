// (C) 2022-2023 GoodData Corporation
import React, { useCallback, useEffect, useMemo } from "react";
import cx from "classnames";
import { useIntl } from "react-intl";
import { widgetRef } from "@gooddata/sdk-model";
import { NoDataSdkError, useBackendStrict, useWorkspaceStrict } from "@gooddata/sdk-ui";
import { useDashboardSelector, useWidgetExecutionsHandler, selectEnableWidgetCustomHeight, selectSeparators, selectDisableKpiDashboardHeadlineUnderline, useDashboardDispatch, selectWidgetCoordinatesByRef, selectFilterContextFilters, uiActions, useWidgetSelection, selectIsDashboardSaving, changeKpiWidgetHeader, selectAllCatalogMeasuresMap, selectIsEmbedded, selectDisableDefaultDrills, } from "../../../../model/index.js";
import { DashboardItemKpi } from "../../../presentationComponents/index.js";
import { useDashboardComponentsContext } from "../../../dashboardContexts/index.js";
import { ConfigurationBubble } from "../../common/index.js";
import { getKpiResult, KpiRenderer, useKpiData, useKpiExecutionDataView } from "../common/index.js";
import { useOptimisticMeasureUpdate } from "./useOptimisticMeasureUpdate.js";
import { EditableKpiHeadline } from "./EditModeKpiHeadline.js";
import { useKpiDrill } from "../common/useKpiDrill.js";
export const EditModeDashboardKpi = (props) => {
    const { kpiWidget, backend: customBackend, workspace: customWorkspace, ErrorComponent: CustomErrorComponent, LoadingComponent: CustomLoadingComponent, onError, } = props;
    const intl = useIntl();
    const { ErrorComponent, LoadingComponent, KpiWidgetComponentSet } = useDashboardComponentsContext({
        ErrorComponent: CustomErrorComponent,
        LoadingComponent: CustomLoadingComponent,
    });
    const KpiConfigurationComponent = KpiWidgetComponentSet.configuration.WidgetConfigPanelComponent;
    const { isChangingMeasure, titleToShow } = useOptimisticMeasureUpdate(kpiWidget);
    const backend = useBackendStrict(customBackend);
    const workspace = useWorkspaceStrict(customWorkspace);
    const dashboardFilters = useDashboardSelector(selectFilterContextFilters);
    const { error: kpiDataError, result: kpiDataResult, status: kpiDataStatus, } = useKpiData({ kpiWidget, dashboardFilters });
    const { primaryMeasure, secondaryMeasure, effectiveFilters } = kpiDataResult !== null && kpiDataResult !== void 0 ? kpiDataResult : {};
    const enableCompactSize = useDashboardSelector(selectEnableWidgetCustomHeight);
    const separators = useDashboardSelector(selectSeparators);
    const disableDrillUnderline = useDashboardSelector(selectDisableKpiDashboardHeadlineUnderline);
    const isDrillable = kpiWidget.drills.length > 0;
    const isSaving = useDashboardSelector(selectIsDashboardSaving);
    const isEditable = !isSaving;
    const dispatch = useDashboardDispatch();
    const coordinates = useDashboardSelector(selectWidgetCoordinatesByRef(widgetRef(kpiWidget)));
    const onWidgetDelete = useCallback(() => {
        dispatch(uiActions.openKpiDeleteDialog(coordinates));
    }, [dispatch, coordinates]);
    const measures = useDashboardSelector(selectAllCatalogMeasuresMap);
    const currentMeasure = measures.get(kpiWidget.kpi.metric);
    const onWidgetTitleChanged = useCallback((newTitle) => {
        if (newTitle) {
            dispatch(changeKpiWidgetHeader(kpiWidget.ref, { title: newTitle }));
        }
        else if (currentMeasure) {
            dispatch(changeKpiWidgetHeader(kpiWidget.ref, { title: currentMeasure.measure.title }));
        }
    }, [currentMeasure, dispatch, kpiWidget.ref]);
    const { error, result, status } = useKpiExecutionDataView({
        backend,
        workspace,
        primaryMeasure,
        secondaryMeasure,
        effectiveFilters,
        shouldLoad: kpiDataStatus === "success",
    });
    const isLoading = isChangingMeasure ||
        status === "loading" ||
        status === "pending" ||
        kpiDataStatus === "loading" ||
        kpiDataStatus === "pending";
    const executionsHandler = useWidgetExecutionsHandler(widgetRef(kpiWidget));
    const { isSelectable, isSelected, onSelected, hasConfigPanelOpen } = useWidgetSelection(widgetRef(kpiWidget));
    const isEmbedded = useDashboardSelector(selectIsEmbedded);
    const disableDefaultDrills = useDashboardSelector(selectDisableDefaultDrills);
    const isClickEnabled = isSelected && !isEmbedded && !disableDefaultDrills;
    const onDrill = useKpiDrill(kpiWidget);
    const handleOnDrill = useCallback((drillContext) => {
        return onDrill({
            dataView: result === null || result === void 0 ? void 0 : result.dataView,
            drillContext,
            drillDefinitions: kpiWidget.drills,
            widgetRef: widgetRef(kpiWidget),
        });
    }, [onDrill, result, kpiWidget]);
    const handlePanelClosed = useCallback(() => dispatch(uiActions.setConfigurationPanelOpened(false)), [dispatch]);
    const renderBeforeContent = useMemo(() => {
        const hasConfigComponent = !!KpiConfigurationComponent;
        const shouldHaveConfigRendered = isSelected && hasConfigPanelOpen;
        if (!hasConfigComponent || !shouldHaveConfigRendered) {
            return undefined;
        }
        return function KpiConfiguration() {
            return (React.createElement(ConfigurationBubble, { onClose: handlePanelClosed },
                React.createElement(KpiConfigurationComponent, { widget: kpiWidget })));
        };
    }, [KpiConfigurationComponent, hasConfigPanelOpen, isSelected, kpiWidget, handlePanelClosed]);
    useEffect(() => {
        if (error) {
            onError === null || onError === void 0 ? void 0 : onError(error);
            executionsHandler.onError(error);
        }
    }, [error, executionsHandler, onError]);
    useEffect(() => {
        if (result) {
            // empty data is considered an error for execution handling
            if (result.rawData().isEmpty()) {
                executionsHandler.onError(new NoDataSdkError());
            }
            else {
                executionsHandler.onSuccess(result.result(), result.warnings());
            }
        }
    }, [result, executionsHandler]);
    const kpiResult = useMemo(() => {
        return getKpiResult(result, primaryMeasure, secondaryMeasure, separators);
    }, [primaryMeasure, result, secondaryMeasure, separators]);
    return (React.createElement(DashboardItemKpi, { visualizationClassName: cx("s-dashboard-kpi-component", "widget-loaded", "visualization", {
            "kpi-with-pop": kpiWidget.kpi.comparisonType !== "none",
            "content-loading": isLoading,
            "content-loaded": !isLoading,
            "is-editable": isEditable,
        }), contentClassName: cx({ "is-editable": isEditable }), renderBeforeContent: renderBeforeContent, renderAfterContent: () => {
            if (isSelected) {
                return (React.createElement("div", { className: "dash-item-action dash-item-action-delete gd-icon-trash", onClick: onWidgetDelete }));
            }
            return null;
        }, renderHeadline: (clientHeight) => (React.createElement(EditableKpiHeadline, { title: titleToShow, clientHeight: clientHeight, onTitleChange: onWidgetTitleChanged })), isSelectable: isSelectable, isSelected: isSelected, onSelected: onSelected }, () => {
        var _a;
        if (kpiDataStatus === "loading" || kpiDataStatus === "pending") {
            return React.createElement(LoadingComponent, null);
        }
        if (kpiDataStatus === "error") {
            return React.createElement(ErrorComponent, { message: kpiDataError.message });
        }
        return (React.createElement(KpiRenderer, { kpi: kpiWidget, kpiResult: kpiResult, filters: (_a = kpiDataResult === null || kpiDataResult === void 0 ? void 0 : kpiDataResult.effectiveFilters) !== null && _a !== void 0 ? _a : [], separators: separators, enableCompactSize: enableCompactSize, error: error, errorHelp: intl.formatMessage({ id: "kpi.error.view" }), isLoading: isLoading, onDrill: handleOnDrill, isDrillable: isDrillable, isKpiValueClickDisabled: !isClickEnabled, disableDrillUnderline: disableDrillUnderline }));
    }));
};
//# sourceMappingURL=EditModeDashboardKpi.js.map