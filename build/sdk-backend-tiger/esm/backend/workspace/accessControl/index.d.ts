import { IWorkspaceAccessControlService } from "@gooddata/sdk-backend-spi";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
import { ObjRef, AccessGranteeDetail, IGranularAccessGrantee, IAvailableAccessGrantee } from "@gooddata/sdk-model";
export declare class TigerWorkspaceAccessControlService implements IWorkspaceAccessControlService {
    private readonly authCall;
    private readonly workspace;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getAccessList(sharedObject: ObjRef): Promise<AccessGranteeDetail[]>;
    grantAccess(sharedObject: ObjRef, grantees: IGranularAccessGrantee[]): Promise<void>;
    revokeAccess(sharedObject: ObjRef, grantees: IGranularAccessGrantee[]): Promise<void>;
    changeAccess(sharedObject: ObjRef, grantees: IGranularAccessGrantee[]): Promise<void>;
    getAvailableGrantees(sharedObject: ObjRef, search?: string): Promise<IAvailableAccessGrantee[]>;
}
//# sourceMappingURL=index.d.ts.map