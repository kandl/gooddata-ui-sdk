import { MetadataUtilities, ValidateRelationsHeader, } from "@gooddata/api-client-tiger";
import { convertAttribute, createLabelMap } from "./tigerCommon.js";
function convertMetrics(metrics) {
    return metrics.data.map((metric) => {
        var _a, _b, _c, _d, _e;
        return {
            metric: {
                meta: {
                    identifier: metric.id,
                    title: (_b = (_a = metric.attributes) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : metric.id,
                    tags: (_e = (_d = (_c = metric.attributes) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.join(",")) !== null && _e !== void 0 ? _e : "",
                },
            },
        };
    });
}
function convertFacts(facts) {
    return facts.data.map((fact) => {
        var _a, _b, _c, _d, _e;
        return {
            fact: {
                meta: {
                    identifier: fact.id,
                    title: (_b = (_a = fact.attributes) === null || _a === void 0 ? void 0 : _a.title) !== null && _b !== void 0 ? _b : fact.id,
                    tags: (_e = (_d = (_c = fact.attributes) === null || _c === void 0 ? void 0 : _c.tags) === null || _d === void 0 ? void 0 : _d.join(",")) !== null && _e !== void 0 ? _e : "",
                },
            },
        };
    });
}
function convertAttributes(attributes) {
    const labels = createLabelMap(attributes.included);
    /*
     * Filter out date data set attributes. Purely because there is special processing for them
     * in catalog & code generators. Want to stick to that.
     *
     */
    return attributes.data
        .filter((attribute) => { var _a; return ((_a = attribute.attributes) === null || _a === void 0 ? void 0 : _a.granularity) === undefined; })
        .map((attribute) => convertAttribute(attribute, labels))
        .filter((a) => a !== undefined);
}
/**
 * Loads metric, attribute and fact catalog
 */
export async function loadCatalog(client, workspaceId) {
    const [metricsResult, factsResult, attributesResult] = await Promise.all([
        MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesMetrics, {
            workspaceId,
        }, { headers: ValidateRelationsHeader })
            .then(MetadataUtilities.mergeEntitiesResults)
            .then(MetadataUtilities.filterValidEntities),
        MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesFacts, {
            workspaceId,
        }).then(MetadataUtilities.mergeEntitiesResults),
        MetadataUtilities.getAllPagesOf(client, client.entities.getAllEntitiesAttributes, {
            workspaceId,
            include: ["labels"],
        }).then(MetadataUtilities.mergeEntitiesResults),
    ]);
    return {
        metrics: convertMetrics(metricsResult),
        facts: convertFacts(factsResult),
        attributes: convertAttributes(attributesResult),
    };
}
