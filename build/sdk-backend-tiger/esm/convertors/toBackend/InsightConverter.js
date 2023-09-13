import { cloneWithSanitizedIds } from "./IdSanitization.js";
import omit from "lodash/omit.js";
import flow from "lodash/flow.js";
function removeIdentifiers(insight) {
    const insightData = omit(insight.insight, ["ref", "uri", "identifier"]);
    return Object.assign(Object.assign({}, insight), { insight: insightData });
}
function removeVisualizationPropertiesSortItems(insight) {
    return Object.assign(Object.assign({}, insight), { insight: Object.assign(Object.assign({}, insight.insight), { properties: omit(insight.insight.properties, ["sortItems"]) }) });
}
export const convertInsight = (insight) => {
    const sanitizedInsight = flow(removeIdentifiers, removeVisualizationPropertiesSortItems)(insight);
    return {
        buckets: cloneWithSanitizedIds(sanitizedInsight.insight.buckets),
        filters: cloneWithSanitizedIds(sanitizedInsight.insight.filters),
        sorts: cloneWithSanitizedIds(sanitizedInsight.insight.sorts),
        properties: sanitizedInsight.insight.properties,
        visualizationUrl: sanitizedInsight.insight.visualizationUrl,
        version: "2",
    };
};
//# sourceMappingURL=InsightConverter.js.map