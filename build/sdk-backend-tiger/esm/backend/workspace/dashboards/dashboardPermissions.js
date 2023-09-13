// (C) 2022-2023 GoodData Corporation
export function buildDashboardPermissions(permissions) {
    const canEditDashboard = hasPermission(permissions, "EDIT");
    const canShareDashboard = canEditDashboard || hasPermission(permissions, "SHARE");
    const canViewDashboard = canShareDashboard || hasPermission(permissions, "VIEW");
    return {
        canEditDashboard,
        canEditLockedDashboard: false,
        canShareDashboard,
        canShareLockedDashboard: canShareDashboard,
        canViewDashboard,
    };
}
function hasPermission(permissions, need) {
    return permissions.indexOf(need) >= 0;
}
//# sourceMappingURL=dashboardPermissions.js.map