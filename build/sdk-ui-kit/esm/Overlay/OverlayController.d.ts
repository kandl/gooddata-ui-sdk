/**
 * Overlay stacking controller.
 *
 * @internal
 */
export declare class OverlayController {
    private initialZIndex;
    private overlays;
    private constructor();
    static getInstance(initialZIndex?: number): OverlayController;
    /**
     * Adds the overlay record to the map.
     *
     * @param uuid - given overlay uuid.
     */
    addOverlay(uuid: string): void;
    /**
     * Get maximum z-Index from current opened overlays
     * @returns
     */
    private getMaxZIndex;
    /**
     * Getter for z-index of the given overlay.
     *
     * @remarks
     * If the entry in the overlays map is not available, the initial z-index is used.
     *
     * @param uuid - unique identifier of the overlay.
     * @returns
     */
    getZIndex(uuid: string): number;
    /**
     * Removes given overlay from the overlays map.
     *
     * @param uuid - unique identifier of the overlay
     */
    removeOverlay(uuid: string): void;
}
//# sourceMappingURL=OverlayController.d.ts.map