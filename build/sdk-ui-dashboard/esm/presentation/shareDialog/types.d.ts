import { ComponentType } from "react";
import { IAnalyticalBackend } from "@gooddata/sdk-backend-spi";
import { IUser } from "@gooddata/sdk-model";
import { ISharedObject, ISharingApplyPayload as ISharingDialogApplyPayload, CurrentUserPermissions, IShareDialogInteractionData } from "@gooddata/sdk-ui-kit";
import { GoodDataSdkError } from "@gooddata/sdk-ui";
/**
 * @alpha
 */
export interface ISharingApplyPayload extends ISharingDialogApplyPayload {
}
/**
 * @alpha
 */
export interface IShareDialogProps {
    /**
     * Analytical backend from which the dashboard obtains data to render.
     */
    backend: IAnalyticalBackend;
    /**
     * Identifier of analytical workspace, from which the dashboard obtains data to render.
     */
    workspace: string;
    /**
     * Is share dialog visible?
     */
    isVisible?: boolean;
    /**
     * Object to share
     */
    sharedObject: ISharedObject;
    /**
     * Current user
     */
    currentUser: IUser;
    /**
     * Is locking of the dashboard supported by the currently logged user and backend?
     */
    isLockingSupported: boolean;
    /**
     * Is currently logger user a workspace manager?
     */
    isCurrentUserWorkspaceManager: boolean;
    /**
     * Dashboard permissions for current user.
     */
    currentUserPermissions: CurrentUserPermissions;
    /**
     * Callback to be called when user apply share dialog
     */
    onApply: (payload: ISharingApplyPayload) => void;
    /**
     * Callback to be called, when error occurs.
     */
    onError?: (error: GoodDataSdkError) => void;
    /**
     * Callback to be called when user closes the share dialog.
     */
    onCancel: () => void;
    /**
     * Callback to be called on specific share dialog interactions.
     */
    onInteraction?: (data: IShareDialogInteractionData) => void;
}
/**
 * @alpha
 */
export type CustomShareDialogComponent = ComponentType<IShareDialogProps>;
