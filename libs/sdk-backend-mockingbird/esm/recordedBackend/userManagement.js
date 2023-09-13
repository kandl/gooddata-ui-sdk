import { InMemoryPaging } from "@gooddata/sdk-backend-base";
/**
 * @internal
 */
export function recordedUserGroupsQuery(implConfig) {
    return {
        query: (_options) => {
            var _a, _b, _c;
            const result = (_c = (_b = (_a = implConfig.userManagement) === null || _a === void 0 ? void 0 : _a.userGroup) === null || _b === void 0 ? void 0 : _b.userGroups) !== null && _c !== void 0 ? _c : [];
            return Promise.resolve(new InMemoryPaging(result));
        },
    };
}
/**
 * @internal
 */
export function recordedAccessControlFactory(implConfig) {
    return {
        getAccessList: (_sharedObjectRef) => {
            var _a, _b, _c;
            const result = (_c = (_b = (_a = implConfig.userManagement) === null || _a === void 0 ? void 0 : _a.accessControl) === null || _b === void 0 ? void 0 : _b.accessList) !== null && _c !== void 0 ? _c : [];
            return Promise.resolve(result);
        },
        grantAccess: () => Promise.resolve(),
        revokeAccess: () => Promise.resolve(),
        changeAccess: () => Promise.resolve(),
        getAvailableGrantees: () => {
            var _a, _b, _c;
            const result = (_c = (_b = (_a = implConfig.userManagement) === null || _a === void 0 ? void 0 : _a.accessControl) === null || _b === void 0 ? void 0 : _b.availableGrantees) !== null && _c !== void 0 ? _c : [];
            return Promise.resolve(result);
        },
    };
}
/**
 * @internal
 */
export class RecordedWorkspaceUsersQuery {
    constructor(config) {
        this.config = {};
        this.config = config;
    }
    withOptions(_options) {
        return this;
    }
    queryAll() {
        var _a, _b, _c, _d;
        const result = (_d = (_c = (_b = (_a = this.config) === null || _a === void 0 ? void 0 : _a.userManagement) === null || _b === void 0 ? void 0 : _b.users) === null || _c === void 0 ? void 0 : _c.users) !== null && _d !== void 0 ? _d : [];
        return Promise.resolve(result);
    }
    query() {
        var _a, _b, _c;
        const result = (_c = (_b = (_a = this.config.userManagement) === null || _a === void 0 ? void 0 : _a.users) === null || _b === void 0 ? void 0 : _b.users) !== null && _c !== void 0 ? _c : [];
        return Promise.resolve(new InMemoryPaging(result));
    }
}
//# sourceMappingURL=userManagement.js.map