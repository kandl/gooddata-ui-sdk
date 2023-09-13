// (C) 2019-2022 GoodData Corporation
import { uriRef } from "@gooddata/sdk-model";
export async function loadLegacyDashboards(ctx) {
    const dashboardResponse = await getProjectDashboards(ctx.backend, ctx.workspace);
    if (!dashboardResponse) {
        return [];
    }
    return projectDashboardToLegacyDashboard(dashboardResponse);
}
function emptyPromise() {
    return Promise.resolve();
}
function unwrapDecoratedBackend(backend) {
    if (backend === null || backend === void 0 ? void 0 : backend.decorated) {
        return unwrapDecoratedBackend(backend.decorated);
    }
    return backend;
}
function getBackendAuthApiCallPrivateMethod(backend) {
    var _a;
    return (_a = backend.authApiCall) !== null && _a !== void 0 ? _a : emptyPromise;
}
function getBearProjectDashboardMethod(client) {
    var _a;
    const method = (_a = client === null || client === void 0 ? void 0 : client.md) === null || _a === void 0 ? void 0 : _a.getProjectDashboards.bind(client === null || client === void 0 ? void 0 : client.md);
    return method !== null && method !== void 0 ? method : emptyPromise;
}
async function getProjectDashboards(backend, workspace) {
    const unwrappedBackend = unwrapDecoratedBackend(backend);
    const authApiCall = getBackendAuthApiCallPrivateMethod(unwrappedBackend);
    return authApiCall(async (client) => {
        const projectDashboardMethod = getBearProjectDashboardMethod(client);
        return projectDashboardMethod(workspace);
    });
}
function projectDashboardToLegacyDashboard(data) {
    return data.map((item) => {
        const { content, meta } = item.projectDashboard;
        return {
            identifier: meta.identifier,
            uri: meta.uri,
            ref: uriRef(meta.uri),
            title: meta.title,
            tabs: content.tabs.map((tab) => {
                return {
                    identifier: tab.identifier,
                    title: tab.title,
                };
            }),
        };
    });
}
//# sourceMappingURL=loadLegacyDashboards.js.map