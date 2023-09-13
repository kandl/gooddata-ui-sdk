import { IWorkspacePermissionsService } from "@gooddata/sdk-backend-spi";
import { IWorkspacePermissions } from "@gooddata/sdk-model";
import { TigerAuthenticatedCallGuard } from "../../../types/index.js";
export declare class TigerWorkspacePermissionsFactory implements IWorkspacePermissionsService {
    readonly authCall: TigerAuthenticatedCallGuard;
    readonly workspace: string;
    constructor(authCall: TigerAuthenticatedCallGuard, workspace: string);
    getPermissionsForCurrentUser(): Promise<IWorkspacePermissions>;
}
//# sourceMappingURL=index.d.ts.map