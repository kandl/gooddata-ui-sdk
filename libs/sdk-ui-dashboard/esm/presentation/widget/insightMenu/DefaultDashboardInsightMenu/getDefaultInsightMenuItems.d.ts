import { IntlShape } from "react-intl";
import { IInsightMenuItem } from "../types.js";
/**
 * @internal
 */
export declare function getDefaultInsightMenuItems(intl: IntlShape, config: {
    exportXLSXDisabled: boolean;
    exportCSVDisabled: boolean;
    scheduleExportDisabled: boolean;
    onExportXLSX: () => void;
    onExportCSV: () => void;
    onScheduleExport: () => void;
    isScheduleExportVisible: boolean;
    isDataError: boolean;
}): IInsightMenuItem[];
