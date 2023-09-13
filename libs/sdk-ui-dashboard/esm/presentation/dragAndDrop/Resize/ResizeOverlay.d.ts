/// <reference types="react" />
import { ReachedResizingLimit } from "../DragLayerPreview/types.js";
export interface ResizeOverlayProps {
    isResizingColumnOrRow: boolean;
    isActive: boolean;
    reachedWidthLimit: ReachedResizingLimit;
    reachedHeightLimit: ReachedResizingLimit;
}
export declare function ResizeOverlay(props: ResizeOverlayProps): JSX.Element | null;
