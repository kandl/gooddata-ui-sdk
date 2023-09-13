// (C) 2019-2023 GoodData Corporation
import { isDashboardLayout } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import { DashboardLayoutSectionsFacade } from "./sections.js";
/**
 * @alpha
 */
export class DashboardLayoutFacade {
    constructor(layout) {
        this.layout = layout;
    }
    /**
     * Creates an instance of DashboardLayoutFacade
     * @param layout - layout to wrap
     */
    static for(layout) {
        invariant(isDashboardLayout(layout), "Provided data must be IDashboardLayout.");
        return new DashboardLayoutFacade(layout);
    }
    sections() {
        if (this.sectionsCache === undefined) {
            this.sectionsCache = DashboardLayoutSectionsFacade.for(this, this.layout.sections);
        }
        return this.sectionsCache;
    }
    section(rowIndex) {
        return this.sections().section(rowIndex);
    }
    size() {
        return this.layout.size;
    }
    raw() {
        return this.layout;
    }
}
//# sourceMappingURL=layout.js.map