// (C) 2022 GoodData Corporation
/**
 * When stacking the overlays, next overlay is going to have an z-index higher by 1.
 */
const Z_INDEX_STEP = 1;
const DEFAULT_INIT_Z_INDEX = 5001;
/**
 * Overlay stacking controller.
 *
 * @internal
 */
export class OverlayController {
    constructor(initialZIndex = DEFAULT_INIT_Z_INDEX) {
        this.initialZIndex = DEFAULT_INIT_Z_INDEX;
        this.overlays = new Map();
        this.initialZIndex = initialZIndex;
    }
    static getInstance(initialZIndex = DEFAULT_INIT_Z_INDEX) {
        return new OverlayController(initialZIndex);
    }
    /**
     * Adds the overlay record to the map.
     *
     * @param uuid - given overlay uuid.
     */
    addOverlay(uuid) {
        const maxIndex = this.getMaxZIndex();
        this.overlays.set(uuid, maxIndex + Z_INDEX_STEP);
    }
    /**
     * Get maximum z-Index from current opened overlays
     * @returns
     */
    getMaxZIndex() {
        let maxIndex = 0;
        this.overlays.forEach((value) => {
            maxIndex = Math.max(maxIndex, value);
        });
        return maxIndex || this.initialZIndex;
    }
    /**
     * Getter for z-index of the given overlay.
     *
     * @remarks
     * If the entry in the overlays map is not available, the initial z-index is used.
     *
     * @param uuid - unique identifier of the overlay.
     * @returns
     */
    getZIndex(uuid) {
        return this.overlays.get(uuid) || this.initialZIndex;
    }
    /**
     * Removes given overlay from the overlays map.
     *
     * @param uuid - unique identifier of the overlay
     */
    removeOverlay(uuid) {
        this.overlays.delete(uuid);
    }
}
//# sourceMappingURL=OverlayController.js.map