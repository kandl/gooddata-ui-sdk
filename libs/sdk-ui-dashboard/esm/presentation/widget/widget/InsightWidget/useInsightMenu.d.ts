import { IInsight, IInsightWidget } from "@gooddata/sdk-model";
import { IInsightMenuItem } from "../../insightMenu/index.js";
type UseInsightMenuConfig = {
    insight: IInsight;
    widget: IInsightWidget;
    exportCSVEnabled: boolean;
    exportXLSXEnabled: boolean;
    scheduleExportEnabled: boolean;
    onExportCSV: () => void;
    onExportXLSX: () => void;
    onScheduleExport: () => void;
    isScheduleExportVisible: boolean;
};
export declare const useInsightMenu: (config: UseInsightMenuConfig) => {
    menuItems: IInsightMenuItem[];
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
};
export {};
