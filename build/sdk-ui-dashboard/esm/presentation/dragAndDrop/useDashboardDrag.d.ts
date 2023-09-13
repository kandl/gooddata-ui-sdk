import { ConnectDragSource, DragSourceMonitor } from "react-dnd";
import { DraggableItem } from "./types.js";
type CollectedProps<TItem> = {
    isDragging: boolean;
    item: TItem;
};
export declare function useDashboardDrag<DragObject extends DraggableItem>({ dragItem, canDrag, hideDefaultPreview, dragEnd, dragStart, }: {
    dragItem: DragObject | (() => DragObject);
    canDrag?: boolean | ((monitor: DragSourceMonitor<DragObject, void>) => boolean);
    hideDefaultPreview?: boolean;
    dragEnd?: (item: DragObject, monitor: DragSourceMonitor<DragObject, void>) => void;
    dragStart?: (item: DragObject) => void;
}, deps?: unknown[]): [CollectedProps<DragObject>, ConnectDragSource];
export {};
