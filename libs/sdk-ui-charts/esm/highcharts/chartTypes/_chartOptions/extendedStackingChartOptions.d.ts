import { IUnwrappedAttributeHeadersWithItems } from "../../typings/mess.js";
type NameAndCategories = {
    name: string;
    categories: string[];
};
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
export declare function getCategoriesForTwoAttributes(viewByAttribute: IUnwrappedAttributeHeadersWithItems, viewByParentAttribute: IUnwrappedAttributeHeadersWithItems, emptyHeaderTitle: string): NameAndCategories[];
export {};
//# sourceMappingURL=extendedStackingChartOptions.d.ts.map