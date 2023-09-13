// (C) 2007-2023 GoodData Corporation
const escapeFileName = (str) => str === null || str === void 0 ? void 0 : str.replace(/[/?<>\\:*|"]/g, "");
function buildExportRequestConfig(exportConfig, exportTitle) {
    const { format, includeFilterContext, mergeHeaders, title: customTitle } = exportConfig;
    const title = escapeFileName(customTitle || exportTitle || "Untitled");
    const exportRequestConfig = {
        format,
        mergeHeaders,
        title,
    };
    if (includeFilterContext) {
        exportRequestConfig.showFilters = true;
    }
    return exportRequestConfig;
}
/**
 * Creates function to export data in the provided result. This function is typically passed by visualization
 * components via the onExportReady callback.
 *
 * @param result - data view that will be exported
 * @param exportTitle - specify title
 * @internal
 */
export function createExportFunction(result, exportTitle) {
    return (exportConfig) => {
        const exportRequestConfig = buildExportRequestConfig(exportConfig, exportTitle);
        return result.export(exportRequestConfig);
    };
}
/**
 * Creates function that should be passed to onExportReady in the event that the backend execution
 * fails and export is not possible.
 *
 * @param error - the execution error
 * @internal
 */
export function createExportErrorFunction(error) {
    return (_exportConfig) => {
        return Promise.reject(error);
    };
}
//# sourceMappingURL=export.js.map