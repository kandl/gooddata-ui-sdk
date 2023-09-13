import { IGranteeEntry } from "@gooddata/api-model-bear";
import { AccessGranteeDetail, IGranularAccessGrantee, IAvailableUserAccessGrantee, IAvailableUserGroupAccessGrantee, IWorkspaceUser, IWorkspaceUserGroup, IAccessGrantee } from "@gooddata/sdk-model";
export declare const convertGranteeEntry: (item: IGranteeEntry) => AccessGranteeDetail;
export declare const mapUserFullName: (user: IWorkspaceUser) => string;
export declare const convertWorkspaceUserToAvailableUserAccessGrantee: (user: IWorkspaceUser) => IAvailableUserAccessGrantee;
export declare const convertWorkspaceUserGroupToAvailableUserGroupAccessGrantee: (group: IWorkspaceUserGroup) => IAvailableUserGroupAccessGrantee;
export declare const convertGranularAccessGranteeToAcessGrantee: (grantee: IGranularAccessGrantee) => IAccessGrantee;
//# sourceMappingURL=AccessControlConverter.d.ts.map