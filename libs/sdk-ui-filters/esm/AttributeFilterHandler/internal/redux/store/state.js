/**
 * @internal
 */
export const initialState = {
    initialization: {
        status: "pending",
    },
    attribute: {
        status: "pending",
    },
    elements: {
        cache: {},
        currentOptions: {
            offset: 0,
            limit: 500,
            search: "",
            limitingAttributeFilters: [],
            limitingDateFilters: [],
            limitingMeasures: [],
        },
        initialPageLoad: {
            status: "pending",
        },
        nextPageLoad: {
            status: "pending",
        },
        limitingAttributeFiltersAttributes: [],
        lastLoadedOptions: {},
        totalCountInitialization: {
            status: "pending",
        },
    },
    config: {},
    selection: {
        commited: {},
        working: {},
    },
};
//# sourceMappingURL=state.js.map