import { IAvailableUserAccessGrantee, IAvailableUserGroupAccessGrantee, IGranularUserAccess, IGranularUserGroupAccess } from "@gooddata/sdk-model";
import { UserAssignee, UserGroupAssignee, UserGroupPermission, UserPermission } from "@gooddata/api-client-tiger";
export declare const convertUserPermission: (user: UserPermission) => IGranularUserAccess;
export declare const convertUserGroupPermission: (group: UserGroupPermission) => IGranularUserGroupAccess;
export declare const convertUserAssignee: (user: UserAssignee) => IAvailableUserAccessGrantee;
export declare const convertUserGroupAssignee: (group: UserGroupAssignee) => IAvailableUserGroupAccessGrantee;
//# sourceMappingURL=AccessControlConverter.d.ts.map