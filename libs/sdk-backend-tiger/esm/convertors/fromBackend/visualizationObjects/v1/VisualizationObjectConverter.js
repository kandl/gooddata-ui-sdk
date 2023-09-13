import { cloneWithSanitizedIds } from "../../IdSanitization.js";
import { fixInsightLegacyElementUris } from "../../fixLegacyElementUris.js";
export function convertVisualizationObject(visualizationObject) {
    var _a, _b, _c;
    const convertedInsight = {
        insight: Object.assign(Object.assign({}, visualizationObject.visualizationObject), { buckets: (_a = cloneWithSanitizedIds(visualizationObject.visualizationObject.buckets)) !== null && _a !== void 0 ? _a : [], filters: (_b = cloneWithSanitizedIds(visualizationObject.visualizationObject.filters)) !== null && _b !== void 0 ? _b : [], sorts: (_c = cloneWithSanitizedIds(visualizationObject.visualizationObject.sorts)) !== null && _c !== void 0 ? _c : [] }),
    };
    return fixInsightLegacyElementUris(convertedInsight);
}
//# sourceMappingURL=VisualizationObjectConverter.js.map