// (C) 2020-2022 GoodData Corporation
import { MetadataModule } from "./metadata.js";
import { UserModule } from "./user.js";
import cloneDeepWith from "lodash/cloneDeepWith.js";
import compact from "lodash/compact.js";
import omit from "lodash/omit.js";
export function createTranslator(kpiMap, visWidgetMap) {
    return (oldUri) => {
        const kpiMatch = kpiMap.get(oldUri);
        const visWidgetMatch = visWidgetMap.get(oldUri);
        if (kpiMatch) {
            return kpiMatch;
        }
        else if (visWidgetMatch) {
            return visWidgetMatch;
        }
        else {
            return oldUri;
        }
    };
}
/**
 * Remove fields that we do not want to send (either because the server will generate them anyway, or because of options)
 * @param originalMeta - the meta to start with
 * @param options - the options relevant to this particular run
 */
function getSanitizedMeta(originalMeta, options) {
    return omit(originalMeta, compact([
        "identifier",
        "uri",
        "author",
        "created",
        "updated",
        "contributor",
        (options === null || options === void 0 ? void 0 : options.clearLockedFlag) && "locked",
    ]));
}
/**
 * Updates content of the dashboard
 *
 * @param dashboardUri - uri of dashboard
 * @param uriTranslator - gets updated widgets and kpis uri
 * @param filterContext - updated filter context uri
 * @experimental
 */
