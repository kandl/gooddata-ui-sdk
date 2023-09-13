import { convertPermissions } from "../../../convertors/toBackend/WorkspaceConverter.js";
import { userLoginMd5FromAuthenticatedPrincipal } from "../../../utils/api.js";
const emptyPermissions = { permissions: {} };
export class BearWorkspacePermissionsFactory {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getPermissionsForCurrentUser() {
        const permissions = await this.authCall(async (sdk, { getPrincipal }) => {
            const userLoginMd5 = await userLoginMd5FromAuthenticatedPrincipal(getPrincipal);
            return sdk.project.getPermissions(this.workspace, userLoginMd5);
        });
        return convertPermissions(permissions.associatedPermissions || emptyPermissions);
    }
}
//# sourceMappingURL=permissions.js.map