// (C) 2021 GoodData Corporation
export async function listDashboardPlugins(config, _options) {
    const { backendInstance, workspace } = config;
    const plugins = await backendInstance.workspace(workspace).dashboards().getDashboardPlugins();
    return plugins.map((plugin) => {
        var _a, _b;
        return {
            identifier: plugin.identifier,
            title: plugin.name,
            description: plugin.description,
            tags: plugin.tags,
            updated: (_a = plugin.updated) !== null && _a !== void 0 ? _a : "unknown",
            created: (_b = plugin.created) !== null && _b !== void 0 ? _b : "unknown",
        };
    });
}
//# sourceMappingURL=listDashboardPlugins.js.map