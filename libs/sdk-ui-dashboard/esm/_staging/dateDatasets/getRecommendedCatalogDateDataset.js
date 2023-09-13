import { getRecommendedDateDataset } from "@gooddata/sdk-ui-kit";
export function getRecommendedCatalogDateDataset(dateDatasets) {
    var _a;
    const recommendedDateDataSetId = (_a = getRecommendedDateDataset(dateDatasets.map((ds) => {
        return {
            id: ds.dataSet.id,
            title: ds.dataSet.title,
            relevance: ds.relevance,
        };
    }))) === null || _a === void 0 ? void 0 : _a.id;
    return recommendedDateDataSetId
        ? dateDatasets.find((ds) => ds.dataSet.id === recommendedDateDataSetId)
        : undefined;
}
//# sourceMappingURL=getRecommendedCatalogDateDataset.js.map