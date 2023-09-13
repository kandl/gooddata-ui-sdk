// (C) 2022 GoodData Corporation
import { useMemo } from "react";
import { selectDraggingWidgetSource, useDashboardSelector } from "../../../model/index.js";
export function useIsDraggingCurrentItem(sectionIndex, itemIndex) {
    const dragItem = useDashboardSelector(selectDraggingWidgetSource);
    return useMemo(() => {
        if (!dragItem) {
            return false;
        }
        return dragItem.sectionIndex === sectionIndex && dragItem.itemIndex === itemIndex;
    }, [dragItem, sectionIndex, itemIndex]);
}
//# sourceMappingURL=useIsDraggingCurrentItem.js.map