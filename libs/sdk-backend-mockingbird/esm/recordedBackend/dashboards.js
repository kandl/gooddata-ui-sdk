// (C) 2019-2023 GoodData Corporation
import { NotSupported, UnexpectedResponseError, walkLayout, } from "@gooddata/sdk-backend-spi";
import { areObjRefsEqual, idRef, isIdentifierRef, isFilterContextDefinition, isKpiWidgetDefinition, isInsightWidgetDefinition, isInsightWidget, } from "@gooddata/sdk-model";
import cloneDeep from "lodash/cloneDeep.js";
import isEqual from "lodash/isEqual.js";
import values from "lodash/values.js";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "lodash/isEmpty.js";
import includes from "lodash/includes.js";
function isDashboardRecording(obj) {
    return !isEmpty(obj) && obj.obj !== undefined;
}
export class RecordedDashboards {
    constructor(workspace, insights, recordings) {
        this.workspace = workspace;
        this.insights = insights;
        this.recordings = recordings;
        this.localDashboards = [];
        this.getDashboards = () => {
            var _a, _b;
            const result = values((_b = (_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.dashboards) !== null && _b !== void 0 ? _b : {}).map((recording) => {
                var _a;
                const { obj: { dashboard }, } = recording;
                return {
                    ref: dashboard.ref,
                    uri: dashboard.uri,
                    identifier: dashboard.identifier,
                    title: dashboard.title,
                    created: dashboard.created,
                    description: dashboard.description,
                    updated: dashboard.updated,
                    tags: (_a = dashboard.tags) !== null && _a !== void 0 ? _a : [],
                };
            });
            return Promise.resolve(result);
        };
        this.getDashboard = (ref, filterContextRef) => {
            if (filterContextRef) {
                throw new NotSupported("recorded backend does not support filter context override");
            }
            const recording = this.findRecordingOrLocalDashboard(ref);
            if (!recording) {
                return Promise.reject(new UnexpectedResponseError("Not Found", 404, {}));
            }
            if (isDashboardRecording(recording)) {
                return Promise.resolve(recording.obj.dashboard);
            }
            return Promise.resolve(recording);
        };
        this.getDashboardWidgetAlertsForCurrentUser = (ref) => {
            const recording = this.findRecordingOrLocalDashboard(ref);
            if (!recording) {
                return Promise.reject(new UnexpectedResponseError("Not Found", 404, {}));
            }
            if (isDashboardRecording(recording)) {
                return Promise.resolve(recording.alerts);
            }
            return Promise.resolve([]);
        };
        this.getDashboardWithReferences = async (ref, filterContextRef, _options, types = ["insight"]) => {
            if (filterContextRef) {
                throw new NotSupported("recorded backend does not support filter context override");
            }
            const recording = this.findRecordingOrLocalDashboard(ref);
            if (!recording) {
                return Promise.reject(new UnexpectedResponseError("Not Found", 404, {}));
            }
            if (isDashboardRecording(recording)) {
                const { dashboard, references } = recording.obj;
                return Promise.resolve({
                    dashboard: dashboard,
                    references: removeUnneededReferences(references, types),
                });
            }
            const insightsPromise = [];
            if (includes(types, "insight")) {
                walkLayout(recording.layout, {
                    widgetCallback: (widget) => {
                        if (isInsightWidgetDefinition(widget) || isInsightWidget(widget)) {
                            insightsPromise.push(this.insights.getInsight(widget.insight));
                        }
                    },
                });
            }
            const insights = await Promise.all(insightsPromise);
            return Promise.resolve({
                dashboard: recording,
                references: {
                    insights,
                    plugins: [],
                },
            });
        };
        this.getDashboardReferencedObjects = (dashboard, types = ["insight", "dashboardPlugin"]) => {
            const fullDashboard = this.getDashboardWithReferences(dashboard.ref, undefined, undefined, types);
            return fullDashboard.then((dashboard) => dashboard.references);
        };
        this.createDashboard = (dashboard) => {
            const emptyDashboard = {
                type: "IDashboard",
                description: "",
                filterContext: undefined,
                title: "",
                shareStatus: "private",
                isUnderStrictControl: true,
            };
            return this.updateDashboard(emptyDashboard, dashboard);
        };
        this.updateDashboard = async (dashboard, updatedDashboard) => {
            if (!areObjRefsEqual(dashboard.ref, updatedDashboard.ref)) {
                throw new Error("Cannot update dashboard with different refs!");
            }
            else if (isEqual(dashboard, updatedDashboard)) {
                return dashboard;
            }
            let savedDashboard = cloneDeep(updatedDashboard);
            if (!savedDashboard.ref) {
                const newId = uuidv4();
                savedDashboard = Object.assign(Object.assign({}, savedDashboard), { identifier: newId, uri: newId, ref: idRef(newId), created: "2021-01-01 01:01:00", updated: "2021-01-01 01:01:00" });
            }
            if (isFilterContextDefinition(savedDashboard.filterContext)) {
                const newId = uuidv4();
                // use either existing identity and default to new identity
                const { identifier = newId, uri = newId, ref = idRef(newId) } = savedDashboard.filterContext;
                savedDashboard = Object.assign(Object.assign({}, savedDashboard), { filterContext: Object.assign(Object.assign({}, savedDashboard.filterContext), { identifier,
                        uri,
                        ref }) });
            }
            walkLayout(savedDashboard.layout, {
                widgetCallback: (widget) => {
                    if (isKpiWidgetDefinition(widget) || isInsightWidgetDefinition(widget)) {
                        const newId = uuidv4();
                        widget.identifier = newId;
                        widget.uri = newId;
                        widget.ref = idRef(newId);
                    }
                },
            });
            this.addOrUpdateLocalDashboard(savedDashboard);
            return savedDashboard;
        };
    }
    findRecordingOrLocalDashboard(ref) {
        var _a, _b;
        const recordedDashboard = values((_b = (_a = this.recordings.metadata) === null || _a === void 0 ? void 0 : _a.dashboards) !== null && _b !== void 0 ? _b : {}).find((recording) => {
            const { obj: { dashboard }, } = recording;
            return isIdentifierRef(ref) ? ref.identifier === dashboard.identifier : ref.uri === dashboard.uri;
        });
        if (recordedDashboard) {
            return recordedDashboard;
        }
        return this.localDashboards.find((dashboard) => {
            return isIdentifierRef(ref) ? ref.identifier === dashboard.identifier : ref.uri === dashboard.uri;
        });
    }
    addOrUpdateLocalDashboard(dashboard) {
        const ref = dashboard.ref;
        const idx = this.localDashboards.findIndex((dashboard) => {
            return isIdentifierRef(ref) ? ref.identifier === dashboard.identifier : ref.uri === dashboard.uri;
        });
        if (idx >= 0) {
            this.localDashboards = this.localDashboards.splice(idx, 1, dashboard);
        }
        else {
            this.localDashboards.push(dashboard);
        }
    }
    deleteDashboard(_ref) {
        return Promise.resolve();
    }
    //
    //
    //
    getWidgetAlertsCountForWidgets(_refs) {
        throw new NotSupported("recorded backend does not support this call");
    }
    getWidgetReferencedObjects(_widget, _types) {
        throw new NotSupported("recorded backend does not support this call");
    }
    getAllWidgetAlertsForCurrentUser() {
        throw new NotSupported("recorded backend does not support this call");
    }
    getResolvedFiltersForWidget(_widget, _filters) {
        return Promise.resolve([
            {
                negativeAttributeFilter: {
                    displayForm: {
                        uri: "/example/md/mock/123",
                    },
                    notIn: {
                        uris: ["/example/md/mock/124"],
                    },
                },
            },
        ]);
    }
    getScheduledMailsForDashboard(_ref, _options) {
        throw new NotSupported("recorded backend does not support this call");
    }
    getScheduledMailsCountForDashboard(_ref) {
        throw new NotSupported("recorded backend does not support this call");
    }
    exportDashboardToPdf(_ref, _filters) {
        return Promise.resolve({
            uri: "/example/export.pdf",
            objectUrl: "blob:/01345454545454",
            fileName: "export.pdf",
        });
    }
    //
    // unsupported from down here
    //
    createScheduledMail(_scheduledMail, _exportFilterContext) {
        throw new NotSupported("recorded backend does not support this call");
    }
    updateScheduledMail(_ref) {
        throw new NotSupported("recorded backend does not support this call");
    }
    deleteScheduledMail(_ref) {
        throw new NotSupported("recorded backend does not support this call");
    }
    createWidgetAlert(_alert) {
        throw new NotSupported("recorded backend does not support this call");
    }
    deleteWidgetAlert(_ref) {
        throw new NotSupported("recorded backend does not support this call");
    }
    deleteWidgetAlerts(_refs) {
        return Promise.resolve();
    }
    updateWidgetAlert(_alert) {
        throw new NotSupported("recorded backend does not support this call");
    }
    createDashboardPlugin(_plugin) {
        throw new NotSupported("recorded backend does not support this call");
    }
    deleteDashboardPlugin(_ref) {
        throw new NotSupported("recorded backend does not support this call");
    }
    getDashboardPlugin(_ref, _options) {
        throw new NotSupported("recorded backend does not support this call");
    }
    getDashboardPlugins(_options) {
        throw new NotSupported("recorded backend does not support this call");
    }
    getDashboardPermissions() {
        return Promise.resolve({
            canEditDashboard: true,
            canEditLockedDashboard: true,
            canShareDashboard: true,
            canShareLockedDashboard: true,
            canViewDashboard: true,
        });
    }
    validateDashboardsExistence(_dashboardRefs) {
        return Promise.resolve([]);
    }
}
function removeUnneededReferences(references, types) {
    return {
        insights: includes(types, "insight") ? references.insights : [],
        plugins: includes(types, "dashboardPlugin") ? references.plugins : [],
    };
}
//# sourceMappingURL=dashboards.js.map