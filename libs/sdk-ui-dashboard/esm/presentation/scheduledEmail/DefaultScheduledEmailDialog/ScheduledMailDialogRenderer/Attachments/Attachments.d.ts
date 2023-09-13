/// <reference types="react" />
import { IWidgetExportConfiguration, IWidgetsSelection } from "../../interfaces.js";
import { IInsightWidgetExtended } from "../../useScheduledEmail.js";
export interface IAttachmentsProps {
    dashboardTitle: string;
    insightWidgets: IInsightWidgetExtended[];
    dashboardSelected: boolean;
    widgetsSelected: IWidgetsSelection;
    configuration: IWidgetExportConfiguration;
    canExportTabular?: boolean;
    onAttachmentsSelectionChanged(dashboardSelected: boolean, widgetsSelected: IWidgetsSelection): void;
    onAttachmentsConfigurationChanged(configuration: IWidgetExportConfiguration): void;
}
export declare const Attachments: (props: IAttachmentsProps) => JSX.Element;
