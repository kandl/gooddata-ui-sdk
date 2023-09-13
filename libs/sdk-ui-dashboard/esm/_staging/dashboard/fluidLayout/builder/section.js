// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import identity from "lodash/identity.js";
import isArray from "lodash/isArray.js";
import difference from "lodash/difference.js";
import { isDashboardLayoutSection, } from "@gooddata/sdk-model";
import { resolveValueOrUpdateCallback } from "@gooddata/sdk-backend-base";
import { DashboardLayoutItemBuilder } from "./item.js";
/**
 * @alpha
 */
export class DashboardLayoutSectionBuilder {
    constructor(sectionIndex, getSectionFacade, setLayout) {
        this.sectionIndex = sectionIndex;
        this.getSectionFacade = getSectionFacade;
        this.setLayout = setLayout;
        this.removeEmptyItems = () => {
            return this.removeItems((items) => items.filter((item) => item.isEmpty()));
        };
    }
    /**
     * Creates an instance of DashboardLayoutSectionBuilder for particular layout item.
     */
    static for(layoutBuilder, sectionIndex) {
        var _a;
        invariant(isDashboardLayoutSection((_a = layoutBuilder.facade().sections().section(sectionIndex)) === null || _a === void 0 ? void 0 : _a.raw()), `Provided data must be IDashboardLayoutSection.`);
        const sectionBuilder = new DashboardLayoutSectionBuilder(sectionIndex, () => layoutBuilder.facade().section(sectionIndex), (layout) => layoutBuilder.setLayout(layout));
        return sectionBuilder;
    }
    header(valueOrUpdateCallback) {
        return this.setSection((section) => (Object.assign(Object.assign({}, section), { header: resolveValueOrUpdateCallback(valueOrUpdateCallback, section.header) })));
    }
    createItem(xlSize, create = identity, index = this.facade().items().count()) {
        const emptyItem = {
            type: "IDashboardLayoutItem",
            size: {
                xl: xlSize,
            },
        };
        this.setSection((section) => {
            const updatedItems = [...section.items];
            updatedItems.splice(index, 0, emptyItem);
            return Object.assign(Object.assign({}, section), { items: updatedItems });
        });
        DashboardLayoutItemBuilder.for(this, index).modify(create);
        return this;
    }
    addItem(item, index = this.facade().items().count()) {
        this.setSection((section) => {
            const updatedItems = [...section.items];
            updatedItems.splice(index, 0, item);
            return Object.assign(Object.assign({}, section), { items: updatedItems });
        });
        return this;
    }
    modifyItem(index, modify) {
        const itemFacade = this.facade().items().item(index);
        invariant(itemFacade, `Cannot modify the item - item at index ${index} does not exist.`);
        DashboardLayoutItemBuilder.for(this, index).modify(modify);
        return this;
    }
    removeItem(index) {
        const itemFacade = this.facade().items().item(index);
        invariant(itemFacade, `Cannot remove the item - item at index ${index} does not exist.`);
        return this.setSection((section) => {
            const updatedItems = [...section.items];
            updatedItems.splice(index, 1);
            return Object.assign(Object.assign({}, section), { items: updatedItems });
        });
    }
    moveItem(fromIndex, toIndex) {
        const itemFacade = this.facade().item(fromIndex);
        invariant(itemFacade, `Cannot move the item - item at index ${fromIndex} does not exist.`);
        const maxToIndex = Math.min(toIndex, this.facade().items().count() - 1);
        this.removeItem(fromIndex);
        this.createItem(itemFacade.sizeForScreen("xl"), (c) => c.setItem(itemFacade.raw()), maxToIndex);
        return this;
    }
    removeItems(selector = (items) => items.all()) {
        const itemsToRemove = selector(this.facade().items());
        if (isArray(itemsToRemove)) {
            this.setSection((section) => {
                const updatedItems = difference(section.items, itemsToRemove.map((r) => r.raw()));
                return Object.assign(Object.assign({}, section), { items: updatedItems });
            });
        }
        else if (itemsToRemove) {
            this.removeItem(itemsToRemove.index());
        }
        return this;
    }
    modifyItems(modify, selector = (items) => items.all()) {
        const itemsToModify = selector(this.facade().items());
        if (isArray(itemsToModify)) {
            itemsToModify.forEach((item) => {
                this.modifyItem(item.index(), modify);
            });
        }
        else if (itemsToModify) {
            this.modifyItem(itemsToModify.index(), modify);
        }
        return this;
    }
    setSection(valueOrUpdateCallback) {
        this.setLayout((layout) => {
            const updatedRows = [...layout.sections];
            updatedRows[this.sectionIndex] = resolveValueOrUpdateCallback(valueOrUpdateCallback, this.build());
            return Object.assign(Object.assign({}, layout), { sections: updatedRows });
        });
        return this;
    }
    facade() {
        return this.getSectionFacade();
    }
    modify(modifications) {
        modifications(this, this.facade());
        return this;
    }
    build() {
        return this.facade().raw();
    }
}
//# sourceMappingURL=section.js.map