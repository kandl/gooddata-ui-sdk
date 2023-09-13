// (C) 2021-2023 GoodData Corporation
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import defaultReduxSaga from "redux-saga";
import { enableBatching } from "redux-batched-actions";
import { v4 as uuidv4 } from "uuid";
import { filterContextSliceReducer } from "./filterContext/index.js";
import { layoutSliceReducer } from "./layout/index.js";
import { loadingSliceReducer } from "./loading/index.js";
import { savingSliceReducer } from "./saving/index.js";
import { insightsSliceReducer } from "./insights/index.js";
import { createRootEventEmitter } from "./_infra/rootEventEmitter.js";
import { rootCommandHandler } from "./_infra/rootCommandHandler.js";
import { configSliceReducer } from "./config/index.js";
import { entitlementsSliceReducer } from "./entitlements/index.js";
import { dateFilterConfigSliceReducer } from "./dateFilterConfig/index.js";
import { permissionsSliceReducer } from "./permissions/index.js";
import { alertsSliceReducer } from "./alerts/index.js";
import { catalogSliceReducer } from "./catalog/index.js";
import { call, fork } from "redux-saga/effects";
import { userSliceReducer } from "./user/index.js";
import { metaSliceReducer } from "./meta/index.js";
import { AllQueryServices } from "../queryServices/index.js";
import { executionResultsSliceReducer } from "./executionResults/index.js";
import { createQueryProcessingModule } from "./_infra/queryProcessing.js";
import values from "lodash/values.js";
import merge from "lodash/merge.js";
import keyBy from "lodash/keyBy.js";
import { listedDashboardsSliceReducer } from "./listedDashboards/index.js";
import { accessibleDashboardsSliceReducer } from "./accessibleDashboards/index.js";
import { inaccessibleDashboardsSliceReducer } from "./inaccessibleDashboards/index.js";
import { backendCapabilitiesSliceReducer } from "./backendCapabilities/index.js";
import { drillTargetsReducer } from "./drillTargets/index.js";
import { drillSliceReducer } from "./drill/index.js";
import { uiSliceReducer } from "./ui/index.js";
import { getDashboardContext } from "./_infra/contexts.js";
import { legacyDashboardsSliceReducer } from "./legacyDashboards/index.js";
import { renderModeSliceReducer } from "./renderMode/index.js";
import { dashboardPermissionsSliceReducer } from "./dashboardPermissions/index.js";
import { defaultImport } from "default-import";
// There are known compatibility issues between CommonJS (CJS) and ECMAScript modules (ESM).
// In ESM, default exports of CJS modules are wrapped in default properties instead of being exposed directly.
// https://github.com/microsoft/TypeScript/issues/52086#issuecomment-1385978414
const createSagaMiddleware = defaultImport(defaultReduxSaga);
const nonSerializableEventsAndCommands = [
    "GDC.DASH/EVT.COMMAND.STARTED",
    "GDC.DASH/EVT.COMMAND.FAILED",
    "GDC.DASH/EVT.QUERY.FAILED",
    "@@GDC.DASH.SAVE_NEW",
    "@@GDC.DASH.SAVE_EXISTING",
    "@@GDC.DASH.SAVE_AS",
    // Execution events have errors, execution definitions etc. in them
    "GDC.DASH/EVT.WIDGET.EXECUTION_STARTED",
    "GDC.DASH/EVT.WIDGET.EXECUTION_SUCCEEDED",
    "GDC.DASH/EVT.WIDGET.EXECUTION_FAILED",
    // Custom events may contain whatever
    "GDC.DASH/CMD.EVENT.TRIGGER",
    // Drill commands & events contain non-serializable dataView
    "GDC.DASH/CMD.DRILL",
    "GDC.DASH/CMD.EXECUTION_RESULT.UPSERT",
    "GDC.DASH/EVT.DRILL.REQUESTED",
    "GDC.DASH/EVT.DRILL.RESOLVED",
    "GDC.DASH/CMD.DRILL.DRILL_DOWN",
    "GDC.DASH/EVT.DRILL.DRILL_DOWN.REQUESTED",
    "GDC.DASH/EVT.DRILL.DRILL_DOWN.RESOLVED",
    "GDC.DASH/CMD.DRILL.DRILL_TO_INSIGHT",
    "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.REQUESTED",
    "GDC.DASH/EVT.DRILL.DRILL_TO_INSIGHT.RESOLVED",
    "GDC.DASH/CMD.DRILL.DRILL_TO_DASHBOARD",
    "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.REQUESTED",
    "GDC.DASH/EVT.DRILL.DRILL_TO_DASHBOARD.RESOLVED",
    "GDC.DASH/CMD.DRILL.DRILL_TO_ATTRIBUTE_URL",
    "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.REQUESTED",
    "GDC.DASH/EVT.DRILL.DRILL_TO_ATTRIBUTE_URL.RESOLVED",
    "GDC.DASH/CMD.DRILL.DRILL_TO_CUSTOM_URL",
    "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.REQUESTED",
    "GDC.DASH/EVT.DRILL.DRILL_TO_CUSTOM_URL.RESOLVED",
    "GDC.DASH/CMD.DRILL.DRILL_TO_LEGACY_DASHBOARD",
    "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.REQUESTED",
    "GDC.DASH/EVT.DRILL.DRILL_TO_LEGACY_DASHBOARD.RESOLVED",
    "GDC.DASH/CMD.DRILL.DRILLABLE_ITEMS.CHANGE",
    "GDC.DASH/EVT.DRILL.DRILLABLE_ITEMS.CHANGED",
    "meta/setDrillableItems",
    "layout/updateWidgetIdentities",
    "executionResults/upsertExecutionResult",
    "loadingSlice/setLoadingError",
];
function* rootSaga(eventEmitter, commandHandler, queryProcessor, backgroundWorkers) {
    const dashboardContext = yield call(getDashboardContext);
    try {
        yield fork(eventEmitter);
        yield fork(commandHandler);
        yield fork(queryProcessor);
        for (const worker of backgroundWorkers) {
            yield fork(worker, dashboardContext);
        }
    }
    catch (e) {
        console.error("Root saga failed", e);
    }
}
/**
 * This middleware ensures that actions occurring in the dashboard have their meta enriched with appropriate
 * information:
 *  - all actions have an acceptedTimestamp - this represents the moment the action was recognized by the redux machinery
 *  - command actions also have a uuid - this is mainly used to implement the undo/redo logic
 *
 * Moving forward, there might be even more types of information added here.
 *
 * Note that for the time-related properties to make sense, this middleware should be registered as the first of all the middlewares if possible.
 */
