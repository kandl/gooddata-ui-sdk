// (C) 2022 GoodData Corporation
import { isAttributeDescriptor, isMeasureGroupDescriptor, isResultTotalHeader as isResultTotalHeaderModel, } from "@gooddata/sdk-model";
import { isResultAttributeHeader, isResultMeasureHeader, isResultTotalHeader, JsonApiAttributeOutAttributesGranularityEnum, } from "@gooddata/api-client-tiger";
import { createDateValueFormatter } from "../dateFormatting/dateValueFormatter.js";
import { toSdkGranularity } from "../dateGranularityConversions.js";
const supportedSuffixes = Object.keys(JsonApiAttributeOutAttributesGranularityEnum)
    .filter((item) => isNaN(Number(item)))
    .map((key) => JsonApiAttributeOutAttributesGranularityEnum[key]);
function getDateFormatProps(header) {
    if (!isAttributeDescriptor(header) ||
        !header.attributeHeader.granularity ||
        !supportedSuffixes.includes(header.attributeHeader.granularity) ||
        !header.attributeHeader.format) {
        return undefined;
    }
    const { attributeHeader: { granularity, format }, } = header;
    return {
        granularity: toSdkGranularity(granularity),
        format: {
            locale: format.locale,
            pattern: format.pattern,
        },
    };
}
function getMeasuresFromDimensions(dimensions) {
    for (const dim of dimensions) {
        const measureGroup = dim.headers.find(isMeasureGroupDescriptor);
        if (measureGroup) {
            return measureGroup.measureGroupHeader.items;
        }
    }
    return [];
}
/**
 * Transform measure headers to total headers, based on the information stored
 * in the indices map which is built on-the fly during the transformation.
 * Ignore attribute headers as they are not relevant for this mapping.
 * When transforming the measure header to a total header, linkage to a measure
 * is preserved with measure index.
 */
function getTransformedTotalHeader(header, headerIndex, grandColumnTotalsMap) {
    var _a;
    if (isResultMeasureHeader(header)) {
        if (grandColumnTotalsMap[headerIndex]) {
            const index = (_a = header === null || header === void 0 ? void 0 : header.measureHeader) === null || _a === void 0 ? void 0 : _a.measureIndex;
            return totalHeaderItem(grandColumnTotalsMap[headerIndex], index);
        }
        return totalHeaderItem(grandColumnTotalsMap[headerIndex]);
    }
    else if (isResultTotalHeader(header)) {
        grandColumnTotalsMap[headerIndex] = header;
        return totalHeaderItem(header);
    }
    return null;
}
/**
 * Transform base header for given index. When transforming measure headers, use
 * built map of indices to transform measure headers to total header items when
 * totals are present. The measure index is stored with total header item
 * for proper numeric formatting etc.
 *
 * On the leaf header item level, we get only measure items and we need to transform them
 * to the total header items. As we come along the totals first when traversing the above
 * levels first, we store indices of these totals  (such as [sum] is on index 2 in the example
 * below, note that for 0 and 1 there will be nothing)
 *
 * | East | East | [sum] | West | West | [sum] |
 * | m1   | m2   | m1    | m1   | m2   | m1    |
 *
 * Then, when processing (leaf) measure items on that index, we flip measure items for total items linked
 * to the particular total
 *
 * | East | East | [sum]      | West | West | [sum]      |
 * | m1   | m2   | [sum - m1] | m1   | m2   | [sum - m1] |
 *
 */
function getTransformedBaseHeader(header, headerGroupIndex, measureDescriptors, dateFormatProps, dateValueFormatter, baseHeadersTotalsMap) {
    var _a;
    if (isResultAttributeHeader(header)) {
        return attributeMeasureItem(header, dateFormatProps, dateValueFormatter);
    }
    if (isResultMeasureHeader(header)) {
        if (baseHeadersTotalsMap[headerGroupIndex]) {
            const index = (_a = header === null || header === void 0 ? void 0 : header.measureHeader) === null || _a === void 0 ? void 0 : _a.measureIndex;
            return totalHeaderItem(baseHeadersTotalsMap[headerGroupIndex], index);
        }
        return measureHeaderItem(header, measureDescriptors);
    }
    if (isResultTotalHeader(header)) {
        baseHeadersTotalsMap[headerGroupIndex] = header;
        return totalHeaderItem(header);
    }
    // This code should never be reachable
    throw new Error(`Unexpected type of ResultHeader: ${header}`);
}
export function getTransformDimensionHeaders(dimensions, dateFormatter, grandTotals = []) {
    const measureDescriptors = getMeasuresFromDimensions(dimensions);
    const dateValueFormatter = createDateValueFormatter(dateFormatter);
    const columnGrandTotals = grandTotals.find((total) => total.totalDimensions.includes("dim_0"));
    return (dimensionHeaders) => dimensionHeaders.map((dimensionHeader, dimensionIndex) => {
        // we need to declare these maps beforehand as they are utilized when processing all header groups
        const baseHeadersTotalsMap = {};
        const grandColumnTotalsMap = {};
        return dimensionHeader.headerGroups.map((headerGroup, headerGroupIndex) => {
            let appendedHeaders = [];
            if (dimensionIndex === 1 && columnGrandTotals) {
                // Append appropriate column grand total headers to each row. The result is always of type total header.
                const columnGrandTotalHeaderGroups = columnGrandTotals.dimensionHeaders[0].headerGroups;
                appendedHeaders = columnGrandTotalHeaderGroups[headerGroupIndex].headers
                    .map((h, headerIndex) => getTransformedTotalHeader(h, headerIndex, grandColumnTotalsMap))
                    .filter(isResultTotalHeaderModel);
            }
            const dateFormatProps = getDateFormatProps(dimensions[dimensionIndex].headers[headerGroupIndex]);
            const baseHeaders = headerGroup.headers.map((header, index) => {
                return getTransformedBaseHeader(header, index, measureDescriptors, dateFormatProps, dateValueFormatter, baseHeadersTotalsMap);
            });
            return [...baseHeaders, ...appendedHeaders];
        });
    });
}
function attributeMeasureItem(header, dateFormatProps, dateValueFormatter) {
    const formattedNameObj = dateFormatProps
        ? {
            formattedName: dateValueFormatter(header.attributeHeader.labelValue, dateFormatProps.granularity, dateFormatProps.format.locale, dateFormatProps.format.pattern),
        }
        : {};
    return {
        attributeHeaderItem: Object.assign({ uri: header.attributeHeader.primaryLabelValue, name: header.attributeHeader.labelValue }, formattedNameObj),
    };
}
function measureHeaderItem(header, measureDescriptors) {
    var _a;
    /*
     * Funny stuff #1 - Tiger sends just the measure index in the measure headers. This is the index of the
     * measure descriptor within the measure group. The code looks up the measure descriptor so that
     * it can then fill in the `name` to the one in the descriptor
     */
    const measureIndex = header.measureHeader.measureIndex;
    return {
        measureHeaderItem: {
            name: (_a = measureDescriptors[measureIndex]) === null || _a === void 0 ? void 0 : _a.measureHeaderItem.name,
            order: measureIndex,
        },
    };
}
function totalHeaderItem(header, measureIndex) {
    const optionalMeasureIndex = measureIndex !== undefined ? { measureIndex } : {};
    return {
        totalHeaderItem: Object.assign({ type: header.totalHeader.function, name: header.totalHeader.function.toLowerCase() }, optionalMeasureIndex),
    };
}
//# sourceMappingURL=DimensionHeaderConverter.js.map