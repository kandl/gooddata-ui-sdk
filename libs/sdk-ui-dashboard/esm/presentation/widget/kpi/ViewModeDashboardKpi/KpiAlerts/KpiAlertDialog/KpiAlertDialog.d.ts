import React, { Component, ReactText } from "react";
import { WrappedComponentProps } from "react-intl";
import { IFilter, IWidgetAlertDefinition } from "@gooddata/sdk-model";
import { KpiAlertOperationStatus } from "../../../common/index.js";
import { IBrokenAlertFilter } from "../types.js";
export interface IKpiAlertDialogProps {
    alert?: IWidgetAlertDefinition;
    alertSavingStatus?: KpiAlertOperationStatus;
    alertUpdatingStatus?: KpiAlertOperationStatus;
    alertDeletingStatus?: KpiAlertOperationStatus;
    thresholdPlaceholder?: string;
    isThresholdRepresentingPercent?: boolean;
    isAlertDialogOpening?: boolean;
    isAlertLoading?: boolean;
    isKpiFormatLoading?: boolean;
    brokenAlertFilters?: IBrokenAlertFilter[];
    userEmail: string;
    isDateFilterIgnored?: boolean;
    filters?: IFilter[];
    dateFormat: string;
    /**
     * Triggered when either the "Close" button or the "Cancel" button is clicked.
     */
    onAlertDialogCloseClick: () => void;
    /**
     * Triggered when a new alert creation or an update of the settings of an existing alert is triggered.
     * The function is called with the current values of the alert dialog inputs.
     */
    onAlertDialogSaveClick: (threshold: number, whenTriggered: IWidgetAlertDefinition["whenTriggered"]) => void;
    /**
     * Triggered when the "Delete" button is clicked.
     */
    onAlertDialogDeleteClick: () => void;
    /**
     * Triggered when the "Update filters" button in broken alert state is clicked.
     * This should make sure the alert is updated with the filters currently used by its KPI (and therefore fix the alert).
     */
    onAlertDialogUpdateClick: () => void;
    /**
     * Triggered when user clicks the "Apply alert filters to dashboard" button in case the dashboard has different filters than the alert.
     * If not specified, the corresponding button will not be rendered.
     */
    onApplyAlertFiltersClick?: () => void;
}
interface IKpiAlertDialogState {
    threshold: string;
    alertType: IWidgetAlertDefinition["whenTriggered"];
}
export declare class KpiAlertDialog extends Component<IKpiAlertDialogProps & WrappedComponentProps, IKpiAlertDialogState> {
    static defaultProps: Pick<IKpiAlertDialogProps, "isAlertLoading" | "isKpiFormatLoading" | "thresholdPlaceholder" | "isDateFilterIgnored" | "isThresholdRepresentingPercent" | "filters" | "isAlertDialogOpening" | "alertDeletingStatus" | "alertSavingStatus" | "alertUpdatingStatus">;
    private threshold;
    private saveButton;
    constructor(props: IKpiAlertDialogProps & WrappedComponentProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IKpiAlertDialogProps & WrappedComponentProps): void;
    UNSAFE_componentWillReceiveProps(nextProps: IKpiAlertDialogProps & WrappedComponentProps): void;
    render(): JSX.Element;
    renderAttributeFiltersInfo(): React.ReactNode;
    getVisualThreshold(props?: Readonly<IKpiAlertDialogProps & WrappedComponentProps>): number | string;
    renderDialogBox(): React.ReactNode;
    renderDeleteLink(): React.ReactNode;
    renderUpdateButton(): React.ReactNode;
    renderBrokenAlert(): React.ReactNode;
    renderDialogContent(): React.ReactNode;
    renderDateFilterInfo(): React.ReactNode;
    renderFiltersMessage(): React.ReactNode;
    renderFiltersDifferMessage(): React.ReactNode;
    renderValidationMessage(): React.ReactNode;
    renderSavingErrorMessage(): React.ReactNode;
    renderUpdatingErrorMessage(): React.ReactNode;
    renderDeletingErrorMessage(): React.ReactNode;
    getSaveButtonTitle(): string;
    getUpdateOrSetTitle(): string;
    getUpdatingOrSavingTitle(): string;
    isThresholdRepresentingPercent(props?: Readonly<IKpiAlertDialogProps & WrappedComponentProps>): boolean;
    isSavingEnabled(): boolean;
    isAlertValid(): boolean;
    isAlertEmpty(): boolean;
    onCloseClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onCancelClick: (e: React.MouseEvent) => void;
    closeDialog: () => void;
    onSelect: (alertType: IWidgetAlertDefinition["whenTriggered"]) => void;
    onChange: (value: string | ReactText) => void;
    saveKpiAlert: () => void;
    deleteKpiAlert: () => void;
    focusThresholdInput(): void;
    applyAlertFilterSetting: () => void;
}
declare const _default: React.FC<import("react-intl").WithIntlProps<IKpiAlertDialogProps & WrappedComponentProps>> & {
    WrappedComponent: React.ComponentType<IKpiAlertDialogProps & WrappedComponentProps>;
};
export default _default;
