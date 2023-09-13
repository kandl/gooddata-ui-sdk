// (C) 2022-2023 GoodData Corporation
import { useDrag } from "react-dnd";
import { useCallback, useEffect, useRef } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import isFunction from "lodash/isFunction.js";
import { useBeforeDrag } from "./useBeforeDrag.js";
function basicDragCollect(monitor) {
    return {
        isDragging: monitor.isDragging(),
        item: monitor.getItem(),
    };
}
export function useDashboardDrag({ dragItem, canDrag = true, hideDefaultPreview = true, dragEnd, dragStart, }, deps = []) {
    const [collectedProps, dragRef, dragPreviewRef] = useDrag(() => {
        const item = isFunction(dragItem) ? dragItem() : dragItem;
        return {
            type: item.type,
            item: dragItem,
            collect: basicDragCollect,
            canDrag,
            end: dragEnd,
        };
    }, deps);
    const beforeDrag = useBeforeDrag();
    const onInternalDragStart = useCallback((item) => {
        beforeDrag();
        if (dragStart) {
            dragStart(item);
        }
    }, [dragStart, beforeDrag]);
    const hasHandledStart = useRef(false);
    useEffect(() => {
        if (collectedProps.isDragging) {
            if (!hasHandledStart.current) {
                const item = isFunction(dragItem) ? dragItem() : dragItem;
                hasHandledStart.current = true;
                onInternalDragStart(item);
            }
        }
        else {
            hasHandledStart.current = false;
        }
    }, [collectedProps.isDragging, onInternalDragStart, dragItem]);
    useEffect(() => {
        if (hideDefaultPreview) {
            // this is the way how to hide native drag preview, custom preview is rendered by DragLayer
            dragPreviewRef(getEmptyImage(), { captureDraggingState: false });
        }
    }, [dragPreviewRef, hideDefaultPreview]);
    return [collectedProps, dragRef];
}
//# sourceMappingURL=useDashboardDrag.js.map