// (C) 2020-2022 GoodData Corporation
import React, { memo, useCallback, useEffect, useMemo } from "react";
import { useIntl } from "react-intl";
import { invariant } from "ts-invariant";
import { objRefToString, widgetRef, } from "@gooddata/sdk-model";
import { convertDrillableItemsToPredicates, isSomeHeaderPredicateMatched, NoDataSdkError, } from "@gooddata/sdk-ui";
import { OverlayController, OverlayControllerProvider } from "@gooddata/sdk-ui-kit";
import { filterContextItemsToDashboardFiltersByWidget } from "../../../../converters/index.js";
import { selectDrillableItems, selectCanCreateScheduledMail, selectSettings, selectCurrentUser, useDashboardAsyncRender, useDashboardSelector, useDashboardUserInteraction, useWidgetExecutionsHandler, selectValidConfiguredDrillsByWidgetRef, uiActions, useDashboardDispatch, selectIsKpiAlertOpenedByWidgetRef, selectIsKpiAlertHighlightedByWidgetRef, selectEnableWidgetCustomHeight, selectDateFormat, useWidgetSelection, } from "../../../../model/index.js";
import { DashboardItemHeadline } from "../../../presentationComponents/index.js";
import { KpiAlertDialogWrapper } from "./KpiAlertDialogWrapper.js";
import { useKpiAlertOperations } from "./useKpiAlertOperations.js";
import { DashboardItemWithKpiAlert, evaluateAlertTriggered } from "./KpiAlerts/index.js";
import { useWidgetBrokenAlertsQuery } from "../../common/useWidgetBrokenAlertsQuery.js";
import { dashboardFilterToFilterContextItem, getAlertThresholdInfo, getKpiAlertResult, getKpiResult, KpiRenderer, stripDateDatasets, useKpiExecutionDataView, } from "../common/index.js";
import { DASHBOARD_OVERLAYS_FILTER_Z_INDEX } from "../../../constants/index.js";
const overlayController = OverlayController.getInstance(DASHBOARD_OVERLAYS_FILTER_Z_INDEX);
const KpiExecutorCore = (props) => {
    const { dashboardRef, kpiWidget, backend, workspace, primaryMeasure, secondaryMeasure, effectiveFilters, alert, separators, disableDrillUnderline, isReadOnly, onDrill, onError, onFiltersChange, } = props;
    const intl = useIntl();
    const kpiWidgetRef = widgetRef(kpiWidget);
    const { error, result, status } = useKpiExecutionDataView({
        backend,
        workspace,
        primaryMeasure,
        secondaryMeasure,
        effectiveFilters,
        shouldLoad: true,
    });
    const isLoading = status === "loading" || status === "pending";
    const { error: alertExecutionError, result: alertExecutionResult, status: alertExecutionStatus, } = useKpiExecutionDataView({
        backend,
        workspace,
        primaryMeasure,
        effectiveFilters,
        shouldLoad: true,
    });
    const isAlertExecutionLoading = alertExecutionStatus === "loading" || alertExecutionStatus === "pending";
    const currentUser = useDashboardSelector(selectCurrentUser);
    const canCreateScheduledMail = useDashboardSelector(selectCanCreateScheduledMail);
    const settings = useDashboardSelector(selectSettings);
    const enableCompactSize = useDashboardSelector(selectEnableWidgetCustomHeight);
    const dateFormat = useDashboardSelector(selectDateFormat);
    const drillableItems = useDashboardSelector(selectDrillableItems);
    const widgetDrills = useDashboardSelector(selectValidConfiguredDrillsByWidgetRef(kpiWidgetRef));
    const isAlertDialogOpen = useDashboardSelector(selectIsKpiAlertOpenedByWidgetRef(kpiWidgetRef));
    const isAlertHighlighted = useDashboardSelector(selectIsKpiAlertHighlightedByWidgetRef(kpiWidgetRef));
    const dispatch = useDashboardDispatch();
    const openAlertDialog = useCallback(() => {
        dispatch(uiActions.openKpiAlertDialog(kpiWidgetRef));
    }, [kpiWidgetRef, dispatch]);
    const closeAlertDialog = useCallback(() => {
        dispatch(uiActions.closeKpiAlertDialog());
    }, [dispatch]);
    const { result: brokenAlertsBasicInfo } = useWidgetBrokenAlertsQuery(kpiWidget, alert);
    const isAlertBroken = !!(brokenAlertsBasicInfo === null || brokenAlertsBasicInfo === void 0 ? void 0 : brokenAlertsBasicInfo.length);
    const executionsHandler = useWidgetExecutionsHandler(widgetRef(kpiWidget));
    useEffect(() => {
        const err = error !== null && error !== void 0 ? error : alertExecutionError;
        if (err) {
            onError === null || onError === void 0 ? void 0 : onError(err);
        }
        // for executions we care only about KPI errors
        if (error) {
            executionsHandler.onError(error);
        }
    }, [error, alertExecutionError]);
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
    }, [result]);
    const handleOnDrill = useCallback((drillContext) => {
        if (!onDrill) {
            return false;
        }
        return onDrill({
            dataView: result === null || result === void 0 ? void 0 : result.dataView,
            drillContext,
            drillDefinitions: kpiWidget.drills,
            widgetRef: widgetRef(kpiWidget),
        });
    }, [onDrill, result, kpiWidget]);
    const kpiAlertOperations = useKpiAlertOperations(closeAlertDialog);
    const canSetAlert = canCreateScheduledMail;
    const { onRequestAsyncRender, onResolveAsyncRender } = useDashboardAsyncRender(objRefToString(widgetRef(kpiWidget)));
    useEffect(() => {
        if (isLoading) {
            onRequestAsyncRender();
        }
        else {
            onResolveAsyncRender();
        }
        executionsHandler.onLoadingChanged({ isLoading: !!isLoading });
    }, [isLoading, onRequestAsyncRender, onResolveAsyncRender]);
    const { kpiAlertDialogClosed, kpiAlertDialogOpened } = useDashboardUserInteraction();
    const kpiResult = getKpiResult(result, primaryMeasure, secondaryMeasure, separators);
    const kpiAlertResult = getKpiAlertResult(alertExecutionResult, primaryMeasure, separators);
    const { isThresholdRepresentingPercent, thresholdPlaceholder } = useMemo(() => getAlertThresholdInfo(kpiResult, intl), [kpiResult, intl]);
    const predicates = convertDrillableItemsToPredicates(drillableItems);
    const isDrillable = ((kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureDescriptor) &&
        result &&
        isSomeHeaderPredicateMatched(predicates, kpiResult.measureDescriptor, result)) ||
        widgetDrills.length > 0;
    const alertSavingStatus = kpiAlertOperations.creatingStatus === "inProgress" ||
        kpiAlertOperations.updatingStatus === "inProgress"
        ? "inProgress"
        : kpiAlertOperations.creatingStatus === "error" || kpiAlertOperations.updatingStatus === "error"
            ? "error"
            : "idle";
    const { isSelectable, isSelected, onSelected } = useWidgetSelection(kpiWidgetRef);
    const onDrillHandler = onDrill && handleOnDrill;
    return (React.createElement(OverlayControllerProvider, { overlayController: overlayController },
        React.createElement(DashboardItemWithKpiAlert, { kpi: kpiWidget, alert: alert, filters: effectiveFilters, userWorkspaceSettings: settings, kpiResult: kpiResult, renderHeadline: (clientHeight) => (React.createElement(DashboardItemHeadline, { title: kpiWidget.title, clientHeight: clientHeight })), kpiAlertResult: kpiAlertResult, canSetAlert: canSetAlert, isReadOnlyMode: isReadOnly, alertExecutionError: alertExecutionError !== null && alertExecutionError !== void 0 ? alertExecutionError : 
            /*
             * if alert is broken, behave as if its execution yielded no data (which is true, we do not execute it)
             * context: the problem is alerts on KPIs without dateDataset, their date filters are invalid
             * and we have no idea what date dataset to put there hence it is sometimes impossible
             * to execute them (unlike KPI Dashboards, we do not have the guarantee that there is a date
             * filter in the filters)
             */
            (isAlertBroken ? new NoDataSdkError() : undefined), isLoading: isLoading, isAlertLoading: false /* alerts are always loaded at this point */, isAlertExecutionLoading: isAlertExecutionLoading, isAlertBroken: isAlertBroken, isAlertDialogOpen: isAlertDialogOpen, isAlertHighlighted: isAlertHighlighted, onAlertDialogOpenClick: () => {
                kpiAlertDialogOpened(!!alert);
                openAlertDialog();
            }, renderAlertDialog: () => (React.createElement(KpiAlertDialogWrapper, { alert: alert, dateFormat: dateFormat, userEmail: currentUser.email, onAlertDialogCloseClick: () => {
                    kpiAlertDialogClosed();
                    closeAlertDialog();
                }, onAlertDialogDeleteClick: () => {
                    kpiAlertOperations.onRemoveAlert(alert);
                }, onAlertDialogSaveClick: (threshold, whenTriggered) => {
                    var _a, _b;
                    if (alert) {
                        return kpiAlertOperations.onUpdateAlert(Object.assign(Object.assign({}, alert), { threshold,
                            whenTriggered, isTriggered: evaluateAlertTriggered(kpiAlertResult.measureResult, threshold, whenTriggered) }));
                    }
                    // alerts are not possible when the dashboard is not yet persisted. if the code bombs here
                    // then it means we use view-mode KPI widget in edit-mode dashboard - there is a configuration
                    // customization error somewhere.
                    invariant(dashboardRef, "attempting to create alert of an unsaved dashboard");
                    return kpiAlertOperations.onCreateAlert({
                        dashboard: dashboardRef,
                        widget: kpiWidgetRef,
                        threshold,
                        whenTriggered,
                        isTriggered: evaluateAlertTriggered((_a = kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureResult) !== null && _a !== void 0 ? _a : 0, threshold, whenTriggered),
                        filterContext: {
                            title: "filterContext",
                            description: "",
                            filters: (_b = effectiveFilters === null || effectiveFilters === void 0 ? void 0 : effectiveFilters.map(dashboardFilterToFilterContextItem).map(stripDateDatasets)) !== null && _b !== void 0 ? _b : [],
                        },
                        description: "",
                        title: "",
                    });
                }, onAlertDialogUpdateClick: () => {
                    var _a, _b;
                    return kpiAlertOperations.onUpdateAlert(Object.assign(Object.assign({}, alert), { 
                        // evaluate triggered as if the alert already used the correct filters (i.e. use the KPI execution itself)
                        isTriggered: evaluateAlertTriggered((_a = kpiResult === null || kpiResult === void 0 ? void 0 : kpiResult.measureResult) !== null && _a !== void 0 ? _a : 0, alert.threshold, alert.whenTriggered), 
                        // change the filters to the filters currently used by the KPI
                        filterContext: Object.assign(Object.assign({}, alert.filterContext), { filters: (_b = effectiveFilters === null || effectiveFilters === void 0 ? void 0 : effectiveFilters.map(dashboardFilterToFilterContextItem).map(stripDateDatasets)) !== null && _b !== void 0 ? _b : [] }) }));
                }, onApplyAlertFiltersClick: onFiltersChange
                    ? () => {
                        var _a, _b;
                        return onFiltersChange(filterContextItemsToDashboardFiltersByWidget((_b = (_a = alert === null || alert === void 0 ? void 0 : alert.filterContext) === null || _a === void 0 ? void 0 : _a.filters) !== null && _b !== void 0 ? _b : [], kpiWidget), true);
                    }
                    : undefined, isAlertLoading: isAlertExecutionLoading, alertDeletingStatus: kpiAlertOperations.removingStatus, alertSavingStatus: alertSavingStatus, alertUpdatingStatus: alertSavingStatus, filters: effectiveFilters, isThresholdRepresentingPercent: isThresholdRepresentingPercent, thresholdPlaceholder: thresholdPlaceholder, brokenAlertFiltersBasicInfo: brokenAlertsBasicInfo, backend: backend, workspace: workspace })), alertDeletingStatus: kpiAlertOperations.removingStatus, alertSavingStatus: alertSavingStatus, isSelectable: isSelectable, isSelected: isSelected, onSelected: onSelected }, () => {
            return (React.createElement(KpiRenderer, { kpi: kpiWidget, kpiResult: kpiResult, filters: effectiveFilters !== null && effectiveFilters !== void 0 ? effectiveFilters : [], disableDrillUnderline: disableDrillUnderline, isDrillable: isDrillable, onDrill: onDrillHandler, separators: separators, enableCompactSize: enableCompactSize, error: error, errorHelp: intl.formatMessage({ id: "kpi.error.view" }), isLoading: isLoading }));
        })));
};
/**
 * Executes the given measures and displays them as KPI
 * @internal
 */
export const KpiExecutor = memo(KpiExecutorCore);
//# sourceMappingURL=KpiExecutor.js.map