import { IWorkspacePermissionsService } from "@gooddata/sdk-backend-spi";
import { IWorkspacePermissions } from "@gooddata/sdk-model";
import { BearAuthenticatedCallGuard } from "../../../types/auth.js";
export declare class BearWorkspacePermissionsFactory implements IWorkspacePermissionsService {
    readonly authCall: BearAuthenticatedCallGuard;
    readonly workspace: string;
    constructor(authCall: BearAuthenticatedCallGuard, workspace: string);
    getPermissionsForCurrentUser(): Promise<IWorkspacePermissions>;
}
//# sourceMappingURL=permissions.d.ts.map