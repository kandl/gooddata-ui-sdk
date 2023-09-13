import { IDashboard } from "@gooddata/sdk-model";
import { CommandProcessingStatus } from "../../../model/index.js";
import { ILocale } from "@gooddata/sdk-ui";
interface UseSaveAsResult {
    locale: ILocale;
    dashboardTitle: string;
    isDashboardSaving: boolean;
    isDashboardLoaded: boolean;
    isKpiWidgetEnabled: boolean;
    isScheduleEmailsEnabled: boolean;
    isInEditMode: boolean;
    /**
     * Function that triggers the SaveAs functionality. Optionally specify new title for
     * the dashboard copy and indicate whether the Dashboard component should switch to the newly
     * created copy after successful save.
     *
     * Default is false.
     */
    handleSaveAs: (title: string, switchToCopy?: boolean) => void;
    /**
     * Status of the save as operation.
     */
    saveAsStatus?: CommandProcessingStatus;
}
/**
 * @internal
 */
export interface UseSaveAsProps {
    /**
     * Callback to be called, when user submit the scheduled email dialog.
     */
    onSubmit?: (title: string, switchToCopy?: boolean) => void;
    /**
     * Callback to be called, when submitting of the scheduled email was successful.
     */
    onSubmitSuccess?: (dashboard: IDashboard) => void;
    /**
     * Callback to be called, when submitting of the scheduled email failed.
     */
    onSubmitError?: (error: any | undefined) => void;
}
export declare const useSaveAs: (props: UseSaveAsProps) => UseSaveAsResult;
export {};
