import { call } from "redux-saga/effects";
function loadPermissionsFromBackend(ctx) {
    const { backend, workspace } = ctx;
    return backend.workspace(workspace).permissions().getPermissionsForCurrentUser();
}
export function* resolvePermissions(ctx, cmd) {
    const { permissions } = cmd.payload;
    if (permissions) {
        return permissions;
    }
    const result = yield call(loadPermissionsFromBackend, ctx);
    return result;
}
//# sourceMappingURL=resolvePermissions.js.map