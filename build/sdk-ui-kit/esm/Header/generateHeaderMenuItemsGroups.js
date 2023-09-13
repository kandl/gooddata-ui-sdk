import { isFreemiumEdition, shouldHidePPExperience, shouldEnableNewNavigation, } from "../utils/featureFlags.js";
/**
 * @internal
 */
export const HEADER_ITEM_ID_DASHBOARDS = "gs.header.dashboards";
/**
 * @internal
 */
export const HEADER_ITEM_ID_REPORTS = "gs.header.reports";
/**
 * @internal
 */
export const HEADER_ITEM_ID_KPIS_NEW = "gs.header.kpis.new";
/**
 * @internal
 */
export const HEADER_ITEM_ID_KPIS = "gs.header.kpis";
/**
 * @internal
 */
export const HEADER_ITEM_ID_ANALYZE = "gs.header.analyze";
/**
 * @internal
 */
export const HEADER_ITEM_ID_METRICS = "gs.header.metrics";
/**
 * @internal
 */
export const HEADER_ITEM_ID_LOAD = "gs.header.load";
/**
 * @internal
 */
export const HEADER_ITEM_ID_DATA = "gs.header.data";
/**
 * @internal
 */
export const HEADER_ITEM_ID_MANAGE = "gs.header.manage";
/**
 * @internal
 */
