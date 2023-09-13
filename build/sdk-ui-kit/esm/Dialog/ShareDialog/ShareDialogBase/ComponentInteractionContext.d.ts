import React from "react";
import { CurrentUserPermissions, IShareDialogInteractionData, ShareDialogInteractionGranteeData, ShareDialogInteractionType } from "../types.js";
import { AccessGranularPermission, IUser, ShareStatus } from "@gooddata/sdk-model";
import { GranteeItem } from "./types.js";
interface IComponentInteractionData extends ShareDialogInteractionGranteeData {
    type: ShareDialogInteractionType;
}
type ComponentInteractionContextType = {
    onInteraction: (data: IComponentInteractionData) => void;
    currentUser: IUser;
};
/**
 * @internal
 */
export declare const useComponentInteractionContext: () => ComponentInteractionContextType;
interface IComponentInteractionProps {
    onInteraction: (data: IShareDialogInteractionData) => void;
    currentUser: IUser;
    currentUserPermissions: CurrentUserPermissions;
    isCurrentUserWorkspaceManager: boolean;
    sharedObjectStatus: ShareStatus;
    isSharedObjectLocked: boolean;
    children?: React.ReactNode;
}
/**
 * @internal
 */
export declare const ComponentInteractionProvider: React.FC<IComponentInteractionProps>;
export declare const useShareDialogInteraction: () => {
    openInteraction: () => void;
    closeInteraction: () => void;
    saveInteraction: () => void;
    permissionsDropdownOpenInteraction: (grantee: GranteeItem, isExistingGrantee: boolean, granteeEffectivePermission: AccessGranularPermission) => void;
    permissionsChangeInteraction: (grantee: GranteeItem, isExistingGrantee: boolean, granteeEffectivePermission: AccessGranularPermission, granteeUpdatedPermission: AccessGranularPermission) => void;
    permissionsRemoveInteraction: (grantee: GranteeItem, isExistingGrantee: boolean, granteeEffectivePermission: AccessGranularPermission) => void;
    granteeAddInteraction: (grantee: GranteeItem) => void;
    availableGranteeListOpenInteraction: (numberOfAvailableGrantees: number) => void;
};
export {};
//# sourceMappingURL=ComponentInteractionContext.d.ts.map