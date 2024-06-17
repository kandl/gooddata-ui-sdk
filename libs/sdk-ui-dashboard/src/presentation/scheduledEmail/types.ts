// (C) 2019-2024 GoodData Corporation
import { ComponentType } from "react";
import { IAutomationMdObject, IAutomationMdObjectDefinition, IOrganizationUser } from "@gooddata/sdk-model";
import { GoodDataSdkError } from "@gooddata/sdk-ui";

///
/// Component props
///

/**
 * @alpha
 */
export interface IScheduledEmailDialogProps {
    /**
     * Is scheduled e-mail dialog visible?
     */
    isVisible?: boolean;

    /**
     * Callback to be called, when user submits the scheduled email dialog.
     */
    onSubmit?: (scheduledEmailDefinition: IAutomationMdObjectDefinition) => void;

    /**
     * Callback to be called, when user save the existing scheduled email.
     */
    onSave?: (scheduledEmailDefinition: IAutomationMdObjectDefinition) => void;

    /**
     * Callback to be called, when user closes the scheduled email dialog.
     */
    onCancel?: () => void;

    /**
     * Callback to be called, when error occurs.
     */
    onError?: (error: GoodDataSdkError) => void;

    /**
     * Callback to be called, when scheduling finishes successfully.
     */
    onSuccess?: () => void;

    /**
     * Callback to be called, when error occurs.
     */
    onSaveError?: (error: GoodDataSdkError) => void;

    /**
     * Callback to be called, when scheduling finishes successfully.
     */
    onSaveSuccess?: () => void;

    /**
     * Schedule to be edited in the dialog.
     */
    editSchedule?: IAutomationMdObject;

    /**
     * Users in workspace
     */
    users: IOrganizationUser[];
}

/**
 * @alpha
 */
export interface IScheduledEmailManagementDialogProps {
    /**
     * Is scheduled email management dialog visible?
     */
    isVisible?: boolean;

    /**
     * Callback to be called, when user adds new scheduled email item.
     */
    onAdd?: () => void;

    /**
     * Callback to be called, when user clicks scheduled email item for editing.
     */
    onEdit?: (scheduledMail: IAutomationMdObject, users: IOrganizationUser[]) => void;

    /**
     * Callback to be called, when user closes the scheduled email management dialog.
     */
    onClose?: () => void;

    /**
     * Callback to be called, when scheduled email is deleted.
     */
    onDeleteSuccess?: () => void;

    /**
     * Callback to be called, when emails fail to load.
     */
    onLoadError?: (error: GoodDataSdkError) => void;

    /**
     * Callback to be called, when schedule fails to delete.
     */
    onDeleteError?: (error: GoodDataSdkError) => void;
}

///
/// Custom component types
///

/**
 * @alpha
 */
export type CustomScheduledEmailDialogComponent = ComponentType<IScheduledEmailDialogProps>;

/**
 * @alpha
 */
export type CustomScheduledEmailManagementDialogComponent =
    ComponentType<IScheduledEmailManagementDialogProps>;
