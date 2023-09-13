/**
 * @internal
 */
export function generateHeaderAccountMenuItems(workspacePermissions, // bootstrapResource.current.projectPermissions
uiSettings, // bootstrapResource.settings
workspaceId, // parsed from bootstrapResource.current.project.links.self
showOnlyLogoutItem, featureFlags) {
    const { canInitData } = workspacePermissions;
    const { displayAccountPage } = uiSettings;
    const accountMenuItems = [];
    const workspaceRef = (featureFlags === null || featureFlags === void 0 ? void 0 : featureFlags.enableRenamingProjectToWorkspace) ? "workspaces" : "projects";
    const accountItem = {
        key: "gs.header.account",
        className: "s-account",
        href: `/#s=/gdc/${workspaceRef}/${workspaceId}|accountPage|`,
    };
    const dataIntegrationConsoleItem = {
        key: "gs.header.dic",
        className: "s-dic",
        href: "/admin/disc/",
    };
    const logoutItem = {
        key: "gs.header.logout",
        className: "s-logout",
    };
    const showAccountItem = workspaceId && displayAccountPage && !showOnlyLogoutItem;
    const showDataIntegrationConsoleItem = canInitData === true && !showOnlyLogoutItem;
    if (showAccountItem) {
        accountMenuItems.push(accountItem);
    }
    if (showDataIntegrationConsoleItem) {
        accountMenuItems.push(dataIntegrationConsoleItem);
    }
    accountMenuItems.push(logoutItem);
    return accountMenuItems;
}
//# sourceMappingURL=generateHeaderAccountMenuItems.js.map