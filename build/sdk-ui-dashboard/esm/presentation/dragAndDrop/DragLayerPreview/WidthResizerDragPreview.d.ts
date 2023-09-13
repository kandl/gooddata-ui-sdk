/// <reference types="react" />
import { XYCoord } from "react-dnd";
import { DragResizeProps } from "./types.js";
import { WidthResizerDragItem } from "../types.js";
interface IWidthResizerDragPreviewOwnProps {
    item: WidthResizerDragItem;
    differenceFromInitialOffset: XYCoord;
    initialSourceClientOffset: XYCoord;
}
export interface IWidthResizerDragPreviewDispatchProps {
    toggleMinLimitReached: (value: boolean) => void;
    positionIndexChanged: (initialIndex: number, currentIndex: number) => void;
}
export type IWidthResizerDragPreviewProps = IWidthResizerDragPreviewDispatchProps & IWidthResizerDragPreviewOwnProps;
export type WidthResizerDragPreviewProps = DragResizeProps<WidthResizerDragItem>;
export declare function WidthResizerDragPreview(props: WidthResizerDragPreviewProps): JSX.Element;
export declare function getSizeAndXCoords(item: WidthResizerDragItem, initialSourceClientOffsetX: number, differenceFromInitialOffsetX: number, scrollCorrectionX: number): {
    limitedX: number;
    unlimitedX: number;
    initialIndex: number;
    currentIndex: number;
    limitedSize: number;
    unlimitedSize: number;
    isLimited: boolean;
    limitReached: import("./types.js").ReachedResizingLimit;
};
export declare function getDiffInGridColumns(pxDiffX: number, gridColumnWidth: number): number;
export {};
