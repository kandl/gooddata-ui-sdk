/// <reference types="react" />
import { AccessGranularPermission, IUser, ObjRef, ShareStatus } from "@gooddata/sdk-model";
import { CurrentUserPermissions, IShareDialogLabels } from "../types.js";
/**
 * @internal
 */
export type GranteeItem = IGranteeUser | IGranteeInactiveOwner | IGranteeGroup | IGranteeGroupAll | IGranularGranteeUser | IGranularGranteeGroup;
/**
 * @internal
 */
export type GranteeType = "user" | "inactive_owner" | "group" | "groupAll" | "granularUser" | "granularGroup";
/**
 * @internal
 */
export interface IGranteeBase {
    type: GranteeType;
    id: ObjRef;
}
/**
 * @internal
 */
export type GranteeStatus = "Inactive" | "Active";
/**
 * @internal
 */
export interface IGranteeUser extends IGranteeBase {
    type: "user";
    name: string;
    isOwner: boolean;
    isCurrentUser: boolean;
    status: GranteeStatus;
    email?: string;
}
/**
 * @internal
 */
export declare const isGranteeUser: (obj: unknown) => obj is IGranteeUser;
/**
 * @internal
 */
export interface IGranularGranteeUser extends IGranteeBase {
    type: "granularUser";
    name: string;
    isOwner: boolean;
    isCurrentUser: boolean;
    status: GranteeStatus;
    email?: string;
    permissions: AccessGranularPermission[];
    inheritedPermissions: AccessGranularPermission[];
}
/**
 * @internal
 */
export declare const isGranularGranteeUser: (obj: unknown) => obj is IGranularGranteeUser;
/**
 * @internal
 */
export interface IGranteeInactiveOwner extends IGranteeBase {
    type: "inactive_owner";
}
/**
 * @internal
 */
export declare const isGranteeUserInactive: (obj: unknown) => obj is IGranteeInactiveOwner;
/**
 * @internal
 */
export interface IGranteeGroup extends IGranteeBase {
    type: "group";
    name: string;
    memberCount?: number;
}
/**
 * @internal
 */
export declare const isGranteeGroup: (obj: unknown) => obj is IGranteeGroup;
/**
 * @internal
 */
export interface IGranularGranteeGroup extends IGranteeBase {
    type: "granularGroup";
    name: string;
    permissions: AccessGranularPermission[];
    inheritedPermissions: AccessGranularPermission[];
}
/**
 * @internal
 */
export declare const isGranularGranteeGroup: (obj: unknown) => obj is IGranularGranteeGroup;
/**
 * @internal
 */
export type IGranularGrantee = IGranularGranteeUser | IGranularGranteeGroup;
/**
 * @internal
 */
export declare const isGranularGrantee: (obj: unknown) => obj is IGranularGrantee;
/**
 * @internal
 */
export interface IGranteeGroupAll extends IGranteeBase {
    type: "groupAll";
    memberCount?: number;
}
/**
 * @internal
 */
export declare const isGranteeGroupAll: (obj: unknown) => obj is IGranteeGroupAll;
/**
 * @internal
 */
export declare const isGranteeItem: (obj: unknown) => obj is GranteeItem;
/**
 * @internal
 */
export type IComponentLabelsProviderProps = {
    labels: IShareDialogLabels;
    children?: React.ReactNode;
};
/**
 * @internal
 */
export type DialogModeType = "ShareGrantee" | "AddGrantee";
/**
 * @internal
 */
export interface IAffectedSharedObject {
    ref: ObjRef;
    shareStatus: ShareStatus;
    owner: IGranteeUser | IGranteeInactiveOwner;
    isLocked: boolean;
    isUnderLenientControl: boolean;
    isLockingSupported: boolean;
    isLeniencyControlSupported: boolean;
    isMetadataObjectLockingSupported: boolean;
    areGranularPermissionsSupported?: boolean;
    canWorkspaceManagerSeeEverySharedObject?: boolean;
}
/**
 * @internal
 */
export interface IShareDialogBaseProps {
    sharedObject: IAffectedSharedObject;
    currentUser: IUser;
    currentUserPermissions: CurrentUserPermissions;
    isCurrentUserWorkspaceManager: boolean;
    onCancel: () => void;
    onSubmit: (grantees: GranteeItem[], granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[], isUnderLenientControl: boolean, isLocked: boolean) => void;
    onError: (err: Error) => void;
}
/**
 * @internal
 */
export interface IGranteeItemProps {
    mode: DialogModeType;
    grantee: GranteeItem;
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    areGranularPermissionsSupported?: boolean;
    onDelete: (grantee: GranteeItem) => void;
    onChange?: (grantee: GranteeItem) => void;
}
/**
 * @internal
 */
