// (C) 2022-2023 GoodData Corporation
import { idRef, } from "@gooddata/sdk-model";
const getPermissionLevels = (permissions = [], source) => {
    return permissions
        .filter((permission) => permission.source === source)
        .map((permission) => permission.level);
};
export const convertUserPermission = (user) => {
    var _a, _b, _c, _d;
    return ({
        type: "granularUser",
        user: {
            ref: idRef(user.id),
            uri: user.id,
            email: (_a = user.email) !== null && _a !== void 0 ? _a : user.id,
            login: (_b = user.email) !== null && _b !== void 0 ? _b : user.id,
            fullName: (_d = (_c = user.name) !== null && _c !== void 0 ? _c : user.email) !== null && _d !== void 0 ? _d : user.id,
        },
        permissions: getPermissionLevels(user.permissions, "direct"),
        inheritedPermissions: getPermissionLevels(user.permissions, "indirect"),
    });
};
export const convertUserGroupPermission = (group) => {
    var _a;
    return ({
        type: "granularGroup",
        userGroup: { ref: idRef(group.id), name: (_a = group.name) !== null && _a !== void 0 ? _a : group.id },
        permissions: getPermissionLevels(group.permissions, "direct"),
        inheritedPermissions: getPermissionLevels(group.permissions, "indirect"),
    });
};
export const convertUserAssignee = (user) => {
    var _a, _b;
    return ({
        type: "user",
        ref: idRef(user.id),
        name: (_b = (_a = user.name) !== null && _a !== void 0 ? _a : user.email) !== null && _b !== void 0 ? _b : user.id,
        status: "ENABLED",
    });
};
export const convertUserGroupAssignee = (group) => {
    var _a;
    return ({
        type: "group",
        ref: idRef(group.id),
        name: (_a = group.name) !== null && _a !== void 0 ? _a : group.id,
    });
};
//# sourceMappingURL=AccessControlConverter.js.map