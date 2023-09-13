const relevanceComparator = (a, b) => b.relevance - a.relevance; // descending sort
const titleComparatorFactory = (mapping) => {
    return (a, b) => {
        return mapping[a.dataSet.title].localeCompare(mapping[b.dataSet.title]);
    };
};
export function sortByRelevanceAndTitle(dateDatasets, titleMapping) {
    const titleComparator = titleComparatorFactory(titleMapping);
    return dateDatasets.slice().sort((a, b) => {
        if (a.relevance === b.relevance) {
            return titleComparator(a, b);
        }
        return relevanceComparator(a, b);
    });
}
export function sanitizeDateDatasetTitle(dataset) {
    return dataset.dataSet.title.trim().replace(/^Date \((.*)\)$/, "$1");
}
//# sourceMappingURL=dateDatasetOrdering.js.map