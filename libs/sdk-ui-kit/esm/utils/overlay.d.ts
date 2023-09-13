import { GetOptimalAlignment, GetOptimalAlignmentForRegion, IOptimalAlignment } from "../typings/overlay.js";
export declare const DEFAULT_ALIGN_POINTS: {
    align: string;
    offset: {
        x: number;
        y: number;
    };
}[];
/**
 * Calculate most visible alignment of self region which
 * would be positioned to target region using specified
 * align points
 */
export declare function getOptimalAlignmentForRegion({ boundaryRegion, targetRegion, selfRegion, alignPoints, }: GetOptimalAlignmentForRegion): IOptimalAlignment;
/**
 * Calculate optimal alignment of self region
 * using viewport boundaries. Try to position
 * using body boundaries if the region
 * is fully hidden in the viewport
 */
export declare function getOptimalAlignment({ targetRegion, selfRegion, ignoreScrollOffsets, alignPoints, getViewportRegion, getDocumentRegion, }: GetOptimalAlignment): IOptimalAlignment;
export declare function getOverlayStyles(): {
    html: {
        position: string;
        height: string;
    };
    body: {
        position: string;
        height: string;
    };
};
//# sourceMappingURL=overlay.d.ts.map