// (C) 2022 GoodData Corporation
import { isMeasureGroupIdentifier, isResultTotalHeader, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import flatMap from "lodash/flatMap.js";
import { dimensionLocalIdentifier } from "../../toBackend/afm/DimensionsConverter.js";
/**
 * Transform the grand total structure from Tiger API into a form acceptable by the SDK.
 * @param grandTotals - Grand total structure from Tiger API
 * @param definition - Original Execution definition from the SDK
 * @param dataHeaderItems - Headers for the main result structure from the Tiger API
 * @param transformDimensionHeaders - A function to transform grand total dimension headers into SDK compatible headers
 */
export function transformGrandTotalData(grandTotals, definition, dataHeaderItems, transformDimensionHeaders) {
    if (definition.dimensions.every((dim) => isEmpty(dim.totals))) {
        // SDK cannot work with explicit empty totals, undefined must be returned instead
        return undefined;
    }
    const measureGroupDimension = definition.dimensions.findIndex((dim) => { var _a; return (_a = dim === null || dim === void 0 ? void 0 : dim.itemIdentifiers) === null || _a === void 0 ? void 0 : _a.find(isMeasureGroupIdentifier); });
    const grandTotalsData = definition.dimensions.map((_) => []);
    const dimensionIdxByLocalId = new Map(definition.dimensions.map((_, idx) => [dimensionLocalIdentifier(idx), idx]));
    for (const grandTotal of grandTotals) {
        const totalDimensions = grandTotal.totalDimensions
            .map((dim) => dimensionIdxByLocalId.get(dim))
            .filter((dimIdx) => dimIdx !== undefined);
        const combinedHeaders = combineHeaders(transformDimensionHeaders(grandTotal.dimensionHeaders), dataHeaderItems, totalDimensions);
        const transformedTotals = transformGrandTotal(grandTotal, combinedHeaders, totalDimensions, definition);
        transformedTotals.forEach((total, totalIdx) => {
            if (total.dimensionIdx === 1 || measureGroupDimension === 0) {
                grandTotalsData[total.dimensionIdx] = grandTotal.data;
            }
            else {
                grandTotalsData[total.dimensionIdx][totalIdx] = total.data;
            }
        });
    }
    return grandTotalsData;
}
/**
 * Fill in missing dimensions in grandTotalHeaderItems from dataHeaderItems.
 * Total dimensions in this case signify which dimensions we need to fill in.
 */
function combineHeaders(grandTotalHeaderItems, dataHeaderItems, totalDimensions) {
    const combinedHeaderItems = [];
    let grandTotalIdx = 0;
    dataHeaderItems.forEach((dimensionHeader, dimIdx) => {
        if (totalDimensions.includes(dimIdx)) {
            combinedHeaderItems.push(dimensionHeader);
        }
        else {
            combinedHeaderItems.push(grandTotalHeaderItems[grandTotalIdx]);
            grandTotalIdx += 1;
        }
    });
    return combinedHeaderItems;
}
/**
 * SDK expects grand total data in an array with the lengths [dimensions][total types][values].
 * Tiger API returns an array of "Grand Totals", where each grand total has data in a multidimensional array
 * with the dimensions the same as the main result.
 * SDK supports only one-dimensional totals, so we will skip multidimensional totals to simplify the implementation.
 * This function takes the data from a grand total and by looking at the headers at each data value it assigns this
 * value to its place in the SDK format.
 */
function transformGrandTotal(grandTotal, headerItems, totalDimensions, definition) {
    var _a;
    if (totalDimensions.length !== 1) {
        // If the grand total belongs to multiple or zero dimensions it is either
        // a grand total from a >2D result or it is a total of totals,
        // neither of which can currently be handled
        return [];
    }
    // Tiger API returns dimensions whose headers are used in the total, while SDK wants the dimension which
    // is "totalled" - headers not used. Here we assume that there are only two dimensions in the definition, as we
    // need to find on which dimension the totals in this grand total result were defined.
    // If there were more than two dimensions, then a total definition on a single dimension would result
    // in >1 dimensions in `totalDimensions`, which we checked is not the case already.
    // TODO revisit when multidimensional totals are supported
    const dimensionIdx = definition.dimensions.findIndex((_, idx) => idx !== totalDimensions[0]);
    const totalDefinitions = (_a = definition.dimensions[dimensionIdx]) === null || _a === void 0 ? void 0 : _a.totals;
    if (totalDefinitions === undefined) {
        return [];
    }
    const transformedTotals = {};
    const resultData = grandTotal.data;
    /**
     * Iteratively walk through the data, get headers at each point and use them to assign data values to a total.
     */
    const walk = (data, coordinates = []) => {
        data.forEach((dataValue, idx) => {
            var _a, _b;
            const position = [...coordinates, idx];
            if (Array.isArray(dataValue)) {
                walk(dataValue, position);
            }
            else {
                // Get headers at the current position, but skip total dimensions as they may have subtotals
                const headers = getHeadersAtPosition(headerItems, position, totalDimensions);
                const totalType = (_a = headers.find(isResultTotalHeader)) === null || _a === void 0 ? void 0 : _a.totalHeaderItem.type.toLowerCase();
                if (totalType === undefined) {
                    // Cannot assign to a total without a total header
                    return;
                }
                const total = (transformedTotals[totalType] = (_b = transformedTotals[totalType]) !== null && _b !== void 0 ? _b : []);
                total.push(dataValue);
            }
        });
    };
    walk(resultData);
    const sortedTotals = Object.keys(transformedTotals)
        .map((totalType) => {
        const data = transformedTotals[totalType];
        return {
            data,
            defIdx: totalDefinitions.findIndex((def) => def.type === totalType),
        };
    })
        .filter((total) => total.defIdx !== -1)
        .sort((totalA, totalB) => totalA.defIdx - totalB.defIdx);
    return sortedTotals.map((total) => {
        return {
            dimensionIdx,
            data: total.data,
        };
    });
}
function getHeadersAtPosition(headerItems, position, skipDimensions = []) {
    return flatMap(position, (coord, dimIdx) => {
        if (skipDimensions.includes(dimIdx)) {
            return [];
        }
        // header groups in dimension `dimIdx`
        const headerGroups = headerItems[dimIdx];
        // get header at coordinate `coord` from each group
        return headerGroups.map((group) => group[coord]);
    });
}
//# sourceMappingURL=GrandTotalsConverter.js.map