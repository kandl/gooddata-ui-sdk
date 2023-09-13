import flatMap from "lodash/flatMap.js";
import { DashboardLayoutItemFacade } from "./item.js";
import { invariant } from "ts-invariant";
import { DASHBOARD_LAYOUT_GRID_COLUMNS_COUNT } from "../config.js";
/**
 * @alpha
 */
export class DashboardLayoutItemsFacade {
    constructor(itemFacades) {
        this.itemFacades = itemFacades;
    }
    static for(sectionFacade, items) {
        const itemFacades = items.map((column, index) => DashboardLayoutItemFacade.for(sectionFacade, column, index));
        return new DashboardLayoutItemsFacade(itemFacades);
    }
    raw() {
        return this.itemFacades.map((item) => item.raw());
    }
    item(index) {
        return this.itemFacades[index];
    }
    all() {
        return this.itemFacades;
    }
    asGridRows(screen) {
        const renderedRows = [];
        let currentRowWidth = 0;
        let currentRow = [];
        this.itemFacades.forEach((itemFacade) => {
            const itemSize = itemFacade.sizeForScreen(screen);
            invariant(itemSize, `Item size for ${screen} screen is not defined.`);
            if (currentRowWidth + itemSize.gridWidth > DASHBOARD_LAYOUT_GRID_COLUMNS_COUNT) {
                renderedRows.push(currentRow);
                currentRow = [];
                currentRowWidth = 0;
            }
            currentRow.push(itemFacade);
            currentRowWidth = currentRowWidth + itemSize.gridWidth;
        });
        if (currentRow.length > 0) {
            renderedRows.push(currentRow);
        }
        return renderedRows;
    }
    flatMap(callback) {
        return flatMap(this.itemFacades, callback);
    }
    count() {
        return this.itemFacades.length;
    }
    map(callback) {
        return this.itemFacades.map(callback);
    }
    reduce(callback, initialValue) {
        return this.itemFacades.reduce(callback, initialValue);
    }
    every(pred) {
        return this.itemFacades.every(pred);
    }
    some(pred) {
        return this.itemFacades.some(pred);
    }
    find(pred) {
        return this.itemFacades.find(pred);
    }
    filter(pred) {
        return this.itemFacades.filter(pred);
    }
}
//# sourceMappingURL=items.js.map