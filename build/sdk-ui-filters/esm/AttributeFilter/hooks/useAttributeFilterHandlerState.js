/**
 * @internal
 */
export const useAttributeFilterHandlerState = (handler) => {
    const workingSelection = handler.getWorkingSelection();
    const committedSelection = handler.getCommittedSelection();
    const initStatus = handler.getInitStatus();
    return {
        attributeFilter: handler.getFilter(),
        initialization: {
            status: handler.getInitStatus(),
            error: handler.getInitError(),
        },
        attribute: {
            data: handler.getAttribute(),
            status: handler.getAttributeStatus(),
            error: handler.getAttributeError(),
        },
        elements: {
            data: handler.getAllElements(),
            totalCount: handler.getTotalElementsCount(),
            totalCountWithCurrentSettings: handler.getTotalElementsCountWithCurrentSettings(),
            initialPageLoad: {
                status: handler.getInitialElementsPageStatus(),
                error: handler.getInitialElementsPageError(),
            },
            nextPageLoad: {
                status: handler.getNextElementsPageStatus(),
                error: handler.getNextElementsPageError(),
            },
            options: {
                search: handler.getSearch(),
                offset: handler.getOffset(),
                limit: handler.getLimit(),
                limitingAttributeFilters: handler.getLimitingAttributeFilters(),
                limitingDateFilters: handler.getLimitingDateFilters(),
                limitingMeasures: handler.getLimitingMeasures(),
                order: handler.getOrder(),
            },
        },
        selection: {
            committed: {
                elements: initStatus === "success" ? handler.getElementsByKey(committedSelection.keys) : [],
                keys: committedSelection.keys,
                isInverted: committedSelection.isInverted,
            },
            working: {
                elements: initStatus === "success" ? handler.getElementsByKey(workingSelection.keys) : [],
                keys: workingSelection.keys,
                isInverted: workingSelection.isInverted,
                isChanged: handler.isWorkingSelectionChanged(),
                isEmpty: handler.isWorkingSelectionEmpty(),
            },
        },
    };
};
//# sourceMappingURL=useAttributeFilterHandlerState.js.map