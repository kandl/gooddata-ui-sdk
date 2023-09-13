// (C) 2021-2023 GoodData Corporation
import { useCallback, useState } from "react";
import { invariant } from "ts-invariant";
import { getInsightVisualizationMeta } from "@gooddata/sdk-ui-ext";
import { v4 as uuid } from "uuid";
import { selectSettings, useDashboardSelector, selectIsExecutionResultExportableToCsvByRef, selectIsExecutionResultExportableToXlsxByRef, useDashboardDispatch, dispatchAndWaitFor, exportInsightWidget, } from "../../../model/index.js";
import { useExportHandler } from "./useExportHandler.js";
import { useExportDialogContext } from "../../dashboardContexts/index.js";
export const useInsightExport = (config) => {
    const { title, widgetRef, insight } = config;
    const [isExporting, setIsExporting] = useState(false);
    const dispatch = useDashboardDispatch();
    const exportFunction = useCallback((configToUse) => dispatchAndWaitFor(dispatch, exportInsightWidget(widgetRef, Object.assign(Object.assign({}, configToUse), { format: configToUse.format === "xlsx" ? "xlsx" : "csv" }), uuid())).then((result) => result.payload.result), [widgetRef]);
    const isInsightExportable = getInsightVisualizationMeta(insight).supportsExport;
    const isExportableToCsv = useDashboardSelector(selectIsExecutionResultExportableToCsvByRef(widgetRef));
    const isExportableToXlsx = useDashboardSelector(selectIsExecutionResultExportableToXlsxByRef(widgetRef));
    const settings = useDashboardSelector(selectSettings);
    const exportHandler = useExportHandler();
    const { openDialog, closeDialog } = useExportDialogContext();
    const onExportCSV = useCallback(() => {
        setIsExporting(true);
        const exportConfig = {
            format: "csv",
            title,
        };
        // if this bombs there is an issue with the logic enabling the buttons
        invariant(exportFunction);
        exportHandler(exportFunction, exportConfig).then(() => setIsExporting(false));
    }, [exportFunction, title]);
    const onExportXLSX = useCallback(() => {
        var _a, _b, _c;
        openDialog({
            onSubmit: ({ includeFilterContext, mergeHeaders }) => {
                setIsExporting(true);
                // if this bombs there is an issue with the logic enabling the buttons
                invariant(exportFunction);
                closeDialog();
                exportHandler(exportFunction, {
                    format: "xlsx",
                    mergeHeaders,
                    includeFilterContext,
                    showFilters: includeFilterContext,
                    title,
                }).then(() => setIsExporting(false));
            },
            includeFilterContext: Boolean((_a = settings === null || settings === void 0 ? void 0 : settings.activeFiltersByDefault) !== null && _a !== void 0 ? _a : true),
            mergeHeaders: Boolean((_b = settings === null || settings === void 0 ? void 0 : settings.cellMergedByDefault) !== null && _b !== void 0 ? _b : true),
            filterContextVisible: Boolean((_c = settings === null || settings === void 0 ? void 0 : settings.enableActiveFilterContext) !== null && _c !== void 0 ? _c : true),
        });
    }, [settings, title, exportFunction, closeDialog]);
    const exportCSVEnabled = !isExporting && isInsightExportable && isExportableToCsv;
    const exportXLSXEnabled = !isExporting && isInsightExportable && isExportableToXlsx;
    return {
        exportCSVEnabled,
        exportXLSXEnabled,
        onExportCSV,
        onExportXLSX,
    };
};
//# sourceMappingURL=useInsightExport.js.map