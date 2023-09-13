// (C) 2019-2022 GoodData Corporation
import { isDashboardLayout, } from "@gooddata/sdk-model";
import { invariant } from "ts-invariant";
import difference from "lodash/difference.js";
import isArray from "lodash/isArray.js";
import identity from "lodash/identity.js";
import { DashboardLayoutFacade } from "../facade/layout.js";
import { DashboardLayoutSectionBuilder } from "./section.js";
import { resolveValueOrUpdateCallback } from "@gooddata/sdk-backend-base";
/**
 * @alpha
 */
export class DashboardLayoutBuilder {
    constructor(layoutFacade, layoutFacadeConstructor) {
        this.layoutFacade = layoutFacade;
        this.layoutFacadeConstructor = layoutFacadeConstructor;
    }
    /**
     * Creates an instance of DashboardLayoutBuilder for particular layout.
     *
     * @param layout - layout to modify
     */
    static for(layout) {
        invariant(isDashboardLayout(layout), "Provided data must be IDashboardLayout.");
        const dashboardLayoutBuilder = new DashboardLayoutBuilder(DashboardLayoutFacade.for(layout), DashboardLayoutFacade.for);
        return dashboardLayoutBuilder;
    }
    /**
     * Creates an instance of DashboardLayoutBuilder with empty layout.
     */
    static forNewLayout() {
        const emptyLayout = {
            type: "IDashboardLayout",
            sections: [],
        };
        return DashboardLayoutBuilder.for(emptyLayout);
    }
    size(valueOrUpdateCallback) {
        return this.setLayout((layout) => (Object.assign(Object.assign({}, layout), { size: resolveValueOrUpdateCallback(valueOrUpdateCallback, this.facade().size()) })));
    }
    createSection(create = identity, index = this.facade().sections().count()) {
        const emptySection = {
            type: "IDashboardLayoutSection",
            items: [],
        };
        this.setLayout((layout) => {
            const updatedRows = [...layout.sections];
            updatedRows.splice(index, 0, emptySection);
            return Object.assign(Object.assign({}, layout), { sections: updatedRows });
        });
        DashboardLayoutSectionBuilder.for(this, index).modify(create);
        return this;
    }
    addSection(section, index = this.facade().sections().count()) {
        this.setLayout((layout) => {
            const updatedRows = [...layout.sections];
            updatedRows.splice(index, 0, section);
            return Object.assign(Object.assign({}, layout), { sections: updatedRows });
        });
        return this;
    }
    modifySection(index, modify) {
        const sectionFacade = this.facade().sections().section(index);
        invariant(sectionFacade, `Cannot modify the section - section at index ${index} does not exist.`);
        DashboardLayoutSectionBuilder.for(this, index).modify(modify);
        return this;
    }
    removeSection(index) {
        const sectionFacade = this.facade().sections().section(index);
        invariant(sectionFacade, `Cannot remove the section - section at index ${index} does not exist.`);
        return this.setLayout((layout) => {
            const updatedRows = [...layout.sections];
            updatedRows.splice(index, 1);
            return Object.assign(Object.assign({}, layout), { sections: updatedRows });
        });
    }
    moveSection(fromIndex, toIndex) {
        var _a;
        const section = (_a = this.facade().sections().section(fromIndex)) === null || _a === void 0 ? void 0 : _a.raw();
        invariant(section, `Cannot move the section - section at index ${fromIndex} does not exist.`);
        const maxToIndex = Math.min(toIndex, this.facade().sections().count() - 1);
        this.removeSection(fromIndex);
        this.createSection((r) => {
            return r.setSection(section);
        }, maxToIndex);
        return this;
    }
    removeSections(selector = (sections) => sections.all()) {
        const sectionsToRemove = selector(this.facade().sections());
        if (isArray(sectionsToRemove)) {
            this.setLayout((layout) => {
                const updatedRows = difference(layout.sections, sectionsToRemove.map((r) => r.raw()));
                return Object.assign(Object.assign({}, layout), { sections: updatedRows });
            });
        }
        else if (sectionsToRemove) {
            this.removeSection(sectionsToRemove.index());
        }
        return this;
    }
    removeEmptySections() {
        return this.removeSections((sections) => sections.filter((section) => section.isEmpty()));
    }
    modifySections(modify, selector = (sections) => sections.all()) {
        const sectionsToModify = selector(this.facade().sections());
        if (isArray(sectionsToModify)) {
            sectionsToModify.forEach((section) => {
                this.modifySection(section.index(), modify);
            });
        }
        else if (sectionsToModify) {
            this.modifySection(sectionsToModify.index(), modify);
        }
        return this;
    }
    setLayout(valueOrUpdateCallback) {
        const updatedLayout = resolveValueOrUpdateCallback(valueOrUpdateCallback, this.build());
        this.layoutFacade = this.layoutFacadeConstructor(updatedLayout);
        return this;
    }
    facade() {
        return this.layoutFacade;
    }
    modify(modifications) {
        modifications(this, this.facade());
        return this;
    }
    build() {
        return this.layoutFacade.raw();
    }
}
//# sourceMappingURL=layout.js.map