export function generateHeaderMenuItemsGroups(featureFlags, workspacePermissions, hasAnalyticalDashboards = false, workspaceId = undefined, dashboardId = undefined, tabId = undefined, hasNoDataSet = false, backendSupportsDataItem = false, backendSupportsCsvUploader = true, hasMeasures = false, hasManage = true) {
    if (!workspaceId) {
        return [];
    }
    const workspaceRef = featureFlags.enableRenamingProjectToWorkspace ? "workspace" : "project";
    const pixelPerfectItemsGroup = createPixelPerfectItemsGroup(featureFlags, workspacePermissions, workspaceRef, workspaceId, dashboardId, tabId);
    const insightItemsGroup = createInsightsItemsGroup(featureFlags, workspaceRef, workspaceId, workspacePermissions, hasAnalyticalDashboards, hasMeasures, backendSupportsCsvUploader, backendSupportsDataItem, hasNoDataSet);
    const manageItemsGroup = createManageItemsGroup(workspacePermissions, workspaceRef, workspaceId, hasManage);
    return [pixelPerfectItemsGroup, insightItemsGroup, manageItemsGroup].filter((itemsGroup) => itemsGroup.length > 0);
}
function createPixelPerfectItemsGroup(featureFlags, workspacePermissions, workspaceRef, workspaceId, dashboardId, tabId) {
    const { canAccessWorkbench, canManageReport } = workspacePermissions;
    const shouldHidePixelPerfectExperience = shouldHidePPExperience(featureFlags);
    const pixelPerfectItemsGroup = [];
    const dashboardUrl = dashboardsItemUrl(workspaceRef, workspaceId, dashboardId, tabId);
    pushConditionally(pixelPerfectItemsGroup, createIHeaderMenuItem(HEADER_ITEM_ID_DASHBOARDS, "s-menu-dashboards", dashboardUrl), !shouldHidePixelPerfectExperience && canAccessWorkbench === true);
    const reportsUrl = reportsItemUrl(workspaceRef, workspaceId);
    pushConditionally(pixelPerfectItemsGroup, createIHeaderMenuItem(HEADER_ITEM_ID_REPORTS, "s-menu-reports", reportsUrl), !shouldHidePixelPerfectExperience && canManageReport === true);
    return pixelPerfectItemsGroup;
}
function createManageItemsGroup(workspacePermissions, workspaceRef, workspaceId, hasManage) {
    const { canManageMetric } = workspacePermissions;
    const manageItemsGroup = [];
    const manageUrl = manageItemUrl(workspaceRef, workspaceId);
    pushConditionally(manageItemsGroup, createIHeaderMenuItem(HEADER_ITEM_ID_MANAGE, "s-menu-manage", manageUrl), canManageMetric && hasManage);
    return manageItemsGroup;
}
function createInsightsItemsGroup(featureFlags, workspaceRef, workspaceId, workspacePermissions, hasAnalyticalDashboards, hasMeasures, backendSupportsCsvUploader, backendSupportsDataItem, hasNoDataSet) {
    const isFreemiumCustomer = isFreemiumEdition(featureFlags.platformEdition);
    const insightItemsGroup = [];
    const kpisUrl = kpisItemUrl(workspaceRef, workspaceId);
    const kpisKey = shouldEnableNewNavigation(featureFlags) ? HEADER_ITEM_ID_KPIS_NEW : HEADER_ITEM_ID_KPIS;
    pushConditionally(insightItemsGroup, createIHeaderMenuItem(kpisKey, "s-menu-kpis", kpisUrl), canShowKpisItem(featureFlags, workspacePermissions, hasAnalyticalDashboards));
    const analyzeUrl = analyzeItemUrl(workspaceId);
    pushConditionally(insightItemsGroup, createIHeaderMenuItem(HEADER_ITEM_ID_ANALYZE, "s-menu-analyze", analyzeUrl), canShowAnalyzeItem(featureFlags, workspacePermissions));
    const measuresUrl = measuresItemUrl(workspaceId);
    pushConditionally(insightItemsGroup, createIHeaderMenuItem(HEADER_ITEM_ID_METRICS, "s-menu-metrics", measuresUrl), canShowMetricsItem(hasMeasures, workspacePermissions));
    const dataUrl = dataItemUrl(workspaceRef, workspaceId, workspacePermissions, backendSupportsDataItem, hasNoDataSet);
    pushConditionally(insightItemsGroup, createIHeaderMenuItem(HEADER_ITEM_ID_DATA, "s-menu-data", dataUrl), canShowDataItem(featureFlags, workspacePermissions));
    const loadUrl = loadItemUrl(workspaceRef, workspaceId);
    pushConditionally(insightItemsGroup, createIHeaderMenuItem(HEADER_ITEM_ID_LOAD, "s-menu-load", loadUrl), canShowLoadItem(featureFlags, workspacePermissions, isFreemiumCustomer, backendSupportsCsvUploader));
    return insightItemsGroup;
}
function createIHeaderMenuItem(key, className, href) {
    return {
        key,
        className,
        href,
    };
}
function pushConditionally(items, item, cond) {
    if (cond) {
        items.push(item);
    }
}
function manageItemUrl(workspaceRef, workspaceId) {
    return `/#s=/gdc/${workspaceRef}s/${workspaceId}|dataPage|`;
}
function measuresItemUrl(workspaceId) {
    return `/metrics/#/${workspaceId}`;
}
function canShowMetricsItem(hasMetrics, workspacePermissions) {
    return Boolean(workspacePermissions.canManageMetric === true && hasMetrics);
}
function kpisItemUrl(workspaceRef, workspaceId) {
    return `/dashboards/#/${workspaceRef}/${workspaceId}`;
}
function canShowKpisItem(featureFlags, workspacePermissions, hasAnalyticalDashboards) {
    return Boolean(hasAnalyticalDashboards ||
        (workspacePermissions.canCreateAnalyticalDashboard === true &&
            featureFlags.enableAnalyticalDashboards));
}
function analyzeItemUrl(workspaceId) {
    return `/analyze/#/${workspaceId}/reportId/edit`;
}
function canShowAnalyzeItem(featureFlags, workspacePermissions) {
    return Boolean(workspacePermissions.canCreateVisualization === true && featureFlags.analyticalDesigner);
}
function dataItemUrl(workspaceRef, workspaceId, workspacePermissions, backendSupportsDataItem, hasNoDataSet) {
    if (backendSupportsDataItem) {
        return `/modeler/#/${workspaceId}`;
    }
    if (workspacePermissions.canManageProject && hasNoDataSet) {
        return `/admin/connect/#/${workspaceRef}s/${workspaceId}/datasource`;
    }
    return `/modeler/#/${workspaceRef}s/${workspaceId}`;
}
function canShowDataItem(featureFlags, workspacePermissions) {
    return (featureFlags.enableDataSection &&
        (workspacePermissions.canInitData || workspacePermissions.canRefreshData));
}
function loadItemUrl(workspaceRef, workspaceId) {
    return `/data/#/${workspaceRef}s/${workspaceId}/datasets`;
}
function canShowLoadItem(featureFlags, workspacePermissions, isFreemiumCustomer, backendSupportsCsvUploader) {
    const canAccessLoadCsvPage = workspacePermissions.canUploadNonProductionCSV === true && featureFlags.enableCsvUploader;
    const canShowLoadCsvItem = featureFlags.enableDataSection
        ? !isFreemiumCustomer && canAccessLoadCsvPage
        : canAccessLoadCsvPage;
    return Boolean(canShowLoadCsvItem && backendSupportsCsvUploader);
}
function dashboardsItemUrl(workspaceRef, workspaceId, dashboardId, tabId) {
    const dashboardIdAndTabId = dashboardId && tabId ? `${dashboardId}|${tabId}` : "";
    return `/#s=/gdc/${workspaceRef}s/${workspaceId}|${workspaceRef}DashboardPage|${dashboardIdAndTabId}`;
}
function reportsItemUrl(workspaceRef, workspaceId) {
    return `/#s=/gdc/${workspaceRef}s/${workspaceId}|domainPage|all-reports`;
}
//# sourceMappingURL=generateHeaderMenuItemsGroups.js.map