const actionMetaFillingMiddleware = () => (next) => (action) => {
    const nowTimestamp = +new Date();
    action.meta = Object.assign(Object.assign({}, action.meta), { acceptedTimestamp: nowTimestamp });
    if (action.type.startsWith("GDC.DASH/CMD.")) {
        // see: https://www.reddit.com/r/reactjs/comments/7cfgzr/redux_modifying_action_payload_in_middleware/dppknrh?utm_source=share&utm_medium=web2x&context=3
        action.meta = Object.assign(Object.assign({}, action.meta), { uuid: uuidv4() });
    }
    return next(action);
};
function mergeQueryServices(original, extras = []) {
    return values(merge({}, keyBy(original, (service) => service.name), keyBy(extras, (service) => service.name)));
}
/**
 * Creates a new store for a dashboard.
 *
 * @param config - runtime configuration to apply on the middlewares and the store
 */
export function createDashboardStore(config) {
    var _a, _b;
    const queryProcessing = createQueryProcessingModule(mergeQueryServices(AllQueryServices, config.queryServices));
    const sagaMiddleware = createSagaMiddleware({
        context: {
            dashboardContext: config.dashboardContext,
            privateContext: (_a = config.privateContext) !== null && _a !== void 0 ? _a : {},
        },
    });
    const rootReducer = combineReducers({
        loading: loadingSliceReducer,
        saving: savingSliceReducer,
        backendCapabilities: backendCapabilitiesSliceReducer,
        config: configSliceReducer,
        entitlements: entitlementsSliceReducer,
        permissions: permissionsSliceReducer,
        filterContext: filterContextSliceReducer,
        layout: layoutSliceReducer,
        dateFilterConfig: dateFilterConfigSliceReducer,
        insights: insightsSliceReducer,
        alerts: alertsSliceReducer,
        drillTargets: drillTargetsReducer,
        catalog: catalogSliceReducer,
        user: userSliceReducer,
        meta: metaSliceReducer,
        drill: drillSliceReducer,
        listedDashboards: listedDashboardsSliceReducer,
        accessibleDashboards: accessibleDashboardsSliceReducer,
        inaccessibleDashboards: inaccessibleDashboardsSliceReducer,
        legacyDashboards: legacyDashboardsSliceReducer,
        executionResults: executionResultsSliceReducer,
        renderMode: renderModeSliceReducer,
        ui: uiSliceReducer,
        dashboardPermissions: dashboardPermissionsSliceReducer,
        _queryCache: queryProcessing.queryCacheReducer,
    });
    const store = configureStore({
        reducer: enableBatching(rootReducer),
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: false,
                /*
                 * All events that fly through the store have the dashboard context in the `ctx` prop. This is
                 * for the receiver of the event (who may be well off redux).
                 *
                 * Additionally, some events - namely those reporting on error scenarios may include the actual
                 * error instance in them.
                 */
                serializableCheck: {
                    ignoredActions: nonSerializableEventsAndCommands,
                    // events always include ctx
                    // various envelopes allow sending explicit callback functions that will be fired
                    // while processing the enveloped content. the envelopes are purely for 'promisification' of
                    // command or query handling, they have no impact on state; it is no problem that they
                    // have such content in them
                    ignoredActionPaths: ["ctx", "onStart", "onError", "onSuccess"],
                    ignoredPaths: [
                        // drillableItems can be functions (header predicates)
                        "drill.drillableItems",
                        // executions can have Errors stored, also some decorated execution results are non-serializable too
                        "executionResults",
                    ],
                    // prolong the check limit, otherwise this will flood the logs on CI with non-actionable warnings
                    warnAfter: 128,
                },
            })
                .prepend(actionMetaFillingMiddleware)
                .concat(...(config.additionalMiddleware ? [config.additionalMiddleware] : []), sagaMiddleware);
        },
    });
    const { eventing = {} } = config;
    if (eventing.onStateChange) {
        store.subscribe(() => { var _a; return (_a = eventing.onStateChange) === null || _a === void 0 ? void 0 : _a.call(eventing, store.getState(), store.dispatch); });
    }
    const rootEventEmitter = createRootEventEmitter(eventing.initialEventHandlers, store.dispatch);
    (_b = eventing.onEventingInitialized) === null || _b === void 0 ? void 0 : _b.call(eventing, rootEventEmitter.registerHandler, rootEventEmitter.unregisterHandler);
    const rootSagaTask = sagaMiddleware.run(rootSaga, rootEventEmitter.eventEmitterSaga, rootCommandHandler, queryProcessing.rootQueryProcessor, config.backgroundWorkers);
    return {
        store,
        registerEventHandler: rootEventEmitter.registerHandler,
        unregisterEventHandler: rootEventEmitter.unregisterHandler,
        rootSagaTask,
    };
}
//# sourceMappingURL=dashboardStore.js.map