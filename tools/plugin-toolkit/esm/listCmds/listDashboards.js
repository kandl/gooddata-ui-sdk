// (C) 2021 GoodData Corporation
export async function listDashboards(config, _options) {
    const { backendInstance, workspace } = config;
    const dashboards = await backendInstance.workspace(workspace).dashboards().getDashboards();
    return dashboards.map((dashboard) => {
        var _a, _b, _c;
        return {
            identifier: dashboard.identifier,
            title: dashboard.title,
            description: dashboard.description,
            tags: (_a = dashboard.tags) !== null && _a !== void 0 ? _a : [],
            created: (_b = dashboard.created) !== null && _b !== void 0 ? _b : "unknown",
            updated: (_c = dashboard.updated) !== null && _c !== void 0 ? _c : "unknown",
        };
    });
}
//# sourceMappingURL=listDashboards.js.map