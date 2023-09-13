import { IUser, ObjRef, IWorkspaceUser, ShareStatus, AccessGranteeDetail, IGranularAccessGrantee, IAvailableUserAccessGrantee, IAvailableUserGroupAccessGrantee, IUserAccess, IGranularUserAccess, IUserGroupAccess, IGranularUserGroupAccess } from "@gooddata/sdk-model";
import { GranteeItem, IGranteeGroup, IGranteeGroupAll, IGranteeUser, IGranteeInactiveOwner, IAffectedSharedObject, IGranularGranteeUser, IGranularGranteeGroup } from "./ShareDialogBase/types.js";
import { ISharedObject } from "./types.js";
/**
 * @internal
 */
export declare const mapWorkspaceUserToGrantee: (user: IAvailableUserAccessGrantee, currentUser: IUser) => IGranteeUser;
/**
 * @internal
 */
export declare const mapWorkspaceUserGroupToGrantee: (userGroup: IAvailableUserGroupAccessGrantee) => IGranteeGroup;
/**
 * @internal
 */
export declare const mapUserFullName: (user: IUser | IWorkspaceUser) => string;
/**
 * @internal
 */
export declare const mapOwnerToGrantee: (user: IUser, currentUserRef: ObjRef) => IGranteeUser;
/**
 * @internal
 */
export declare const mapUserToInactiveOwner: () => IGranteeInactiveOwner;
/**
 * @internal
 */
export declare const mapShareStatusToGroupAll: (shareStatus: ShareStatus) => IGranteeGroupAll | undefined;
/**
 * @internal
 */
export declare const mapGranteesToGranularAccessGrantees: (grantees: GranteeItem[], added?: boolean) => IGranularAccessGrantee[];
/**
 * @internal
 */
export declare const mapUserAccessToGrantee: (userAccess: IUserAccess, currentUser: IUser) => IGranteeUser;
/**
 * @internal
 */
export declare const mapUserGroupAccessToGrantee: (userGroupAccess: IUserGroupAccess) => IGranteeGroup;
/**
 * @internal
 */
export declare const mapGranularUserAccessToGrantee: (userAccess: IGranularUserAccess, currentUser: IUser) => IGranularGranteeUser;
/**
 * @internal
 */
export declare const mapGranularUserGroupAccessToGrantee: (userGroupAccess: IGranularUserGroupAccess) => IGranularGranteeGroup;
export declare const mapAccessGranteeDetailToGrantee: (accessGranteeDetail: AccessGranteeDetail, currentUser: IUser) => GranteeItem;
/**
 * @internal
 */
export declare const mapGranteesToShareStatus: (grantees: GranteeItem[], granteesToAdd: GranteeItem[], granteesToDelete: GranteeItem[]) => ShareStatus;
/**
 * @internal
 */
export declare const mapSharedObjectToAffectedSharedObject: (sharedObject: ISharedObject, owner: IGranteeUser | IGranteeInactiveOwner, isLockingSupported: boolean, isLeniencyControlSupported: boolean, areGranularPermissionsSupported?: boolean, isMetadataObjectLockingSupported?: boolean, canWorkspaceManagerSeeEverySharedObject?: boolean) => IAffectedSharedObject;
//# sourceMappingURL=shareDialogMappers.d.ts.map