import { AssigneeIdentifierTypeEnum } from "@gooddata/api-client-tiger";
import { isGranularUserAccessGrantee, } from "@gooddata/sdk-model";
import { convertUserAssignee, convertUserGroupAssignee, convertUserPermission, convertUserGroupPermission, } from "../../../convertors/fromBackend/AccessControlConverter.js";
import { objRefToIdentifier } from "../../../utils/api.js";
export class TigerWorkspaceAccessControlService {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
    }
    async getAccessList(sharedObject) {
        const objectId = await objRefToIdentifier(sharedObject, this.authCall);
        const permissions = await this.authCall((client) => {
            return client.actions
                .dashboardPermissions({ workspaceId: this.workspace, dashboardId: objectId })
                .then((result) => result.data);
        });
        return [
            ...permissions.users.map(convertUserPermission),
            ...permissions.userGroups.map(convertUserGroupPermission),
        ];
    }
    async grantAccess(sharedObject, grantees) {
        return this.changeAccess(sharedObject, grantees);
    }
    async revokeAccess(sharedObject, grantees) {
        const granteesToRevokeAccess = grantees.map((grantee) => (Object.assign(Object.assign({}, grantee), { permissions: [] })));
        return this.changeAccess(sharedObject, granteesToRevokeAccess);
    }
    async changeAccess(sharedObject, grantees) {
        const objectId = await objRefToIdentifier(sharedObject, this.authCall);
        const permissionsForAssignee = await Promise.all(grantees.map(async (grantee) => ({
            assigneeIdentifier: {
                id: await objRefToIdentifier(grantee.granteeRef, this.authCall),
                type: isGranularUserAccessGrantee(grantee)
                    ? AssigneeIdentifierTypeEnum.USER
                    : AssigneeIdentifierTypeEnum.USER_GROUP,
            },
            permissions: grantee.permissions,
        })));
        await this.authCall((client) => {
            return client.actions
                .manageDashboardPermissions({
                workspaceId: this.workspace,
                dashboardId: objectId,
                permissionsForAssignee,
            })
                .then((result) => result.data);
        });
    }
    async getAvailableGrantees(sharedObject, search) {
        const objectId = await objRefToIdentifier(sharedObject, this.authCall);
        const availableGrantees = await this.authCall((client) => {
            return client.actions
                .availableAssignees({
                workspaceId: this.workspace,
                dashboardId: objectId,
            })
                .then((result) => result.data)
                .then((assignees) => (search ? filterAssignees(assignees, search) : assignees));
        });
        return [
            ...availableGrantees.users.map(convertUserAssignee),
            ...availableGrantees.userGroups.map(convertUserGroupAssignee),
        ];
    }
}
const isNameMatchingSearchString = (name, searchString) => (name === null || name === void 0 ? void 0 : name.toLowerCase().indexOf(searchString)) > -1;
const filterAssignees = (grantees, search) => {
    const lowercaseSearch = search.toLocaleLowerCase();
    const { users, userGroups } = grantees;
    const filteredUsers = users.filter(({ name, id }) => isNameMatchingSearchString(name !== null && name !== void 0 ? name : id, lowercaseSearch));
    const filteredUserGroups = userGroups.filter(({ name, id }) => isNameMatchingSearchString(name !== null && name !== void 0 ? name : id, lowercaseSearch));
    return {
        users: filteredUsers,
        userGroups: filteredUserGroups,
    };
};
//# sourceMappingURL=index.js.map