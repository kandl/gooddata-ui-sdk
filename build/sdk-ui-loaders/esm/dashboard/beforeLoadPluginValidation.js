/**
 * Validates plugins before actually loading them from remote location.
 *
 * @param ctx - context in which the dashboard operates
 * @param dashboardWithPlugins - dashboard with plugins
 */
export async function validatePluginsBeforeLoading(ctx, dashboardWithPlugins) {
    const { backend, workspace } = ctx;
    const { references: { plugins }, } = dashboardWithPlugins;
    const organization = await backend.organizations().getCurrentOrganization();
    for (const plugin of plugins) {
        const pluginResult = await organization
            .securitySettings()
            .isDashboardPluginUrlValid(plugin.url, workspace);
        if (!pluginResult) {
            console.error(`Dashboard plugin URL is not valid: ${plugin.url}`);
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=beforeLoadPluginValidation.js.map