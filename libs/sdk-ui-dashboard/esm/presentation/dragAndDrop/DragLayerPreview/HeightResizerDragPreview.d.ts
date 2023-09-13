/// <reference types="react" />
import { DragResizeProps } from "./types.js";
import { HeightResizerDragItem } from "../types.js";
export type HeightResizerDragPreviewProps = DragResizeProps<HeightResizerDragItem>;
export declare const HeightResizerDragPreview: (props: HeightResizerDragPreviewProps) => JSX.Element;
export declare function getLimitedYCoord(item: HeightResizerDragItem, initialSourceClientOffsetY: number, differenceFromInitialOffsetY: number, scrollingCorrectionY: number): number;
