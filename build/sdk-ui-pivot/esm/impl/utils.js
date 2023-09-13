// (C) 2007-2022 GoodData Corporation
import once from "lodash/once.js";
import { bucketsFind, bucketTotals, sanitizeBucketTotals, } from "@gooddata/sdk-model";
import { BucketNames } from "@gooddata/sdk-ui";
import { isAttributeColumnWidthItem, isMeasureColumnWidthItem, isMixedValuesColumnWidthItem, isSliceMeasureColumnWidthItem, } from "../columnWidths.js";
function getScrollbarWidthBody() {
    var _a;
    const outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    document.body.appendChild(outer);
    const widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";
    // add inner div
    const inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);
    const widthWithScroll = inner.offsetWidth;
    // remove divs
    (_a = outer.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(outer);
    return widthNoScroll - widthWithScroll;
}
/**
 * Returns the current actual scrollbar width.
 * For performance reasons this is memoized as the value is highly unlikely to change
 */
export const getScrollbarWidth = once(getScrollbarWidthBody);
export async function sleep(delay) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
/**
 * Get only valid totals from an execution definition given a list of sort items
 * Use provided totals, if not given, use totals from ATTRIBUTE bucket
 *
 * @param definition - an execution definition to sanitize
 * @param sortItems - a specification of the sort, if not provided definition.sortBy will be used
 * @param totals - totals to be sanitized, if not provided ATTRIBUTE bucket totals will be used
 */
export function sanitizeDefTotals(definition, sortItems, totals) {
    const { buckets, sortBy } = definition;
    const attributeBucket = bucketsFind(buckets, BucketNames.ATTRIBUTE);
    return attributeBucket
        ? sanitizeBucketTotals(attributeBucket, sortItems !== null && sortItems !== void 0 ? sortItems : sortBy, totals !== null && totals !== void 0 ? totals : bucketTotals(attributeBucket))
        : [];
}
/**
 * Get totals from an execution definition for COLUMNS bucket
 *
 * @param definition - an execution definition from which totals should be extracted
 */
export function getTotalsForColumnsBucket(definition) {
    const { buckets } = definition;
    const attributeBucket = bucketsFind(buckets, BucketNames.COLUMNS);
    return attributeBucket ? bucketTotals(attributeBucket) : [];
}
export const tableHasRowAttributes = (rowAttributes) => rowAttributes.length > 0;
export const tableHasColumnAttributes = (columnAttributes) => columnAttributes.length > 0;
export const isStrongColumnWidthItem = (item) => {
    const isAttributeOrMeasureColumnWidthItem = isAttributeColumnWidthItem(item) || isMeasureColumnWidthItem(item);
    const isTransposedMeasureColumnWidthItem = isSliceMeasureColumnWidthItem(item) || isMixedValuesColumnWidthItem(item);
    return isAttributeOrMeasureColumnWidthItem || isTransposedMeasureColumnWidthItem;
};
export const getDataViewSeriesDescriptors = (dv) => dv
    .data()
    .series()
    .toArray()
    .map((series) => series.descriptor)
    .filter((descriptor, index, self) => self.findIndex((s) => s.measureDescriptor === descriptor.measureDescriptor) === index);
//# sourceMappingURL=utils.js.map