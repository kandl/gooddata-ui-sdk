import * as React from "react";
import { IWidgetsSelection } from "../../interfaces.js";
import { IInsightWidgetExtended } from "../../useScheduledEmail.js";
export interface IAttachmentsSelectionDropdownProps {
    dashboardTitle: string;
    dashboardSelected: boolean;
    insightWidgets: IInsightWidgetExtended[];
    widgetsSelected: {
        [widgetUri: string]: boolean;
    };
    onApply(dashboardSelected: boolean, widgetsSelected: IWidgetsSelection): void;
}
export declare const AttachmentsSelectionDropdown: React.FC<IAttachmentsSelectionDropdownProps>;
