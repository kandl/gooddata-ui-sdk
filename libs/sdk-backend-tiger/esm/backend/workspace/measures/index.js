import { jsonApiHeaders, JsonApiMetricInTypeEnum, MetadataUtilities, } from "@gooddata/api-client-tiger";
import { idRef, isIdentifierRef, } from "@gooddata/sdk-model";
import { convertMetricFromBackend } from "../../../convertors/fromBackend/MetricConverter.js";
import { convertMetricToBackend } from "../../../convertors/toBackend/MetricConverter.js";
import { objRefToIdentifier } from "../../../utils/api.js";
import { tokenizeExpression } from "./measureExpressionTokens.js";
import { visualizationObjectsItemToInsight } from "../../../convertors/fromBackend/InsightConverter.js";
export class TigerWorkspaceMeasures {
    constructor(authCall, workspace) {
        this.authCall = authCall;
        this.workspace = workspace;
        this.getMeasureReferencingObjects = async (ref) => {
            const id = await objRefToIdentifier(ref, this.authCall);
            const insights = this.authCall((client) => MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesVisualizationObjects, {
                workspaceId: this.workspace,
                // return only visualizationObjects that have a link to the given measure
                filter: `metrics.id==${id}`, // RSQL format of querying data
            })
                .then(MetadataUtilities.mergeEntitiesResults)
                .then((insights) => insights.data.map((insight) => visualizationObjectsItemToInsight(insight, insights.included))));
            const measures = this.authCall((client) => MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesMetrics, {
                workspaceId: this.workspace,
                include: ["metrics"],
                // return only measures that have a link to the given measure
                filter: `metrics.id==${id}`, // RSQL format of querying data
            })
                .then(MetadataUtilities.mergeEntitiesResults)
                .then((measures) => measures.data.map((metric) => convertMetricFromBackend(metric, measures.included))));
            const request = Promise.all([insights, measures]);
            return request.then(([insights, measures]) => {
                return {
                    insights,
                    measures,
                };
            });
        };
    }
    async getMeasureExpressionTokens(ref) {
        if (!isIdentifierRef(ref)) {
            throw new Error("only identifiers supported");
        }
        const metricMetadata = await this.authCall((client) => client.entities.getEntityMetrics({
            objectId: ref.identifier,
            workspaceId: this.workspace,
            include: ["facts", "metrics", "attributes", "labels", "datasets"],
        }, {
            headers: jsonApiHeaders,
        }));
        const metric = metricMetadata.data;
        const maql = metric.data.attributes.content.maql || "";
        const regexTokens = tokenizeExpression(maql);
        return regexTokens.map((regexToken) => this.resolveToken(regexToken, metric));
    }
    resolveToken(regexToken, metric) {
        if (regexToken.type === "text" ||
            regexToken.type === "quoted_text" ||
            regexToken.type === "comment" ||
            regexToken.type === "number" ||
            regexToken.type === "bracket") {
            return { type: regexToken.type, value: regexToken.value };
        }
        const [type, id] = regexToken.value.split("/");
        if (type === "metric" ||
            type === "fact" ||
            type === "attribute" ||
            type === "label" ||
            type === "dataset") {
            return this.resolveObjectToken(id, type, metric.included || [], metric.data.id);
        }
        throw new Error(`Cannot resolve title of object type ${type}`);
    }
    resolveObjectToken(objectId, objectType, includedObjects, identifier) {
        var _a;
        const includedObject = includedObjects.find((includedObject) => {
            return includedObject.id === objectId && includedObject.type === objectType;
        });
        const typeMapping = {
            metric: "measure",
            fact: "fact",
            attribute: "attribute",
            label: "attribute",
            dataset: "dataSet",
        };
        const value = ((_a = includedObject === null || includedObject === void 0 ? void 0 : includedObject.attributes) === null || _a === void 0 ? void 0 : _a.title) || `${objectType}/${objectId}`;
        return {
            type: typeMapping[objectType],
            value,
            id: objectId,
            ref: idRef(identifier),
        };
    }
    async createMeasure(measure) {
        const metricAttributes = convertMetricToBackend(measure);
        const result = await this.authCall((client) => {
            return client.entities.createEntityMetrics({
                workspaceId: this.workspace,
                jsonApiMetricPostOptionalIdDocument: {
                    data: {
                        id: measure.id,
                        type: JsonApiMetricInTypeEnum.METRIC,
                        attributes: metricAttributes,
                    },
                },
            }, {
                headers: jsonApiHeaders,
            });
        });
        return convertMetricFromBackend(result.data, result.data.included);
    }
    async updateMeasure(measure) {
        const objectId = await objRefToIdentifier(measure.ref, this.authCall);
        const metricAttributes = convertMetricToBackend(measure);
        const result = await this.authCall((client) => {
            return client.entities.updateEntityMetrics({
                objectId,
                workspaceId: this.workspace,
                jsonApiMetricInDocument: {
                    data: {
                        id: objectId,
                        type: JsonApiMetricInTypeEnum.METRIC,
                        attributes: metricAttributes,
                    },
                },
            }, {
                headers: jsonApiHeaders,
            });
        });
        return convertMetricFromBackend(result.data, result.data.included);
    }
    async deleteMeasure(measureRef) {
        const objectId = await objRefToIdentifier(measureRef, this.authCall);
        await this.authCall((client) => {
            return client.entities.deleteEntityMetrics({
                objectId,
                workspaceId: this.workspace,
            });
        });
    }
}
//# sourceMappingURL=index.js.map