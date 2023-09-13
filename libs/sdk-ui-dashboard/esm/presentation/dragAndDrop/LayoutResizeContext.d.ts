import { ReactNode } from "react";
import { ReachedResizingLimit } from "./DragLayerPreview/types.js";
import { XYCoord } from "react-dnd";
type ResizeDirection = "height" | "width" | "none";
type WidthState = {
    initialIndex: number;
    currentIndex: number;
    limitReached: ReachedResizingLimit;
};
export type LayoutResizeState = {
    resizeDirection: ResizeDirection;
    resizeItemIdentifiers: string[];
    heightLimitReached: ReachedResizingLimit;
    widthState: null | WidthState;
    initialDashboardDimensions: DOMRect;
};
export type LayoutResizeHandlers = {
    resizeStart: (direction: Exclude<ResizeDirection, "none">, resizeIdentifiers: string[], getDashboardDimensions?: () => DOMRect) => void;
    resizeEnd: () => void;
    setScrollCorrection: (scrollCorrection: XYCoord) => void;
    getScrollCorrection: () => XYCoord;
    setWidthState: (widthState: WidthState) => void;
    toggleHeightLimitReached: (limit: ReachedResizingLimit) => void;
};
export type LayoutResizeContext = LayoutResizeState & LayoutResizeHandlers;
export type LayoutResizeStateProviderProps = {
    children: ReactNode;
};
export declare function LayoutResizeStateProvider({ children }: LayoutResizeStateProviderProps): JSX.Element;
export declare function useResizeContext(): LayoutResizeContext;
export declare function useResizeHandlers(): LayoutResizeHandlers;
export declare function useResizeItemStatus(identifier: string): {
    isActive: boolean;
    isResizingColumnOrRow: boolean;
    heightLimitReached: ReachedResizingLimit;
    widthLimitReached: ReachedResizingLimit;
    initialDashboardDimensions: DOMRect;
};
export declare function useResizeWidthItemStatus(identifier: string): {
    isWidthResizing: boolean;
    isActive: boolean;
    widthState: WidthState | null;
};
export declare function useResizeWidthStatus(): {
    isResizingWidth: false;
} | ({
    isResizingWidth: true;
} & WidthState);
export {};