export function updateContent(analyticalDashboard, uriTranslator, filterContext) {
    return cloneDeepWith(Object.assign(Object.assign({}, analyticalDashboard.content), { filterContext, widgets: analyticalDashboard.content.widgets.map((uri) => {
            return uriTranslator(uri);
        }) }), (value) => {
        const uri = value.uri;
        if (!uri) {
            return;
        }
        return Object.assign(Object.assign({}, value), { uri: uriTranslator(uri) });
    });
}
export class MetadataModuleExt {
    constructor(xhr) {
        this.xhr = xhr;
        this.metadataModule = new MetadataModule(xhr);
        this.userModule = new UserModule(xhr);
    }
    /**
     * @param projectId - id of the project
     * @param dashboardUri - uri of the dashboard
     * @param options - object with options:
     *          - default - dashboard is cloned with new kpi reference and visualization widget is cloned with new
     *              visualization object reference
     *          - copyKpi - choose whether dashboard is cloned with new Kpi reference
     *          - copyVisObj - choose whether visualization widget is cloned with new visualization object reference
     *          - name - optional - choose name, default value is "Copy of (old title of the dashboard)"
     *          - summary - choose summary, default is the summary of the original dashboard
     *          - tags - choose tags, default is the tags of the original dashboard
     *          - clearLockedFlag - if true, the isLocked flag will be cleared for the newly created dashboard, defaults to false
     * @returns uri of cloned dashboard
     * @experimental
     */
    async saveDashboardAs(projectId, dashboardUri, options) {
        var _a, _b, _c, _d;
        const objectsFromDashboard = await this.getObjectsFromDashboard(projectId, dashboardUri);
        const dashboardDetails = await this.metadataModule.getObjectDetails(dashboardUri);
        const { analyticalDashboard } = dashboardDetails;
        const allCreatedObjUris = [];
        const visWidgetUris = [];
        try {
            const filterContext = await this.duplicateFilterContext(projectId, objectsFromDashboard, options);
            allCreatedObjUris.push(filterContext);
            const kpiMap = await this.duplicateOrKeepKpis(projectId, objectsFromDashboard, options);
            if (this.shouldCopyKpi(options)) {
                allCreatedObjUris.push(...Array.from(kpiMap.values()));
            }
            const visWidgetMap = await this.duplicateWidgets(projectId, objectsFromDashboard, options);
            visWidgetUris.push(...Array.from(visWidgetMap.values()));
            const translator = createTranslator(kpiMap, visWidgetMap);
            const updatedContent = updateContent(analyticalDashboard, translator, filterContext);
            const duplicateDashboard = {
                analyticalDashboard: Object.assign(Object.assign({}, dashboardDetails.analyticalDashboard), { content: {
                        filterContext,
                        layout: Object.assign({}, updatedContent.layout),
                        widgets: [...updatedContent.widgets],
                    }, meta: Object.assign(Object.assign({}, getSanitizedMeta(dashboardDetails.analyticalDashboard.meta, options)), { title: (_a = options.name) !== null && _a !== void 0 ? _a : `Copy of ${analyticalDashboard.meta.title}`, summary: (_c = (_b = options.summary) !== null && _b !== void 0 ? _b : analyticalDashboard.meta.summary) !== null && _c !== void 0 ? _c : "", tags: (_d = options.tags) !== null && _d !== void 0 ? _d : analyticalDashboard.meta.tags }) }),
            };
            return (await this.metadataModule.createObject(projectId, duplicateDashboard)).analyticalDashboard
                .meta.uri;
        }
        catch (err) {
            if (this.shouldCopyVisObj(options)) {
                await Promise.all(visWidgetUris.map((uri) => this.cascadingDelete(projectId, uri)));
            }
            else {
                await Promise.all(visWidgetUris.map((uri) => this.metadataModule.deleteObject(uri)));
            }
            await Promise.all(allCreatedObjUris.map((uri) => this.cascadingDelete(projectId, uri)));
            return dashboardUri;
        }
    }
    /**
     * Deletes dashboard and its objects
     * (only the author of the dashboard can delete the dashboard and its objects)
     *
     * @param projectId - Project identifier
     * @param dashboardUri - Uri of a dashboard to be deleted
     * @experimental
     */
    async cascadingDelete(projectID, dashboardUri) {
        const objects = await this.metadataModule.getObjectUsing(projectID, dashboardUri);
        const currentUser = (await this.userModule.getAccountInfo()).profileUri;
        const objectsToBeDeleted = objects
            .filter((object) => object.author === currentUser)
            .map((object) => {
            return object.link;
        });
        return this.xhr.post(`/gdc/md/${projectID}/objects/delete`, {
            body: {
                delete: {
                    items: [dashboardUri].concat(objectsToBeDeleted),
                    mode: "cascade",
                },
            },
        });
    }
    async duplicateOrKeepKpis(projectId, objsFromDashboard, options) {
        const uriMap = new Map();
        if (this.shouldCopyKpi(options)) {
            await Promise.all(objsFromDashboard
                .filter((obj) => this.unwrapObj(obj).meta.category === "kpi")
                .map(async (kpiWidget) => {
                const { kpi } = kpiWidget;
                const toSave = {
                    kpi: {
                        meta: getSanitizedMeta(kpi.meta, options),
                        content: Object.assign({}, kpi.content),
                    },
                };
                const newUriKpiObj = (await this.metadataModule.createObject(projectId, toSave)).kpi.meta.uri;
                uriMap.set(kpi.meta.uri, newUriKpiObj);
            }));
        }
        return uriMap;
    }
    async duplicateWidgets(projectId, objsFromDashboard, options) {
        const uriMap = new Map();
        await Promise.all(objsFromDashboard
            .filter((obj) => this.unwrapObj(obj).meta.category === "visualizationWidget")
            .map(async (visWidget) => {
            return this.createAndUpdateWidgets(projectId, visWidget, options, uriMap);
        }));
        return uriMap;
    }
    async createAndUpdateWidgets(projectId, visWidget, options, uriMap) {
        const { visualizationWidget } = visWidget;
        if (this.shouldCopyVisObj(options)) {
            const visObj = await this.metadataModule.getObjectDetails(visualizationWidget.content.visualization);
            const toSave = {
                visualizationObject: {
                    meta: getSanitizedMeta(visObj.visualizationObject.meta, options),
                    content: Object.assign({}, visObj.visualizationObject.content),
                },
            };
            const newUriVisObj = (await this.metadataModule.createObject(projectId, toSave))
                .visualizationObject.meta.uri;
            const updatedVisWidget = {
                visualizationWidget: {
                    meta: getSanitizedMeta(visWidget.visualizationWidget.meta, options),
                    content: Object.assign(Object.assign({}, visWidget.visualizationWidget.content), { visualization: newUriVisObj }),
                },
            };
            const visUri = (await this.metadataModule.createObject(projectId, updatedVisWidget))
                .visualizationWidget.meta.uri;
            uriMap.set(visualizationWidget.meta.uri, visUri);
        }
        else {
            const updatedVisWidget = {
                visualizationWidget: {
                    meta: getSanitizedMeta(visWidget.visualizationWidget.meta, options),
                    content: Object.assign({}, visWidget.visualizationWidget.content),
                },
            };
            const { visualizationWidget } = await this.metadataModule.createObject(projectId, updatedVisWidget);
            uriMap.set(visWidget.visualizationWidget.meta.uri, visualizationWidget.meta.uri);
        }
    }
    async duplicateFilterContext(projectId, objsFromDashboard, options) {
        const originalFilterContext = objsFromDashboard.filter((obj) => this.unwrapObj(obj).meta.category === "filterContext")[0];
        const toSave = {
            filterContext: {
                meta: getSanitizedMeta(originalFilterContext.filterContext.meta, options),
                content: Object.assign({}, originalFilterContext.filterContext.content),
            },
        };
        const { filterContext } = await this.metadataModule.createObject(projectId, toSave);
        return filterContext.meta.uri;
    }
    async getObjectsFromDashboard(projectId, dashboardUri) {
        const uris = await this.getObjectsUrisInDashboard(projectId, dashboardUri);
        return this.metadataModule.getObjects(projectId, uris); // TODO improve types
    }
    async getObjectsUrisInDashboard(projectId, dashboardUri) {
        return (await this.metadataModule.getObjectUsing(projectId, dashboardUri, {
            types: ["kpi", "visualizationWidget", "filterContext"],
        })).map((obj) => {
            return obj.link;
        });
    }
    unwrapObj(obj) {
        return obj[Object.keys(obj)[0]];
    }
    shouldCopyVisObj(options) {
        return !!(options.copyVisObj || typeof options.copyVisObj === "undefined");
    }
    shouldCopyKpi(options) {
        return !!(options.copyKpi || typeof options.copyKpi === "undefined");
    }
}
//# sourceMappingURL=metadataExt.js.map