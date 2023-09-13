// (C) 2007-2021 GoodData Corporation
import groupBy from "lodash/groupBy.js";
import takeWhile from "lodash/takeWhile.js";
import first from "lodash/first.js";
/**
 * @internal
 */
export const isDateDatasetHeader = (obj) => {
    return obj && obj.type === "header";
};
function hasSameRelevance(dateDatasets) {
    const relevanceCount = Object.keys(groupBy(dateDatasets, "relevance")).length;
    return relevanceCount === 1;
}
const relevanceComparator = (a, b) => b.relevance - a.relevance; // descending sort
const titleComparator = (a, b) => {
    return a.title.localeCompare(b.title);
};
function sortByTitle(dateDatasets) {
    return dateDatasets.slice().sort(titleComparator);
}
function sortByRelevanceAndTitle(dateDatasets) {
    return dateDatasets.slice().sort((a, b) => {
        if (a.relevance === b.relevance) {
            return titleComparator(a, b);
        }
        return relevanceComparator(a, b);
    });
}
const MAX_RECOMMENDED_ITEMS = 3;
/**
 * @internal
 */
export const recommendedHeader = {
    title: "gs.date.date-dataset.recommended",
    type: "header",
};
/**
 * @internal
 */
export const otherHeader = {
    title: "gs.date.date-dataset.other",
    type: "header",
};
/**
 * @internal
 */
export const relatedHeader = {
    title: "gs.date.date-dataset.related",
    type: "header",
};
/**
 * @internal
 */
export const unrelatedHeader = {
    title: "gs.date.date-dataset.unrelated",
    type: "header",
};
function addUnrelatedDateDataset(dateDatasets, unrelatedDateDataset) {
    if (hasSameRelevance(dateDatasets)) {
        return [unrelatedHeader, unrelatedDateDataset, relatedHeader, ...dateDatasets];
    }
    return [unrelatedHeader, unrelatedDateDataset, ...dateDatasets];
}
/**
 * @internal
 */
export function getRecommendedDateDataset(items) {
    if (hasSameRelevance(items)) {
        return null;
    }
    return first(sortByRelevanceAndTitle(items));
}
/**
 * @internal
 */
export function transform2Dropdown(dateDatasets) {
    if (!dateDatasets.length) {
        return [];
    }
    const items = sortByRelevanceAndTitle(dateDatasets);
    if (!hasSameRelevance(items)) {
        const nonZeroRelevanceItemsCount = takeWhile(items, (i) => i.relevance > 0).length;
        const othersIndex = Math.min(MAX_RECOMMENDED_ITEMS, nonZeroRelevanceItemsCount);
        const recommendedItems = [recommendedHeader, ...items.slice(0, othersIndex)];
        if (othersIndex < items.length) {
            return [...recommendedItems, otherHeader, ...sortByTitle(items.slice(othersIndex))];
        }
        return recommendedItems;
    }
    return sortByTitle(items);
}
function getRecommendedItems(recommendedDate, others) {
    return [recommendedHeader, recommendedDate, otherHeader, ...sortByTitle(others)];
}
/**
 * @internal
 */
export function preselectDateDataset(dateDatasets, recommendedDate) {
    const others = dateDatasets.filter((d) => d.id !== recommendedDate.id);
    if (others.length > 0) {
        return getRecommendedItems(recommendedDate, others);
    }
    return [recommendedDate];
}
/**
 * @internal
 */
export function sortDateDatasets(dateDatasets, recommendedDate = null, unrelatedDate = null) {
    let items = recommendedDate
        ? preselectDateDataset(dateDatasets, recommendedDate)
        : transform2Dropdown(dateDatasets);
    if (unrelatedDate) {
        items = addUnrelatedDateDataset(items, unrelatedDate);
    }
    return items;
}
//# sourceMappingURL=dateDatasets.js.map