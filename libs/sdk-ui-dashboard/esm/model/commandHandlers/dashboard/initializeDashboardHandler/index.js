import { all, call, put } from "redux-saga/effects";
import { dashboardInitialized } from "../../../events/dashboard.js";
import { loadingActions } from "../../../store/loading/index.js";
import { walkLayout } from "@gooddata/sdk-backend-spi";
import { resolveDashboardConfig } from "./resolveDashboardConfig.js";
import { configActions } from "../../../store/config/index.js";
import { entitlementsActions } from "../../../store/entitlements/index.js";
import { dateFilterConfigActions } from "../../../store/dateFilterConfig/index.js";
import { mergeDateFilterConfigWithOverrides } from "./mergeDateFilterConfigs.js";
import { resolvePermissions } from "./resolvePermissions.js";
import { permissionsActions } from "../../../store/permissions/index.js";
import { loadCatalog } from "./loadCatalog.js";
import { loadDashboardAlerts } from "./loadDashboardAlerts.js";
import { catalogActions } from "../../../store/catalog/index.js";
import { alertsActions } from "../../../store/alerts/index.js";
import { batchActions } from "redux-batched-actions";
import { loadUser } from "./loadUser.js";
import { userActions } from "../../../store/user/index.js";
import { uiActions } from "../../../store/ui/index.js";
import { renderModeActions } from "../../../store/renderMode/index.js";
import { loadDashboardList } from "./loadDashboardList.js";
import { listedDashboardsActions } from "../../../store/listedDashboards/index.js";
import { backendCapabilitiesActions } from "../../../store/backendCapabilities/index.js";
import { areObjRefsEqual, isDrillToInsight, isInsightWidget, serializeObjRef, } from "@gooddata/sdk-model";
import { actionsToInitializeExistingDashboard, actionsToInitializeNewDashboard, } from "../common/stateInitializers.js";
import { executionResultsActions } from "../../../store/executionResults/index.js";
import { createDisplayFormMapFromCatalog } from "../../../../_staging/catalog/displayFormMap.js";
import { getPrivateContext } from "../../../store/_infra/contexts.js";
import { accessibleDashboardsActions } from "../../../store/accessibleDashboards/index.js";
import { loadAccessibleDashboardList } from "./loadAccessibleDashboardList.js";
import { loadLegacyDashboards } from "./loadLegacyDashboards.js";
import { legacyDashboardsActions } from "../../../store/legacyDashboards/index.js";
import uniqBy from "lodash/uniqBy.js";
import { loadDashboardPermissions } from "./loadDashboardPermissions.js";
import { dashboardPermissionsActions } from "../../../store/dashboardPermissions/index.js";
import { resolveEntitlements } from "./resolveEntitlements.js";
async function loadDashboardFromBackend(ctx, privateCtx, dashboardRef, hasPersistedDashboard) {
    const { backend, workspace, filterContextRef } = ctx;
    const { preloadedDashboard } = privateCtx;
    if (preloadedDashboard && areObjRefsEqual(preloadedDashboard.ref, dashboardRef)) {
        // with persisted dashboard we cannot use the backend for resolution of the referenced insights
        // as our version of dashboard differs from what is on the backend
        // hence we must do the resolution on the client
        if (hasPersistedDashboard) {
            const insights = await loadInsightsForPersistedDashboard(ctx, preloadedDashboard);
            return {
                dashboard: preloadedDashboard,
                references: {
                    insights,
                    plugins: [],
                },
            };
        }
        return backend
            .workspace(workspace)
            .dashboards()
            .getDashboardReferencedObjects(preloadedDashboard, ["insight"])
            .then((references) => {
            return {
                dashboard: preloadedDashboard,
                references,
            };
        });
    }
    return backend
        .workspace(workspace)
        .dashboards()
        .getDashboardWithReferences(dashboardRef, filterContextRef, { loadUserData: true }, ["insight"]);
}
async function loadInsightsForPersistedDashboard(ctx, dashboard) {
    if (!(dashboard === null || dashboard === void 0 ? void 0 : dashboard.layout)) {
        return [];
    }
    const { backend, workspace } = ctx;
    const referencedInsights = [];
    walkLayout(dashboard.layout, {
        widgetCallback: (widget) => {
            if (isInsightWidget(widget)) {
                referencedInsights.push(
                // insight itself
                widget.insight, 
                // insights in drills to insight
                ...widget.drills.filter(isDrillToInsight).map((drill) => drill.target));
            }
        },
    });
    const uniqueRefs = uniqBy(referencedInsights, serializeObjRef);
    return Promise.all(uniqueRefs.map((ref) => backend.workspace(workspace).insights().getInsight(ref)));
}
function* loadExistingDashboard(ctx, cmd, dashboardRef) {
    const { backend } = ctx;
    const privateCtx = yield call(getPrivateContext);
    const [dashboardWithReferences, config, permissions, entitlements, catalog, alerts, user, listedDashboards, accessibleDashboards, legacyDashboards, dashboardPermissions,] = yield all([
        call(loadDashboardFromBackend, ctx, privateCtx, dashboardRef, !!cmd.payload.persistedDashboard),
        call(resolveDashboardConfig, ctx, cmd),
        call(resolvePermissions, ctx, cmd),
        call(resolveEntitlements, ctx),
        call(loadCatalog, ctx),
        call(loadDashboardAlerts, ctx),
        call(loadUser, ctx),
        call(loadDashboardList, ctx),
        call(loadAccessibleDashboardList, ctx),
        call(loadLegacyDashboards, ctx),
        call(loadDashboardPermissions, ctx),
    ]);
    const { dashboard, references: { insights }, } = dashboardWithReferences;
    const effectiveDateFilterConfig = yield call(mergeDateFilterConfigWithOverrides, ctx, cmd, config.dateFilterConfig, dashboard.dateFilterConfig);
    const initActions = yield call(actionsToInitializeExistingDashboard, ctx, dashboard, insights, config.settings, effectiveDateFilterConfig.config, createDisplayFormMapFromCatalog(catalog), cmd.payload.persistedDashboard);
    const batch = batchActions([
        backendCapabilitiesActions.setBackendCapabilities(backend.capabilities),
        configActions.setConfig(config),
        entitlementsActions.setEntitlements(entitlements),
        userActions.setUser(user),
        permissionsActions.setPermissions(permissions),
        catalogActions.setCatalogItems({
            attributes: catalog.attributes(),
            dateDatasets: catalog.dateDatasets(),
            facts: catalog.facts(),
            measures: catalog.measures(),
            attributeHierarchies: catalog.attributeHierarchies(),
        }),
        ...initActions,
        alertsActions.setAlerts(alerts),
        dateFilterConfigActions.setDateFilterConfig({
            dateFilterConfig: dashboard.dateFilterConfig,
            effectiveDateFilterConfig: effectiveDateFilterConfig.config,
            isUsingDashboardOverrides: effectiveDateFilterConfig.source === "dashboard",
        }),
        listedDashboardsActions.setListedDashboards(listedDashboards),
        accessibleDashboardsActions.setAccessibleDashboards(accessibleDashboards),
        legacyDashboardsActions.setLegacyDashboards(legacyDashboards),
        uiActions.setMenuButtonItemsVisibility(config.menuButtonItemsVisibility),
        renderModeActions.setRenderMode(config.initialRenderMode),
        dashboardPermissionsActions.setDashboardPermissions(dashboardPermissions),
    ], "@@GDC.DASH/BATCH.INIT.EXISTING");
    const event = dashboardInitialized(ctx, dashboard, insights, config, permissions, cmd.correlationId);
    return {
        batch,
        event,
    };
}
function* initializeNewDashboard(ctx, cmd) {
    const { backend } = ctx;
    const [config, permissions, entitlements, catalog, user, listedDashboards, accessibleDashboards, legacyDashboards,] = yield all([
        call(resolveDashboardConfig, ctx, cmd),
        call(resolvePermissions, ctx, cmd),
        call(resolveEntitlements, ctx),
        call(loadCatalog, ctx),
        call(loadUser, ctx),
        call(loadDashboardList, ctx),
        call(loadAccessibleDashboardList, ctx),
        call(loadLegacyDashboards, ctx),
    ]);
    const batch = batchActions([
        backendCapabilitiesActions.setBackendCapabilities(backend.capabilities),
        configActions.setConfig(config),
        entitlementsActions.setEntitlements(entitlements),
        userActions.setUser(user),
        permissionsActions.setPermissions(permissions),
        catalogActions.setCatalogItems({
            attributes: catalog.attributes(),
            dateDatasets: catalog.dateDatasets(),
            facts: catalog.facts(),
            measures: catalog.measures(),
            attributeHierarchies: catalog.attributeHierarchies(),
        }),
        listedDashboardsActions.setListedDashboards(listedDashboards),
        accessibleDashboardsActions.setAccessibleDashboards(accessibleDashboards),
        legacyDashboardsActions.setLegacyDashboards(legacyDashboards),
        executionResultsActions.clearAllExecutionResults(),
        ...actionsToInitializeNewDashboard(config.dateFilterConfig),
        dateFilterConfigActions.setDateFilterConfig({
            dateFilterConfig: undefined,
            effectiveDateFilterConfig: config.dateFilterConfig,
            isUsingDashboardOverrides: false,
        }),
        uiActions.setMenuButtonItemsVisibility(config.menuButtonItemsVisibility),
        renderModeActions.setRenderMode(config.initialRenderMode),
        dashboardPermissionsActions.setDashboardPermissions({
            canViewDashboard: true,
            canShareDashboard: true,
            canShareLockedDashboard: true,
            canEditDashboard: true,
            canEditLockedDashboard: true,
        }),
    ], "@@GDC.DASH/BATCH.INIT.NEW");
    const event = dashboardInitialized(ctx, undefined, [], config, permissions, cmd.correlationId);
    return {
        batch,
        event,
    };
}
export function* initializeDashboardHandler(ctx, cmd) {
    const { dashboardRef } = ctx;
    try {
        yield put(loadingActions.setLoadingStart());
        let result;
        if (dashboardRef) {
            result = yield call(loadExistingDashboard, ctx, cmd, dashboardRef);
        }
        else {
            result = yield call(initializeNewDashboard, ctx, cmd);
        }
        yield put(result.batch);
        yield put(loadingActions.setLoadingSuccess());
        return result.event;
    }
    catch (e) {
        yield put(loadingActions.setLoadingError(e));
        throw e;
    }
}
//# sourceMappingURL=index.js.map