import { DropTargetMonitor, DropTargetHookSpec } from "react-dnd";
import { DraggableItem, DraggableItemType, DraggableItemTypeMapping } from "./types.js";
type DashboardDropTargetHookSpec<DragObject, CollectedProps> = Pick<DropTargetHookSpec<DragObject, void, CollectedProps>, "canDrop" | "drop" | "hover">;
declare class BasicDropCollectTypeWrapper<DraggableObject = DraggableItem> {
    basicDropCollect: (monitor: DropTargetMonitor<unknown, unknown>) => {
        isOver: boolean;
        canDrop: boolean;
        itemType: DraggableItemType;
        item: DraggableObject;
    };
}
type BasicDropCollectReturnType<DraggableObject = DraggableItem> = ReturnType<BasicDropCollectTypeWrapper<DraggableObject>["basicDropCollect"]>;
export declare function useDashboardDrop<DragType extends DraggableItemType, DragObject = DraggableItemTypeMapping[DragType], CollectedProps = BasicDropCollectReturnType<DragObject>>(draggableItemTypes: DragType | DragType[], specArg: DashboardDropTargetHookSpec<DragObject, CollectedProps>, deps?: unknown[]): [{
    isOver: boolean;
    canDrop: boolean;
    itemType: DraggableItemType;
    item: unknown;
}, import("react-dnd").ConnectDropTarget];
export {};
