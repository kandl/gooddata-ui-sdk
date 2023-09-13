import { IntlShape } from "react-intl";
import { IInsightMenuItem } from "../types.js";
/**
 * @internal
 */
export declare function getDefaultLegacyInsightMenuItems(intl: IntlShape, config: {
    exportXLSXDisabled: boolean;
    exportCSVDisabled: boolean;
    onExportXLSX: () => void;
    onExportCSV: () => void;
    isDataError: boolean;
}): IInsightMenuItem[];
