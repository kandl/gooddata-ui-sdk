import { ObjRef } from "../objRef/index.js";
import { IWorkspaceUser } from "../user/index.js";
import { IWorkspaceUserGroup } from "../userGroup/index.js";
/**
 * User having access to the object.
 *
 * @alpha
 */
export interface IUserAccess {
    /**
     * Access type
     */
    type: "user";
    /**
     * Access user
     */
    user: IWorkspaceUser;
}
/**
 * Tests whether the provided object is an instance of {@link IUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isUserAccess: (obj: unknown) => obj is IUserAccess;
/**
 * User group having access to the object.
 *
 * @alpha
 */
export interface IUserGroupAccess {
    /**
     * Access type
     */
    type: "group";
    /**
     * Access user group
     */
    userGroup: IWorkspaceUserGroup;
}
/**
 * Tests whether the provided object is an instance of {@link IUserGroupAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isUserGroupAccess: (obj: unknown) => obj is IUserGroupAccess;
/**
 * User access specification with granular permissions.
 *
 * @alpha
 */
export interface IGranularUserAccess extends IGranteeGranularity {
    /**
     * Access type
     */
    type: "granularUser";
    /**
     * Access user
     */
    user: IWorkspaceUser;
}
/**
 * User group access specification with granular permissions.
 *
 * @alpha
 */
export interface IGranularUserGroupAccess extends IGranteeGranularity {
    /**
     * Access type
     */
    type: "granularGroup";
    /**
     * Access user group
     */
    userGroup: IWorkspaceUserGroup;
}
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserAccess: (obj: unknown) => obj is IGranularUserAccess;
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserGroupAccess: (obj: unknown) => obj is IGranularUserGroupAccess;
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccess} or {@link IGranularUserGroupAccess}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularAccess: (obj: unknown) => obj is IGranularUserAccess | IGranularUserGroupAccess;
/**
 * Entity having access to the object.
 *
 * @alpha
 */
export type AccessGranteeDetail = IUserAccess | IUserGroupAccess | IGranularUserAccess | IGranularUserGroupAccess;
/**
 * User access grantee specification.
 *
 * @public
 */
export interface IUserAccessGrantee {
    /**
     * Grantee type
     */
    type: "user";
    /**
     * Grantee object reference
     */
    granteeRef: ObjRef;
}
/**
 * Tests whether the provided object is an instance of {@link IUserAccessGrantee}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isUserAccessGrantee: (obj: unknown) => obj is IUserAccessGrantee;
/**
 * User group access grantee specification.
 *
 * @public
 */
export interface IUserGroupAccessGrantee {
    /**
     * Grantee type
     */
    type: "group";
    /**
     * Grantee object reference
     */
    granteeRef: ObjRef;
}
/**
 * Tests whether the provided object is an instance of {@link IUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @public
 */
export declare const isUserGroupAccessGrantee: (obj: unknown) => obj is IUserGroupAccessGrantee;
/**
 * Type of granted granular access.
 *
 * @public
 */
export type AccessGranularPermission = "VIEW" | "EDIT" | "SHARE";
/**
 * Access grantee specification with granular permissions.
 *
 * @public
 */
export interface IGranteeGranularity {
    /**
     * Permissions granted directly
     */
    permissions: AccessGranularPermission[];
    /**
     * Permissions granted by inheritance
     */
    inheritedPermissions: AccessGranularPermission[];
}
/**
 * User access grantee specification with granular permissions.
 *
 * @public
 */
export interface IGranularUserAccessGrantee extends IGranteeGranularity {
    /**
     * Access grantee type
     */
    type: "granularUser";
    /**
     * Access grantee object reference
     */
    granteeRef: ObjRef;
}
/**
 * User group access grantee specification with granular permissions.
 *
 * @public
 */
export interface IGranularUserGroupAccessGrantee extends IGranteeGranularity {
    /**
     * Access grantee type
     */
    type: "granularGroup";
    /**
     * Access grantee object reference
     */
    granteeRef: ObjRef;
}
/**
 * Tests whether the provided object is an instance of {@link IGranularUserAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserAccessGrantee: (obj: unknown) => obj is IGranularUserAccessGrantee;
/**
 * Tests whether the provided object is an instance of {@link IGranularUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularUserGroupAccessGrantee: (obj: unknown) => obj is IGranularUserGroupAccessGrantee;
/**
 * Tests whether the provided object is an instance of {@link IGranularAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isGranularAccessGrantee: (obj: unknown) => obj is IGranularAccessGrantee;
/**
 * Access grantee with granular permission.
 *
 * @public
 */
export type IGranularAccessGrantee = IGranularUserAccessGrantee | IGranularUserGroupAccessGrantee;
/**
 * Access grantee specification.
 *
 * @public
 */
export type IAccessGrantee = IUserGroupAccessGrantee | IUserAccessGrantee | IGranularAccessGrantee;
/**
 * User grantee that is available as target for granting of a permission to shared object.
 *
 * @alpha
 */
export interface IAvailableUserAccessGrantee {
    /**
     * Access grantee type
     */
    type: "user";
    /**
     * Access grantee object reference
     */
    ref: ObjRef;
    /**
     * Access grantee name
     */
    name: string;
    /**
     * Access grantee email
     */
    email?: string;
    /**
     * Access grantee status
     */
    status: "ENABLED" | "DISABLED";
}
/**
 * Tests whether the provided object is an instance of {@link IAvailableUserAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isAvailableUserAccessGrantee: (obj: unknown) => obj is IAvailableUserAccessGrantee;
/**
 * User group grantee that is available as target for granting of a permission to shared object.
 *
 * @alpha
 */
export interface IAvailableUserGroupAccessGrantee {
    /**
     * Access grantee type
     */
    type: "group";
    /**
     * Access grantee object reference
     */
    ref: ObjRef;
    /**
     * Access grantee name
     */
    name: string;
}
/**
 * Tests whether the provided object is an instance of {@link IAvailableUserGroupAccessGrantee}.
 *
 * @param obj - object to test
 * @alpha
 */
export declare const isAvailableUserGroupAccessGrantee: (obj: unknown) => obj is IAvailableUserGroupAccessGrantee;
/**
 * Grantee that is available as target for granting of a permission to shared object.
 *
 * @alpha
 */
export type IAvailableAccessGrantee = IAvailableUserAccessGrantee | IAvailableUserGroupAccessGrantee;
//# sourceMappingURL=index.d.ts.map