// (C) 2021-2022 GoodData Corporation
const setCatalogItems = (state, action) => {
    const { attributes, measures, dateDatasets, facts, attributeHierarchies } = action.payload;
    state.attributes = attributes;
    state.measures = measures;
    state.facts = facts;
    state.dateDatasets = dateDatasets;
    state.attributeHierarchies = attributeHierarchies;
};
export const catalogReducers = {
    setCatalogItems,
};
//# sourceMappingURL=catalogReducers.js.map