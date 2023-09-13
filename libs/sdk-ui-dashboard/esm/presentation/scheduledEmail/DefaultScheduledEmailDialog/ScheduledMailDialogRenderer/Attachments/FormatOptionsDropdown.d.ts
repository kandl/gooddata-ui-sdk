import * as React from "react";
import { IWidgetExportConfiguration, WidgetExportFileFormat } from "../../interfaces.js";
export interface IFormatOptionsDropdownProps {
    format: WidgetExportFileFormat;
    mergeHeaders: boolean;
    includeFilters: boolean;
    onApply: (result: IWidgetExportConfiguration) => void;
}
export declare const FormatOptionsDropdown: React.FC<IFormatOptionsDropdownProps>;
