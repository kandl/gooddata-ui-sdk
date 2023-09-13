// (C) 2022 GoodData Corporation
import cx from "classnames";
import React, { useEffect } from "react";
import { useDashboardDispatch } from "../../../model/index.js";
import { isBaseDraggableMovingItem, isInsightDraggableItem, isInsightDraggableListItem, isInsightPlaceholderDraggableItem, isKpiDraggableItem, isKpiPlaceholderDraggableItem, } from "../types.js";
import { getDropZoneDebugStyle } from "../debug.js";
import { useDashboardDrop } from "../useDashboardDrop.js";
import { SectionDropZoneBox } from "./SectionDropZoneBox.js";
import { useMoveWidgetToNewSectionDropHandler } from "./useMoveWidgetToNewSectionDropHandler.js";
import { useNewSectionInsightListItemDropHandler } from "./useNewSectionInsightListItemDropHandler.js";
import { useNewSectionInsightPlaceholderDropHandler } from "./useNewSectionInsightPlaceholderDropHandler.js";
import { useNewSectionKpiPlaceholderDropHandler } from "./useNewSectionKpiPlaceholderDropHandler.js";
import { useWidgetDragHoverHandlers } from "./useWidgetDragHoverHandlers.js";
export const SectionHotspot = (props) => {
    const { index, targetPosition } = props;
    const dispatch = useDashboardDispatch();
    const handleInsightListItemDrop = useNewSectionInsightListItemDropHandler(index);
    const handleKpiPlaceholderDrop = useNewSectionKpiPlaceholderDropHandler(index);
    const handleInsightPlaceholderDrop = useNewSectionInsightPlaceholderDropHandler(index);
    const moveWidgetToNewSection = useMoveWidgetToNewSectionDropHandler(index);
    const { handleDragHoverEnd } = useWidgetDragHoverHandlers();
    const [{ canDrop, isOver }, dropRef] = useDashboardDrop(["insightListItem", "kpi-placeholder", "insight-placeholder", "kpi", "insight"], {
        drop: (item) => {
            if (isInsightDraggableListItem(item)) {
                handleInsightListItemDrop(item.insight);
            }
            if (isInsightDraggableItem(item)) {
                moveWidgetToNewSection(item);
            }
            if (isInsightPlaceholderDraggableItem(item)) {
                handleInsightPlaceholderDrop();
            }
            if (isKpiDraggableItem(item)) {
                moveWidgetToNewSection(item);
            }
            if (isKpiPlaceholderDraggableItem(item)) {
                handleKpiPlaceholderDrop();
            }
        },
        canDrop: (item) => {
            if (isBaseDraggableMovingItem(item)) {
                const isAdjacentSection = index === item.sectionIndex || index === item.sectionIndex + 1;
                return !(item.isOnlyItemInSection && isAdjacentSection);
            }
            return true;
        },
    }, [dispatch, index, handleInsightListItemDrop, handleKpiPlaceholderDrop, handleInsightPlaceholderDrop]);
    useEffect(() => {
        if (isOver) {
            handleDragHoverEnd();
        }
    }, [handleDragHoverEnd, isOver]);
    if (!canDrop) {
        return null;
    }
    const isLast = targetPosition === "below";
    const debugStyle = getDropZoneDebugStyle({ isOver });
    return (React.createElement("div", { className: cx("row-hotspot-container", {
            last: isLast && canDrop,
            "s-last-drop-position": isLast && canDrop,
            hidden: !canDrop,
        }) },
        React.createElement("div", { className: cx("row-hotspot", { hidden: !canDrop }), style: Object.assign({}, debugStyle), ref: dropRef }, !!isOver && React.createElement(SectionDropZoneBox, { isOver: isOver }))));
};
//# sourceMappingURL=SectionHotspot.js.map