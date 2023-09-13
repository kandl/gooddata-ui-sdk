// (C) 2019-2022 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import flow from "lodash/flow.js";
import map from "lodash/fp/map.js";
import sortBy from "lodash/fp/sortBy.js";
import { insightId, insightVisualizationUrl, insightFilters, insightSetFilters, } from "@gooddata/sdk-model";
import { convertVisualizationClass } from "../../../convertors/fromBackend/VisualizationClassConverter.js";
import { convertVisualization } from "../../../convertors/fromBackend/VisualizationConverter.js";
import { convertMetadataObjectXrefEntry } from "../../../convertors/fromBackend/MetaConverter.js";
import { convertInsight, convertInsightDefinition } from "../../../convertors/toBackend/InsightConverter.js";
import { objRefToUri, objRefsToUris, getObjectIdFromUri, updateUserMap } from "../../../utils/api.js";
import { InsightReferencesQuery } from "./insightReferences.js";
import { appendFilters } from "./filterMerging.js";
import { ServerPaging } from "@gooddata/sdk-backend-base";
import { getVisualizationUserUris } from "../../../utils/metadata.js";
export class BearWorkspaceInsights {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.getVisualizationClass = async (ref) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            const visClassResult = await this.authCall((sdk) => sdk.md.getObjects(this.workspace, [uri]));
            return convertVisualizationClass(visClassResult[0]);
        };
        this.getVisualizationClasses = async (options = {}) => {
            const visualizationClassesResult = await this.authCall((sdk) => {
                const queryOptions = {
                    category: "visualizationClass",
                };
                if (options.includeDeprecated) {
                    queryOptions.deprecated = true;
                }
                return sdk.md.getObjectsByQuery(this.workspace, queryOptions);
            });
            const visClassOrderingIndex = (visClass) => { var _a; return (_a = visClass.visualizationClass.content.orderIndex) !== null && _a !== void 0 ? _a : 0; };
            return flow(sortBy(visClassOrderingIndex), map(convertVisualizationClass))(visualizationClassesResult);
        };
        this.getInsight = async (ref, options = {}) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            const visualization = await this.authCall((sdk) => sdk.md.getVisualization(uri));
            const userMap = options.loadUserData
                ? await updateUserMap(new Map(), getVisualizationUserUris(visualization), this.authCall)
                : undefined;
            const visClassResult = await this.authCall((sdk) => sdk.md.getObjects(this.workspace, [
                visualization.visualizationObject.content.visualizationClass.uri,
            ]));
            const visClass = visClassResult[0];
            const visualizationClassUri = visClass.visualizationClass.content.url;
            return convertVisualization(visualization, visualizationClassUri, userMap);
        };
        this.getVisualizationClassesByVisualizationClassUri = async (options = {}) => {
            const visualizationClasses = await this.getVisualizationClasses(options);
            return visualizationClasses.reduce((acc, el) => {
                if (el.visualizationClass.uri) {
                    acc[el.visualizationClass.uri] = el.visualizationClass.url;
                }
                return acc;
            }, {});
        };
        this.getInsights = async (options) => {
            // get also deprecated visClasses in case some insights use them
            const visualizationClassUrlByVisualizationClassUri = await this.getVisualizationClassesByVisualizationClassUri({ includeDeprecated: true });
            return this.getInsightsInner(options !== null && options !== void 0 ? options : {}, visualizationClassUrlByVisualizationClassUri, new Map());
        };
        this.getInsightsInner = async (options, visualizationClassUrlByVisualizationClassUri, userMap) => {
            var _a;
            const mergedOptions = Object.assign(Object.assign({}, options), { getTotalCount: true });
            const defaultLimit = 50;
            return ServerPaging.for(async ({ limit, offset }) => {
                const data = await this.authCall((sdk) => sdk.md.getObjectsByQueryWithPaging(this.workspace, Object.assign(Object.assign({ category: "visualizationObject" }, mergedOptions), { 
                    // the limit must be specified at all times, otherwise we get 400 (RAIL-3557)
                    limit,
                    offset })));
                const { items, paging: { totalCount }, } = data;
                // only load the user data if explicitly asked to do so
                const updatedUserMap = options.loadUserData
                    ? await updateUserMap(userMap, flatMap(items, getVisualizationUserUris), this.authCall)
                    : userMap;
                const insights = items.map((visualization) => convertVisualization(visualization, visualizationClassUrlByVisualizationClassUri[visualization.visualizationObject.content.visualizationClass.uri], updatedUserMap));
                return {
                    items: insights,
                    totalCount: totalCount,
                };
            }, (_a = mergedOptions.limit) !== null && _a !== void 0 ? _a : defaultLimit, mergedOptions.offset);
        };
        this.createInsight = async (insight) => {
            const withConvertedVisClass = await this.getInsightWithConvertedVisClass(insight);
            const mdObject = await this.authCall((sdk) => sdk.md.saveVisualization(this.workspace, {
                visualizationObject: convertInsightDefinition(withConvertedVisClass),
            }));
            return convertVisualization(mdObject, insightVisualizationUrl(insight));
        };
        this.updateInsight = async (insight) => {
            const id = insightId(insight);
            const uri = await this.authCall((sdk) => sdk.md.getObjectUri(this.workspace, id));
            const withConvertedVisClass = await this.getInsightWithConvertedVisClass(insight);
            await this.authCall((sdk) => sdk.md.updateVisualization(this.workspace, uri, {
                visualizationObject: convertInsight(withConvertedVisClass),
            }));
            // sdk.md.updateVisualization returns just an URI, so we need to return the original insight
            return insight;
        };
        this.deleteInsight = async (ref) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            await this.authCall((sdk) => sdk.md.deleteVisualization(uri));
        };
        this.openInsightAsReport = async (insight) => {
            const visualizationObject = convertInsightDefinition(insight);
            return this.authCall((sdk) => sdk.md.openVisualizationAsReport(this.workspace, { visualizationObject }));
        };
        this.getInsightReferencedObjects = async (insight, types = ["dataSet", "measure", "fact", "attribute"]) => {
            return new InsightReferencesQuery(this.authCall, this.workspace, insight, types).run();
        };
        this.getInsightReferencingObjects = async (ref) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            const objectId = getObjectIdFromUri(uri);
            return this.authCall(async (sdk) => {
                const usedBy = await sdk.xhr.getParsed(`/gdc/md/${this.workspace}/usedby2/${objectId}?types=analyticalDashboard`);
                return {
                    analyticalDashboards: usedBy.entries.map((entry) => convertMetadataObjectXrefEntry("analyticalDashboard", entry)),
                };
            });
        };
        this.getInsightWithAddedFilters = async (insight, filters) => {
            if (!filters.length) {
                return insight;
            }
            const mergedFilters = await appendFilters(insightFilters(insight), filters, (refs) => objRefsToUris(refs, this.workspace, this.authCall));
            return insightSetFilters(insight, mergedFilters);
        };
        this.getVisualizationClassByUrl = async (url) => {
            const allVisClasses = await this.getVisualizationClasses();
            return allVisClasses.find((visClass) => visClass.visualizationClass.url === url);
        };
    }
    async getInsightWithConvertedVisClass(insight) {
        const visClassUrl = insightVisualizationUrl(insight);
        const visClass = await this.getVisualizationClassByUrl(visClassUrl);
        if (!visClass) {
            throw new Error(`Visualization class with url ${visClassUrl} not found.`);
        }
        return {
            insight: Object.assign(Object.assign({}, insight.insight), { visualizationUrl: visClass.visualizationClass.uri }),
        };
    }
}
//# sourceMappingURL=index.js.map