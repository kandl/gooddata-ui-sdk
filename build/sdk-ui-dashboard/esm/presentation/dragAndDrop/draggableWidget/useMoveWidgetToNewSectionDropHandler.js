// (C) 2022 GoodData Corporation
import { useCallback } from "react";
import { useDashboardDispatch, moveSectionItemToNewSectionAndRemoveOriginalSectionIfEmpty, } from "../../../model/index.js";
export function useMoveWidgetToNewSectionDropHandler(newSectionIndex) {
    const dispatch = useDashboardDispatch();
    return useCallback((item) => dispatch(moveSectionItemToNewSectionAndRemoveOriginalSectionIfEmpty(item.sectionIndex, item.itemIndex, newSectionIndex)), [dispatch, newSectionIndex]);
}
//# sourceMappingURL=useMoveWidgetToNewSectionDropHandler.js.map