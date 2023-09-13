// (C) 2019-2022 GoodData Corporation
import isEqual from "lodash/isEqual.js";
import isNil from "lodash/isNil.js";
import { DashboardLayoutItemFacade } from "./item.js";
import { DashboardLayoutItemsFacade } from "./items.js";
/**
 * @alpha
 */
export class DashboardLayoutSectionFacade {
    constructor(layoutFacade, section, sectionIndex) {
        this.layoutFacade = layoutFacade;
        this.section = section;
        this.sectionIndex = sectionIndex;
    }
    static for(layoutFacade, section, index) {
        return new DashboardLayoutSectionFacade(layoutFacade, section, index);
    }
    raw() {
        return this.section;
    }
    header() {
        return this.section.header;
    }
    title() {
        var _a;
        return (_a = this.header()) === null || _a === void 0 ? void 0 : _a.title;
    }
    description() {
        var _a;
        return (_a = this.header()) === null || _a === void 0 ? void 0 : _a.description;
    }
    index() {
        return this.sectionIndex;
    }
    isFirst() {
        return this.indexIs(0);
    }
    isLast() {
        return this.indexIs(this.layoutFacade.sections().count() - 1);
    }
    testRaw(pred) {
        return pred(this.raw());
    }
    test(pred) {
        return pred(this);
    }
    indexIs(index) {
        return this.index() === index;
    }
    headerEquals(header) {
        return isEqual(this.header(), header);
    }
    hasHeader() {
        return !isNil(this.header());
    }
    hasTitle() {
        return !isNil(this.title());
    }
    hasDescription() {
        return !isNil(this.description());
    }
    titleEquals(title) {
        return isEqual(this.title(), title);
    }
    descriptionEquals(description) {
        return isEqual(this.description(), description);
    }
    isEmpty() {
        return this.items().count() === 0;
    }
    items() {
        return DashboardLayoutItemsFacade.for(this, this.section.items);
    }
    item(index) {
        const column = this.section.items[index];
        if (!column) {
            return undefined;
        }
        return DashboardLayoutItemFacade.for(this, column, index);
    }
    layout() {
        return this.layoutFacade;
    }
}
//# sourceMappingURL=section.js.map