// (C) 2019-2022 GoodData Corporation
import isEqual from "lodash/isEqual.js";
import isNil from "lodash/isNil.js";
import { areObjRefsEqual, isWidget, isWidgetDefinition, isKpiWidgetDefinition, isKpiWidget, isInsightWidgetDefinition, isInsightWidget, isDashboardLayout, isDashboardLayoutItem, isObjRef, } from "@gooddata/sdk-model";
/**
 * @alpha
 */
export class DashboardLayoutItemFacade {
    constructor(sectionFacade, item, itemIndex) {
        this.sectionFacade = sectionFacade;
        this.item = item;
        this.itemIndex = itemIndex;
    }
    static for(sectionFacade, item, index) {
        return new DashboardLayoutItemFacade(sectionFacade, item, index);
    }
    raw() {
        return this.item;
    }
    section() {
        return this.sectionFacade;
    }
    index() {
        return this.itemIndex;
    }
    indexIs(index) {
        return this.index() === index;
    }
    isFirst() {
        return this.indexIs(0);
    }
    isLast() {
        return this.indexIs(this.sectionFacade.items().count() - 1);
    }
    widget() {
        return this.item.widget;
    }
    ref() {
        if (isObjRef(this.item.widget)) {
            return this.item.widget;
        }
        return undefined;
    }
    widgetEquals(widget) {
        return isEqual(this.widget(), widget);
    }
    widgetIs(widget) {
        return this.widget() === widget;
    }
    isEmpty() {
        return isNil(this.widget());
    }
    size() {
        return this.item.size;
    }
    sizeForScreen(screen) {
        return this.size()[screen];
    }
    hasSizeForScreen(screen) {
        return !isNil(this.sizeForScreen(screen));
    }
    testRaw(pred) {
        return pred(this.raw());
    }
    test(pred) {
        return pred(this);
    }
    isWidgetItem() {
        return isWidget(this.widget());
    }
    isWidgetDefinitionItem() {
        return isWidgetDefinition(this.widget());
    }
    isKpiWidgetItem() {
        return isKpiWidget(this.widget());
    }
    isKpiWidgetDefinitionItem() {
        return isKpiWidgetDefinition(this.widget());
    }
    isInsightWidgetItem() {
        return isInsightWidget(this.widget());
    }
    isInsightWidgetDefinitionItem() {
        return isInsightWidgetDefinition(this.widget());
    }
    isLayoutItem() {
        return isDashboardLayout(this.widget());
    }
    isCustomItem() {
        return !isDashboardLayoutItem(this.widget());
    }
    isWidgetItemWithRef(ref) {
        var _a;
        if (this.isWidgetItem()) {
            return areObjRefsEqual((_a = this.item.widget) === null || _a === void 0 ? void 0 : _a.ref, ref);
        }
        return false;
    }
    isWidgetItemWithInsightRef(ref) {
        var _a;
        if (this.isInsightWidgetItem() || this.isInsightWidgetDefinitionItem()) {
            return areObjRefsEqual((_a = this.item.widget) === null || _a === void 0 ? void 0 : _a.insight, ref);
        }
        return false;
    }
    isWidgetItemWithKpiRef(ref) {
        var _a;
        if (this.isKpiWidgetItem() || this.isKpiWidgetDefinitionItem()) {
            return areObjRefsEqual((_a = this.item.widget) === null || _a === void 0 ? void 0 : _a.ref, ref);
        }
        return false;
    }
}
//# sourceMappingURL=item.js.map