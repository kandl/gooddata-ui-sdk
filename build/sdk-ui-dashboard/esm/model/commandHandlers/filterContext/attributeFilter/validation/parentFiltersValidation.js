// (C) 2021-2022 GoodData Corporation
import differenceBy from "lodash/differenceBy.js";
import zip from "lodash/zip.js";
import { areObjRefsEqual, objRefToString, } from "@gooddata/sdk-model";
export async function validateAttributeFilterParents(ctx, dashboardFilter, parents, allFilters, displayFormsMap) {
    const allExceptValidated = allFilters.filter((item) => !areObjRefsEqual(item.attributeFilter.displayForm, dashboardFilter.attributeFilter.displayForm));
    // first, validate that the parents only use the filters that are available
    const allExceptValidatedLocalIds = allExceptValidated.map((item) => item.attributeFilter.localIdentifier);
    const hasExtraneousParent = parents.some((parent) => !allExceptValidatedLocalIds.includes(parent.filterLocalIdentifier));
    if (hasExtraneousParent) {
        return "EXTRANEOUS_PARENT";
    }
    // then validate that the connecting attributes are valid
    const parentValidationData = parents.map((parent) => {
        var _a, _b;
        const parentFilter = allExceptValidated.find((item) => item.attributeFilter.localIdentifier === parent.filterLocalIdentifier); // the ! is cool here, we validated that the parents are available in the code above
        const parentAttribute = (_a = displayFormsMap.get(parentFilter.attributeFilter.displayForm)) === null || _a === void 0 ? void 0 : _a.attribute;
        const dashboardFilterAttribute = (_b = displayFormsMap.get(dashboardFilter.attributeFilter.displayForm)) === null || _b === void 0 ? void 0 : _b.attribute;
        if (!parentAttribute || !dashboardFilterAttribute) {
            return undefined;
        }
        return {
            parentOverAttributes: parent.over.attributes,
            displayFormsToGetAncestorsFor: [dashboardFilterAttribute, parentAttribute],
        };
    });
    if (parentValidationData.some((parent) => parent === undefined)) {
        return "INVALID_METADATA";
    }
    const commonAttributeResults = await ctx.backend
        .workspace(ctx.workspace)
        .attributes()
        // the ! is fine here, we validated parentValidationData for empty items above
        .getCommonAttributesBatch(parentValidationData.map((item) => item.displayFormsToGetAncestorsFor));
    const validationPairs = zip(parentValidationData.map((item) => item.parentOverAttributes), commonAttributeResults); // we know the lengths match so we cast to get rid on the undefined in teh default typing
    // connection is valid if all the over attributes are part of the connecting attributes set
    const areAllConnectionsValid = validationPairs.every(([parentOverAttributes, connectingAttrs]) => differenceBy(parentOverAttributes, connectingAttrs, objRefToString).length === 0);
    return areAllConnectionsValid ? "VALID" : "INVALID_CONNECTION";
}
//# sourceMappingURL=parentFiltersValidation.js.map