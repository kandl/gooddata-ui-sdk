import { objRefToUri } from "../../../utils/api.js";
import { convertGranteeEntry, convertWorkspaceUserGroupToAvailableUserGroupAccessGrantee, convertWorkspaceUserToAvailableUserAccessGrantee, convertGranularAccessGranteeToAcessGrantee, } from "../../../convertors/fromBackend/AccessControlConverter.js";
import { BearWorkspaceUsersQuery } from "../users/index.js";
import { BearWorkspaceUserGroupsQuery } from "../userGroups/index.js";
export class BearWorkspaceAccessControlService {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.users = new BearWorkspaceUsersQuery(this.authCall, this.workspace);
        this.userGroups = new BearWorkspaceUserGroupsQuery(this.authCall, this.workspace);
    }
    async getAccessList(sharedObject) {
        const objectUri = await objRefToUri(sharedObject, this.workspace, this.authCall);
        const granteesList = await this.authCall((sdk) => sdk.project.getGranteesInfo(objectUri, {}));
        const { grantees: { items }, } = granteesList;
        return items.map(convertGranteeEntry);
    }
    async grantAccess(sharedObject, grantees) {
        const objectUri = await objRefToUri(sharedObject, this.workspace, this.authCall);
        const granteeUris = await Promise.all(grantees.map((grantee) => objRefToUri(grantee.granteeRef, this.workspace, this.authCall)));
        return this.authCall((sdk) => sdk.project.addGrantees(objectUri, granteeUris));
    }
    async revokeAccess(sharedObject, grantees) {
        const objectUri = await objRefToUri(sharedObject, this.workspace, this.authCall);
        const granteeUris = await Promise.all(grantees.map((grantee) => objRefToUri(grantee.granteeRef, this.workspace, this.authCall)));
        return this.authCall((sdk) => sdk.project.removeGrantees(objectUri, granteeUris));
    }
    /**
     * Bear has no granular permissions, which means that the user or group either have permissions
     * or they don't. An empty array of grantee permissions will result in revoking the access
     * for the grantee. An array of grantee permissions with some content will result in granting
     * access for the grantee.
     */
    async changeAccess(sharedObject, grantees) {
        const granteesToGrantAccess = grantees
            .filter((grantee) => grantee.permissions.length > 0)
            .map(convertGranularAccessGranteeToAcessGrantee);
        const granteesToRevokeAccess = grantees
            .filter((grantee) => grantee.permissions.length === 0)
            .map(convertGranularAccessGranteeToAcessGrantee);
        if (granteesToGrantAccess.length) {
            await this.grantAccess(sharedObject, granteesToGrantAccess);
        }
        if (granteesToRevokeAccess.length) {
            await this.revokeAccess(sharedObject, granteesToRevokeAccess);
        }
    }
    async getAvailableGrantees(_sharedObject, search) {
        let usersOption = {};
        let groupsOption = {};
        if (search) {
            usersOption = Object.assign(Object.assign({}, usersOption), { search: `%${search}` });
            groupsOption = Object.assign(Object.assign({}, groupsOption), { search: `${search}` });
        }
        const workspaceUsersQuery = this.users.withOptions(usersOption).query();
        const workspaceGroupsQuery = this.userGroups.query(groupsOption);
        const [users, groups] = await Promise.all([workspaceUsersQuery, workspaceGroupsQuery]);
        return [
            ...users.items.map(convertWorkspaceUserToAvailableUserAccessGrantee),
            ...groups.items.map(convertWorkspaceUserGroupToAvailableUserGroupAccessGrantee),
        ];
    }
}
//# sourceMappingURL=index.js.map