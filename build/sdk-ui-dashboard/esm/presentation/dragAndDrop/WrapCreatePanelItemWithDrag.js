// (C) 2022 GoodData Corporation
import React from "react";
import cx from "classnames";
import { useDashboardDrag } from "./useDashboardDrag.js";
import { useWidgetDragEndHandler } from "./draggableWidget/index.js";
import { selectIsInEditMode, useDashboardSelector } from "../../model/index.js";
/**
 * @internal
 */
export const WrapCreatePanelItemWithDrag = (props) => {
    const { canDrag, dragItem, hideDefaultPreview, onDragEnd, onDragStart, children } = useWrapCreatePanelItemWithDrag(props);
    const [{ isDragging }, dragRef] = useDashboardDrag({
        dragItem,
        canDrag,
        hideDefaultPreview,
        dragEnd: (_, monitor) => {
            onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(monitor.didDrop());
        },
        dragStart: onDragStart,
    }, [canDrag, onDragEnd, hideDefaultPreview, dragItem]);
    return (React.createElement("div", { ref: dragRef, className: cx({ "is-dragging": isDragging }) }, children));
};
/**
 * @internal
 */
export function useWrapCreatePanelItemWithDrag(props) {
    const isInEditMode = useDashboardSelector(selectIsInEditMode);
    const onDragEnd = useWidgetDragEndHandler();
    const canDrag = isInEditMode && !props.disabled;
    return Object.assign(Object.assign({}, props), { canDrag,
        onDragEnd });
}
//# sourceMappingURL=WrapCreatePanelItemWithDrag.js.map