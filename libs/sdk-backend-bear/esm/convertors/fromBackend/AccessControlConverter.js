import { __rest } from "tslib";
import { convertWorkspaceUserGroup } from "./UserGroupsConverter.js";
import { convertUsersItem } from "./UsersConverter.js";
import { isGranularUserAccessGrantee, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
function isGranteeUserInfo(grantee) {
    return !isEmpty(grantee) && grantee.user !== undefined;
}
export const convertGranteeEntry = (item) => {
    if (isGranteeUserInfo(item.aclEntry.grantee)) {
        return {
            type: "user",
            user: convertUsersItem(item.aclEntry.grantee.user),
        };
    }
    else {
        return {
            type: "group",
            userGroup: convertWorkspaceUserGroup(item.aclEntry.grantee.userGroup),
        };
    }
};
export const mapUserFullName = (user) => {
    if (user.fullName) {
        return user.fullName;
    }
    return `${user.firstName} ${user.lastName}`;
};
export const convertWorkspaceUserToAvailableUserAccessGrantee = (user) => {
    var _a;
    return ({
        type: "user",
        ref: user.ref,
        name: mapUserFullName(user),
        email: user.email,
        status: (_a = user.status) !== null && _a !== void 0 ? _a : "DISABLED",
    });
};
export const convertWorkspaceUserGroupToAvailableUserGroupAccessGrantee = (group) => {
    var _a;
    return ({
        type: "group",
        ref: group.ref,
        name: (_a = group.name) !== null && _a !== void 0 ? _a : "",
    });
};
export const convertGranularAccessGranteeToAcessGrantee = (grantee) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { permissions, inheritedPermissions } = grantee, rest = __rest(grantee, ["permissions", "inheritedPermissions"]);
    const type = isGranularUserAccessGrantee(grantee) ? "user" : "group";
    return Object.assign(Object.assign({}, rest), { type });
};
//# sourceMappingURL=AccessControlConverter.js.map