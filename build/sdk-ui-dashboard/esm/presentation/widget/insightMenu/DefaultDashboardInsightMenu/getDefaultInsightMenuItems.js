import compact from "lodash/compact.js";
/**
 * @internal
 */
export function getDefaultInsightMenuItems(intl, config) {
    const { exportCSVDisabled, exportXLSXDisabled, scheduleExportDisabled, onExportCSV, onExportXLSX, onScheduleExport, isScheduleExportVisible, isDataError, } = config;
    const tooltip = isDataError
        ? intl.formatMessage({ id: "options.menu.unsupported.error" })
        : intl.formatMessage({ id: "options.menu.unsupported.loading" });
    return compact([
        {
            type: "button",
            itemId: "ExportXLSXBubble",
            itemName: intl.formatMessage({ id: "widget.options.menu.exportToXLSX" }),
            onClick: onExportXLSX,
            disabled: exportXLSXDisabled,
            tooltip,
            icon: "gd-icon-download",
            className: "s-options-menu-export-xlsx",
        },
        {
            type: "button",
            itemId: "ExportCSVBubble",
            itemName: intl.formatMessage({ id: "widget.options.menu.exportToCSV" }),
            onClick: onExportCSV,
            disabled: exportCSVDisabled,
            tooltip,
            icon: "gd-icon-download",
            className: "s-options-menu-export-csv",
        },
        isScheduleExportVisible && {
            type: "button",
            itemId: "ScheduleExport",
            itemName: intl.formatMessage({ id: "widget.options.menu.scheduleExport" }),
            onClick: onScheduleExport,
            disabled: scheduleExportDisabled,
            tooltip,
            icon: "gd-icon-clock",
            className: "s-options-menu-schedule-export",
        },
    ]);
}
//# sourceMappingURL=getDefaultInsightMenuItems.js.map