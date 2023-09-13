import React from "react";
import { WrappedComponentProps } from "react-intl";
interface ISaveAsNewDashboardDialogState {
    dashboardTitle: string;
}
export interface ISaveAsDialogRendererOwnProps {
    dashboardTitle: string;
    isDashboardSaving: boolean;
    isDashboardLoaded: boolean;
    isKpiWidgetEnabled: boolean;
    isScheduleEmailsEnabled: boolean;
    isInEditMode: boolean;
    locale?: string;
    onSubmit: (title: string, switchToCopy?: boolean, useOriginalFilterContext?: boolean) => void;
    onCancel?: () => void;
}
/**
 * @internal
 */
export declare class SaveAsNewDashboardDialog extends React.PureComponent<ISaveAsDialogRendererOwnProps & WrappedComponentProps, ISaveAsNewDashboardDialogState> {
    constructor(props: ISaveAsDialogRendererOwnProps & WrappedComponentProps);
    private getDefaultDashboardTitle;
    private canCreateDashboard;
    handleTitleFocus: (e: any) => void;
    handleTitleBlur: (e: any) => void;
    handleTitleChange: (value: string) => void;
    onSubmit: () => void;
    private getNoteText;
    render(): JSX.Element;
}
export declare const SaveAsDialogRendererIntl: React.FC<import("react-intl").WithIntlProps<ISaveAsDialogRendererOwnProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<ISaveAsDialogRendererOwnProps & WrappedComponentProps>;
};
export declare const SaveAsDialogRenderer: React.FC<ISaveAsDialogRendererOwnProps>;
export {};
