// (C) 2021-2023 GoodData Corporation
import { createSelector } from "@reduxjs/toolkit";
import { serializeObjRef } from "@gooddata/sdk-model";
import { createMemoizedSelector } from "../_infra/selectors.js";
import { executionResultsAdapter } from "./executionResultsEntityAdapter.js";
import { selectAnalyticalWidgetByRef } from "../layout/layoutSelectors.js";
import { isNonExportableError } from "../../../_staging/errors/errorPredicates.js";
import { selectCanExportTabular, selectCanExecuteRaw } from "../permissions/permissionsSelectors.js";
import { selectSettings } from "../config/configSelectors.js";
import { selectSupportsExportToXlsx, selectSupportsExportToCsv, } from "../backendCapabilities/backendCapabilitiesSelectors.js";
const selectSelf = createSelector((state) => state, (state) => state.executionResults);
const adapterSelectors = executionResultsAdapter.getSelectors(selectSelf);
const selectExecutionResultEntities = adapterSelectors.selectEntities;
/**
 * @alpha
 */
export const selectExecutionResult = adapterSelectors.selectById;
/**
 * @alpha
 */
export const selectExecutionResultByRef = createMemoizedSelector((ref) => createSelector(selectExecutionResultEntities, (executionResults) => {
    const key = serializeObjRef(ref);
    return executionResults[key];
}));
/**
 * @alpha
 */
export const selectIsExecutionResultReadyForExportByRef = createMemoizedSelector((ref) => createSelector(selectExecutionResultByRef(ref), selectAnalyticalWidgetByRef(ref), (widgetExecution) => {
    if (!widgetExecution) {
        return false;
    }
    const { isLoading, error, executionResult } = widgetExecution;
    return !!executionResult && !isLoading && !isNonExportableError(error);
}));
/**
 * @alpha
 */
export const selectIsExecutionResultExportableToCsvByRef = createMemoizedSelector((ref) => createSelector(selectSupportsExportToCsv, selectIsExecutionResultReadyForExportByRef(ref), selectCanExportTabular, selectCanExecuteRaw, selectSettings, (supportsCapabilityCsv, isReadyForExport, canExportTabular, canExecuteRaw, settings) => {
    const isExportEnabled = Boolean(settings.enableKPIDashboardExport && canExportTabular);
    const isRawExportEnabled = Boolean(isExportEnabled && canExecuteRaw);
    return supportsCapabilityCsv && isReadyForExport && isRawExportEnabled;
}));
/**
 * @alpha
 */
export const selectIsExecutionResultExportableToXlsxByRef = createMemoizedSelector((ref) => createSelector(selectSupportsExportToXlsx, selectIsExecutionResultReadyForExportByRef(ref), selectCanExportTabular, selectSettings, (supportCapabilityXlsx, isReadyForExport, canExportTabular, settings) => {
    const isExportEnabled = Boolean(settings.enableKPIDashboardExport && canExportTabular);
    return supportCapabilityXlsx && isReadyForExport && isExportEnabled;
}));
//# sourceMappingURL=executionResultsSelectors.js.map