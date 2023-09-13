import React, { Component } from "react";
import { IUserWorkspaceSettings } from "@gooddata/sdk-backend-spi";
import { IFilter, IWidgetAlertDefinition, IKpiWidgetDefinition } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
import { IKpiResult, IKpiAlertResult, KpiAlertOperationStatus } from "../../common/index.js";
export interface IDashboardItemWithKpiAlertProps {
    kpi: IKpiWidgetDefinition;
    isLoading: boolean;
    filters?: IFilter[];
    kpiResult: IKpiResult | undefined;
    alert?: IWidgetAlertDefinition;
    kpiAlertResult?: IKpiAlertResult | undefined;
    alertExecutionError?: GoodDataSdkError;
    isAlertExecutionLoading?: boolean;
    canSetAlert?: boolean;
    userWorkspaceSettings?: IUserWorkspaceSettings;
    isAlertDialogOpen?: boolean;
    isAlertHighlighted?: boolean;
    isAlertLoading?: boolean;
    alertSavingStatus?: KpiAlertOperationStatus;
    alertUpdatingStatus?: KpiAlertOperationStatus;
    alertDeletingStatus?: KpiAlertOperationStatus;
    isAlertBroken?: boolean;
    isReadOnlyMode?: boolean;
    /**
     * Flag indicating the given item can be selected.
     */
    isSelectable?: boolean;
    /**
     * Flag indicating the given item is selected.
     */
    isSelected?: boolean;
    /**
     * Callback to call when an item is selected.
     */
    onSelected?: () => void;
    onAlertDialogOpenClick: () => void;
    contentClassName?: string;
    kpiClassName?: string;
    /**
     * When true, alert will not be highlighted when triggered.
     */
    suppressAlertTriggered?: boolean;
    /**
     * When true, description trigger will not be shown
     */
    suppressDescriptionTrigger?: boolean;
    children: (params: {
        clientWidth?: number;
        clientHeight?: number;
    }) => React.ReactNode;
    renderHeadline: (clientHeight?: number) => React.ReactNode;
    renderAlertDialog: () => React.ReactNode;
}
interface IDashboardItemWithKpiAlertState {
    isKpiAlertAfterSaving: boolean;
    isKpiAlertAfterDeleting: boolean;
    isAlertHighlighted: boolean;
}
export declare class DashboardItemWithKpiAlert extends Component<IDashboardItemWithKpiAlertProps, IDashboardItemWithKpiAlertState> {
    static defaultProps: Pick<IDashboardItemWithKpiAlertProps, "isAlertHighlighted" | "filters" | "alertDeletingStatus" | "alertSavingStatus" | "alertUpdatingStatus" | "suppressAlertTriggered" | "suppressDescriptionTrigger" | "isReadOnlyMode">;
    private timeouts;
    private isScrolledToHighlightedAlert;
    private node;
    state: IDashboardItemWithKpiAlertState;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IDashboardItemWithKpiAlertProps): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    updateStatePropertyForTime(name: keyof IDashboardItemWithKpiAlertState, timeout: number): void;
    clearUpdatingTimeout(name?: string): void;
    isKpiAlertSaved(nextProps: IDashboardItemWithKpiAlertProps): boolean;
    isKpiAlertDeleted(nextProps: IDashboardItemWithKpiAlertProps): boolean;
    renderAlertBox: () => React.ReactNode;
    onAlertDialogOpenClick: () => void;
    getClassNames(): {
        content: string;
        kpi: string;
    };
    getBubbleMessage(isAlertingTemporarilyDisabled: boolean): React.ReactElement;
    render(): JSX.Element;
}
export {};
