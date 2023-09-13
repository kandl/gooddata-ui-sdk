// (C) 2021-2022 GoodData Corporation
import { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { selectExecutionResultByRef, useDashboardSelector } from "../../../../model/index.js";
import { isDataError } from "../../../../_staging/errors/errorPredicates.js";
import { useDashboardCustomizationsContext, } from "../../../dashboardContexts/index.js";
import { getDefaultInsightMenuItems, getDefaultLegacyInsightMenuItems, } from "../../insightMenu/index.js";
export const useInsightMenu = (config) => {
    const { insight, widget } = config;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const closeMenu = useCallback(() => setIsMenuOpen(false), []);
    const openMenu = useCallback(() => setIsMenuOpen(true), []);
    const { insightMenuItemsProvider } = useDashboardCustomizationsContext();
    const defaultMenuItems = useDefaultMenuItems(config, insightMenuItemsProvider, setIsMenuOpen);
    const menuItems = useMemo(() => {
        return insightMenuItemsProvider
            ? insightMenuItemsProvider(insight, widget, defaultMenuItems, closeMenu, "view")
            : defaultMenuItems;
    }, [insightMenuItemsProvider, insight, widget, defaultMenuItems, closeMenu]);
    return { menuItems, isMenuOpen, openMenu, closeMenu };
};
function useDefaultMenuItems(config, insightMenuItemsProvider, setIsMenuOpen) {
    const { exportCSVEnabled, exportXLSXEnabled, scheduleExportEnabled, onExportCSV, onExportXLSX, onScheduleExport, isScheduleExportVisible, widget, } = config;
    const intl = useIntl();
    const execution = useDashboardSelector(selectExecutionResultByRef(widget.ref));
    return useMemo(() => {
        const defaultMenuItemsGetter = !insightMenuItemsProvider
            ? getDefaultLegacyInsightMenuItems
            : getDefaultInsightMenuItems;
        return defaultMenuItemsGetter(intl, {
            exportCSVDisabled: !exportCSVEnabled,
            exportXLSXDisabled: !exportXLSXEnabled,
            scheduleExportDisabled: !scheduleExportEnabled,
            onExportCSV: () => {
                setIsMenuOpen(false);
                onExportCSV();
            },
            onExportXLSX: () => {
                setIsMenuOpen(false);
                onExportXLSX();
            },
            onScheduleExport: () => {
                setIsMenuOpen(false);
                onScheduleExport();
            },
            isScheduleExportVisible,
            isDataError: isDataError(execution === null || execution === void 0 ? void 0 : execution.error),
        });
    }, [
        insightMenuItemsProvider,
        execution,
        exportCSVEnabled,
        exportXLSXEnabled,
        scheduleExportEnabled,
        onExportCSV,
        onExportXLSX,
        onScheduleExport,
        isScheduleExportVisible,
        intl,
        setIsMenuOpen,
    ]);
}
//# sourceMappingURL=useInsightMenu.js.map