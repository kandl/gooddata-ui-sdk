import { IWorkspaceAccessControlService } from "@gooddata/sdk-backend-spi";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
import { ObjRef, AccessGranteeDetail, IAccessGrantee, IAvailableAccessGrantee, IGranularAccessGrantee } from "@gooddata/sdk-model";
export declare class BearWorkspaceAccessControlService implements IWorkspaceAccessControlService {
    private readonly authCall;
    private readonly workspace;
    private users;
    private userGroups;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getAccessList(sharedObject: ObjRef): Promise<AccessGranteeDetail[]>;
    grantAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void>;
    revokeAccess(sharedObject: ObjRef, grantees: IAccessGrantee[]): Promise<void>;
    /**
     * Bear has no granular permissions, which means that the user or group either have permissions
     * or they don't. An empty array of grantee permissions will result in revoking the access
     * for the grantee. An array of grantee permissions with some content will result in granting
     * access for the grantee.
     */
    changeAccess(sharedObject: ObjRef, grantees: IGranularAccessGrantee[]): Promise<void>;
    getAvailableGrantees(_sharedObject: ObjRef, search?: string): Promise<IAvailableAccessGrantee[]>;
}
//# sourceMappingURL=index.d.ts.map