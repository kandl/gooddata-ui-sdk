import { valueWithEmptyHandling } from "@gooddata/sdk-ui-vis-commons";
import { getMappingHeaderFormattedName } from "@gooddata/sdk-ui";
/**
 * Transform
 *      viewByParentAttribute: [P1, P1, P2, P2, P3],
 *      viewByAttribute: [C1, C2, C1, C2, C2]
 * to
 * ```
 *     [{
 *         name: P1,
 *         categories: [C1, C2]
 *      }, {
 *         name: P2,
 *         categories: [C1, C2]
 *      }, {
 *         name: P3,
 *         categories: [C2]
 *      }]
 * ```
 */
export function getCategoriesForTwoAttributes(viewByAttribute, viewByParentAttribute, emptyHeaderTitle) {
    const keys = [];
    const { items: children } = viewByAttribute;
    const { items: parent } = viewByParentAttribute;
    const combinedResult = parent.reduce((result, parentAttr, index) => {
        var _a, _b, _c;
        const uri = (_b = (_a = parentAttr === null || parentAttr === void 0 ? void 0 : parentAttr.attributeHeaderItem) === null || _a === void 0 ? void 0 : _a.uri) !== null && _b !== void 0 ? _b : "";
        const name = valueWithEmptyHandling(getMappingHeaderFormattedName(parentAttr), emptyHeaderTitle);
        const value = valueWithEmptyHandling(getMappingHeaderFormattedName(children[index]), emptyHeaderTitle);
        const existingEntry = result[uri];
        const childCategories = (_c = existingEntry === null || existingEntry === void 0 ? void 0 : existingEntry.categories) !== null && _c !== void 0 ? _c : [];
        if (!childCategories.length) {
            keys.push(uri);
        }
        result[uri] = {
            name,
            categories: [...childCategories, value], // append value
        };
        return result;
    }, {});
    return keys.map((key) => {
        const { name, categories } = combinedResult[key];
        return {
            name,
            categories,
        };
    });
}
//# sourceMappingURL=extendedStackingChartOptions.js.map