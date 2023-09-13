// keep in sync with sdk-ui-dashboard
const DASHBOARD_LAYOUT_GRID_COLUMNS_COUNT = 12;
const GRID_ROW_HEIGHT_IN_PX = 20;
/**
 * @alpha
 */
export class FluidLayoutDescriptor {
    constructor() {
        this.gridColumnsCount = DASHBOARD_LAYOUT_GRID_COLUMNS_COUNT;
        this.gridRowHeight = GRID_ROW_HEIGHT_IN_PX;
    }
    toGridHeight(heightPx) {
        return Math.round(heightPx / this.gridRowHeight);
    }
    toHeightInPx(height) {
        return height * this.gridRowHeight;
    }
}
/**
 * @alpha
 */
export const fluidLayoutDescriptor = new FluidLayoutDescriptor();
//# sourceMappingURL=FluidLayoutDescriptor.js.map