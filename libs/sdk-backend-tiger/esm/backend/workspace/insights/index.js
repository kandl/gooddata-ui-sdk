// (C) 2019-2023 GoodData Corporation
import { UnexpectedError, } from "@gooddata/sdk-backend-spi";
import { objRefToString, insightTitle, insightId, mergeFilters, insightFilters, insightSetFilters, insightTags, insightSummary, } from "@gooddata/sdk-model";
import { jsonApiHeaders, MetadataUtilities, JsonApiVisualizationObjectInTypeEnum, ValidateRelationsHeader, } from "@gooddata/api-client-tiger";
import { insightFromInsightDefinition, visualizationObjectsItemToInsight, } from "../../../convertors/fromBackend/InsightConverter.js";
import { objRefToUri, objRefToIdentifier } from "../../../utils/api.js";
import { convertVisualizationObject } from "../../../convertors/fromBackend/visualizationObjects/VisualizationObjectConverter.js";
import { convertGraphEntityNodeToAnalyticalDashboard } from "../../../convertors/fromBackend/GraphConverter.js";
import { convertInsight } from "../../../convertors/toBackend/InsightConverter.js";
import { visualizationClasses as visualizationClassesMocks } from "./mocks/visualizationClasses.js";
import { InMemoryPaging } from "@gooddata/sdk-backend-base";
import { isInheritedObject } from "../../../convertors/fromBackend/ObjectInheritance.js";
import { convertUserIdentifier } from "../../../convertors/fromBackend/UsersConverter.js";
import { insightListComparator } from "./comparator.js";
export class TigerWorkspaceInsights {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.getVisualizationClass = async (ref) => {
            const uri = await objRefToUri(ref, this.workspace, this.authCall);
            const visualizationClasses = await this.getVisualizationClasses();
            const visualizationClass = visualizationClasses.find((v) => v.visualizationClass.uri === uri);
            if (!visualizationClass) {
                throw new UnexpectedError(`Visualization class for ${objRefToString(ref)} not found!`);
            }
            return visualizationClass;
        };
        this.getVisualizationClasses = async () => {
            return this.authCall(async () => visualizationClassesMocks);
        };
        this.getInsights = async (options) => {
            var _a, _b;
            const requestParameters = this.getInsightsRequestParameters(options);
            const allInsights = await this.authCall((client) => {
                return MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesVisualizationObjects, requestParameters, { headers: ValidateRelationsHeader })
                    .then(MetadataUtilities.mergeEntitiesResults)
                    .then(MetadataUtilities.filterValidEntities)
                    .then((res) => {
                    if (options === null || options === void 0 ? void 0 : options.title) {
                        const lowercaseSearch = options.title.toLocaleLowerCase();
                        return res.data
                            .filter((vo) => {
                            var _a;
                            const title = (_a = vo.attributes) === null || _a === void 0 ? void 0 : _a.title;
                            return title && title.toLowerCase().indexOf(lowercaseSearch) > -1;
                        })
                            .map((insight) => visualizationObjectsItemToInsight(insight, res.included));
                    }
                    return res.data.map((insight) => visualizationObjectsItemToInsight(insight, res.included));
                });
            });
            // Remove when API starts to support sort=modifiedBy,createdBy,insight.title
            // (first verify that modifiedBy,createdBy behave as the code below, i.e., use createdBy if modifiedBy is
            // not defined as it is missing for the insights that were just created and never updated, also title
            // should be compared in case-insensitive manner)
            const sanitizedOrder = requestParameters.sort === undefined && allInsights.length > 0
                ? [...allInsights].sort(insightListComparator)
                : allInsights;
            return new InMemoryPaging(sanitizedOrder, (_a = options === null || options === void 0 ? void 0 : options.limit) !== null && _a !== void 0 ? _a : 50, (_b = options === null || options === void 0 ? void 0 : options.offset) !== null && _b !== void 0 ? _b : 0);
        };
        this.getInsightsRequestParameters = (options) => {
            const orderBy = options === null || options === void 0 ? void 0 : options.orderBy;
            const usesOrderingByUpdated = !orderBy || orderBy === "updated";
            const sortConfiguration = usesOrderingByUpdated ? {} : { sort: [orderBy] }; // sort: ["modifiedAt", "createdAt"]
            const includeUser = (options === null || options === void 0 ? void 0 : options.loadUserData) || (options === null || options === void 0 ? void 0 : options.author)
                ? { include: ["createdBy", "modifiedBy"] }
                : {};
            const authorFilter = (options === null || options === void 0 ? void 0 : options.author) ? { filter: `createdBy.id=='${options === null || options === void 0 ? void 0 : options.author}'` } : {};
            return Object.assign(Object.assign(Object.assign({ workspaceId: this.workspace }, sortConfiguration), includeUser), authorFilter);
        };
        this.getInsight = async (ref, options = {}) => {
            var _a, _b;
            const id = await objRefToIdentifier(ref, this.authCall);
            const includeUser = (options === null || options === void 0 ? void 0 : options.loadUserData)
                ? { include: ["createdBy", "modifiedBy"] }
                : {};
            const response = await this.authCall((client) => client.entities.getEntityVisualizationObjects(Object.assign({ objectId: id, workspaceId: this.workspace }, includeUser), {
                headers: jsonApiHeaders,
            }));
            const { data: visualizationObject, links, included } = response.data;
            const { relationships = {} } = visualizationObject;
            const { createdBy, modifiedBy } = relationships;
            const insight = insightFromInsightDefinition(convertVisualizationObject(visualizationObject.attributes.content, visualizationObject.attributes.title, visualizationObject.attributes.description, visualizationObject.attributes.tags), visualizationObject.id, links.self, visualizationObject.attributes.tags, isInheritedObject(visualizationObject), (_a = visualizationObject.attributes) === null || _a === void 0 ? void 0 : _a.createdAt, (_b = visualizationObject.attributes) === null || _b === void 0 ? void 0 : _b.modifiedAt, convertUserIdentifier(createdBy, included), convertUserIdentifier(modifiedBy, included));
            if (!insight) {
                throw new UnexpectedError(`Insight for ${objRefToString(ref)} not found!`);
            }
            return insight;
        };
        this.createInsight = async (insight) => {
            var _a, _b, _c, _d, _e;
            const createResponse = await this.authCall((client) => {
                return client.entities.createEntityVisualizationObjects({
                    workspaceId: this.workspace,
                    jsonApiVisualizationObjectPostOptionalIdDocument: {
                        data: {
                            type: JsonApiVisualizationObjectInTypeEnum.VISUALIZATION_OBJECT,
                            attributes: {
                                description: insightSummary(insight),
                                content: convertInsight(insight),
                                title: insightTitle(insight),
                                tags: insightTags(insight),
                            },
                        },
                    },
                }, {
                    headers: jsonApiHeaders,
                });
            });
            const insightData = createResponse.data;
            return insightFromInsightDefinition(insight, insightData.data.id, insightData.links.self, (_a = insightData.data.attributes) === null || _a === void 0 ? void 0 : _a.tags, isInheritedObject(insightData.data), (_b = insightData.data.attributes) === null || _b === void 0 ? void 0 : _b.createdAt, (_c = insightData.data.attributes) === null || _c === void 0 ? void 0 : _c.modifiedAt, convertUserIdentifier((_d = insightData.data.relationships) === null || _d === void 0 ? void 0 : _d.createdBy, insightData.included), convertUserIdentifier((_e = insightData.data.relationships) === null || _e === void 0 ? void 0 : _e.modifiedBy, insightData.included));
        };
        this.updateInsight = async (insight) => {
            await this.authCall((client) => {
                return client.entities.updateEntityVisualizationObjects({
                    objectId: insightId(insight),
                    workspaceId: this.workspace,
                    jsonApiVisualizationObjectInDocument: {
                        data: {
                            id: insightId(insight),
                            type: JsonApiVisualizationObjectInTypeEnum.VISUALIZATION_OBJECT,
                            attributes: {
                                description: insightSummary(insight),
                                content: convertInsight(insight),
                                title: insightTitle(insight),
                                tags: insightTags(insight),
                            },
                        },
                    },
                }, {
                    headers: jsonApiHeaders,
                });
            });
            return insight;
        };
        this.deleteInsight = async (ref) => {
            const id = await objRefToIdentifier(ref, this.authCall);
            await this.authCall((client) => client.entities.deleteEntityVisualizationObjects({
                objectId: id,
                workspaceId: this.workspace,
            }));
        };
        this.getInsightReferencedObjects = async (_insight, _types) => {
            return Promise.resolve({});
        };
        this.getInsightReferencingObjects = async (ref) => {
            const id = await objRefToIdentifier(ref, this.authCall);
            const entitiesGraph = await this.authCall((client) => client.actions
                .getDependentEntitiesGraphFromEntryPoints({
                workspaceId: this.workspace,
                dependentEntitiesRequest: {
                    identifiers: [
                        {
                            id,
                            type: "visualizationObject",
                        },
                    ],
                },
            })
                .then((res) => res.data.graph));
            const analyticalDashboards = entitiesGraph.nodes
                .filter(({ type }) => type === "analyticalDashboard")
                .map(convertGraphEntityNodeToAnalyticalDashboard);
            return { analyticalDashboards };
        };
        this.getInsightWithAddedFilters = async (insight, filters) => {
            if (!filters.length) {
                return insight;
            }
            // we assume that all the filters in tiger already use idRefs exclusively
            const mergedFilters = mergeFilters(insightFilters(insight), filters);
            return insightSetFilters(insight, mergedFilters);
        };
    }
}
//# sourceMappingURL=index.js.map