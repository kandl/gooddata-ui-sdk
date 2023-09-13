// (C) 2019-2022 GoodData Corporation
import { newMeasureSort, localIdRef, } from "@gooddata/sdk-model";
function newMeasureSortSuggestion(identifier, attributeLocators = []) {
    const { measureSortItem: { locators }, } = newMeasureSort(identifier, "asc", attributeLocators);
    return {
        type: "measureSort",
        locators,
    };
}
/**
 * @internal
 */
export const newAvailableSortsGroup = (attributeId, measureIds = [], normalSortEnabled = true, areaSortEnabled = true, explanation) => {
    const metricSortsProp = measureIds.length
        ? {
            metricSorts: [
                ...measureIds.map((localIdentifier) => newMeasureSortSuggestion(localIdentifier)),
            ],
        }
        : {};
    const explanationProp = explanation
        ? {
            explanation,
        }
        : {};
    return Object.assign(Object.assign({ itemId: localIdRef(attributeId), attributeSort: {
            normalSortEnabled,
            areaSortEnabled,
        } }, metricSortsProp), explanationProp);
};
//# sourceMappingURL=SortConfig.js.map