// (C) 2019-2022 GoodData Corporation
import flatMap from "lodash/flatMap.js";
import { DashboardLayoutSectionFacade } from "./section.js";
/**
 * @alpha
 */
export class DashboardLayoutSectionsFacade {
    constructor(layoutFacade, sectionFacades) {
        this.layoutFacade = layoutFacade;
        this.sectionFacades = sectionFacades;
    }
    static for(layoutFacade, sections) {
        const sectionFacades = sections.map((section, index) => DashboardLayoutSectionFacade.for(layoutFacade, section, index));
        return new DashboardLayoutSectionsFacade(layoutFacade, sectionFacades);
    }
    raw() {
        return this.sectionFacades.map((s) => s.raw());
    }
    all() {
        return this.sectionFacades;
    }
    section(index) {
        return this.sectionFacades[index];
    }
    flatMap(callback) {
        return flatMap(this.sectionFacades, callback);
    }
    count() {
        return this.sectionFacades.length;
    }
    map(callback) {
        return this.sectionFacades.map(callback);
    }
    reduce(callback, initialValue) {
        return this.sectionFacades.reduce(callback, initialValue);
    }
    every(pred) {
        return this.sectionFacades.every(pred);
    }
    some(pred) {
        return this.sectionFacades.some(pred);
    }
    find(pred) {
        return this.sectionFacades.find(pred);
    }
    filter(pred) {
        return this.sectionFacades.filter(pred);
    }
}
//# sourceMappingURL=sections.js.map