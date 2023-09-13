import { __rest } from "tslib";
import { cloneWithSanitizedIds } from "../../IdSanitization.js";
import { fixInsightLegacyElementUris } from "../../fixLegacyElementUris.js";
export function convertVisualizationObject(visualizationObject, title, description, tags) {
    var _a, _b, _c;
    const { version: _ } = visualizationObject, data = __rest(visualizationObject, ["version"]);
    const convertedInsight = {
        insight: Object.assign(Object.assign({}, data), { title, summary: description, buckets: (_a = cloneWithSanitizedIds(visualizationObject.buckets)) !== null && _a !== void 0 ? _a : [], filters: (_b = cloneWithSanitizedIds(visualizationObject.filters)) !== null && _b !== void 0 ? _b : [], sorts: (_c = cloneWithSanitizedIds(visualizationObject.sorts)) !== null && _c !== void 0 ? _c : [], tags }),
    };
    return fixInsightLegacyElementUris(convertedInsight);
}
//# sourceMappingURL=VisualizationObjectConverter.js.map