export interface IShareGranteeBaseProps {
    currentUser: IUser;
    isDirty: boolean;
    isLoading: boolean;
    isLockedNow: boolean;
    isUnderLenientControlNow: boolean;
    sharedObject: IAffectedSharedObject;
    grantees: GranteeItem[];
    isCurrentUserWorkspaceManager: boolean;
    currentUserPermissions: CurrentUserPermissions;
    onAddGranteeButtonClick: () => void;
    onGranteeDelete: (grantee: GranteeItem) => void;
    onCancel: () => void;
    onSubmit: () => void;
    onLockChange: (locked: boolean) => void;
    onUnderLenientControlChange: (isUnderLenientControl: boolean) => void;
    onGranularGranteeChange?: (grantee: GranteeItem) => void;
}
/**
 * @internal
 */
export interface IShareGranteeContentProps {
    isLoading: boolean;
    grantees: GranteeItem[];
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    areGranularPermissionsSupported?: boolean;
    onAddGrantee: () => void;
    onDelete: (grantee: GranteeItem) => void;
    onChange?: (grantee: GranteeItem) => void;
}
/**
 * @internal
 */
export interface IAddGranteeBaseProps {
    isDirty: boolean;
    currentUser: IUser;
    addedGrantees: GranteeItem[];
    appliedGrantees: GranteeItem[];
    currentUserPermissions: CurrentUserPermissions;
    sharedObject: IAffectedSharedObject;
    onBackClick?: () => void;
    onDelete: (grantee: GranteeItem) => void;
    onAddUserOrGroups?: (grantee: GranteeItem) => void;
    onCancel: () => void;
    onSubmit: () => void;
    onGranularGranteeChange?: (grantee: GranteeItem) => void;
}
/**
 * @internal
 */
export interface IAddGranteeContentProps {
    currentUser: IUser;
    addedGrantees: GranteeItem[];
    appliedGrantees: GranteeItem[];
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    sharedObjectRef: ObjRef;
    areGranularPermissionsSupported?: boolean;
    onDelete: (grantee: GranteeItem) => void;
    onAddUserOrGroups: (grantee: GranteeItem) => void;
    onGranularGranteeChange?: (grantee: GranteeItem) => void;
}
/**
 * @internal
 */
export interface IGranteesListProps {
    mode: DialogModeType;
    grantees: GranteeItem[];
    currentUserPermissions: CurrentUserPermissions;
    isSharedObjectLocked: boolean;
    areGranularPermissionsSupported?: boolean;
    onDelete: (grantee: GranteeItem) => void;
    onChange?: (grantee: GranteeItem) => void;
}
/**
 * @internal
 */
export interface IAddUserOrGroupButton {
    isDisabled: boolean;
    onClick: () => void;
}
/**
 * @internal
 */
export interface IGroupedOption {
    label: string;
    options: ISelectOption[];
}
/**
 * @internal
 */
export interface ISelectOption {
    label: string;
    value: GranteeItem;
}
/**
 * @internal
 */
export interface ISelectErrorOption {
    isDisabled: boolean;
    type: "error";
    label: string;
}
/**
 * @internal
 */
export declare const isSelectErrorOption: (obj: unknown) => obj is ISelectErrorOption;
/**
 * @internal
 */
export interface IAddGranteeSelectProps {
    onSelectGrantee: (grantee: GranteeItem) => void;
    currentUser: IUser;
    appliedGrantees: GranteeItem[];
    sharedObjectRef: ObjRef;
}
/**
 * @internal
 */
export interface ISharedObjectLockControlProps {
    isLocked: boolean;
    isLockingSupported: boolean;
    onLockChange: (locked: boolean) => void;
}
/**
 * @internal
 */
export interface ISharedObjectUnderLenientControlProps {
    isUnderLenientControl: boolean;
    isLeniencyControlSupported: boolean;
    onUnderLenientControlChange: (isUnderLenientControl: boolean) => void;
}
/**
 * @internal
 */
export interface IGranteePermissionsPossibility {
    enabled: boolean;
    tooltip?: string;
}
/**
 * @internal
 */
export interface IGranularPermissionTypeItem extends IGranteePermissionsPossibility {
    id: AccessGranularPermission;
    hidden: boolean;
}
/**
 * @internal
 */
export interface IGranteePermissionsPossibilities {
    remove: IGranteePermissionsPossibility;
    assign: {
        items: IGranularPermissionTypeItem[];
        effective: AccessGranularPermission;
    };
    change: IGranteePermissionsPossibility;
}
//# sourceMappingURL=types.d.ts.map