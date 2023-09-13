/**
 * @internal
 */
export function getDefaultLegacyInsightMenuItems(intl, config) {
    const { exportCSVDisabled, exportXLSXDisabled, onExportCSV, onExportXLSX, isDataError } = config;
    const tooltip = isDataError
        ? intl.formatMessage({ id: "options.menu.unsupported.error" })
        : intl.formatMessage({ id: "options.menu.unsupported.loading" });
    return [
        {
            type: "button",
            itemId: "ExportXLSXBubble",
            itemName: intl.formatMessage({ id: "options.menu.export.XLSX" }),
            disabled: exportXLSXDisabled,
            onClick: onExportXLSX,
            tooltip,
            className: "options-menu-export-xlsx s-options-menu-export-xlsx",
        },
        {
            type: "button",
            itemId: "ExportCSVBubble",
            itemName: intl.formatMessage({ id: "options.menu.export.CSV" }),
            disabled: exportCSVDisabled,
            onClick: onExportCSV,
            tooltip,
            className: "options-menu-export-csv s-options-menu-export-csv",
        },
    ];
}
//# sourceMappingURL=getDefaultLegacyInsightMenuItems.js.map