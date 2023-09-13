// (C) 2019-2022 GoodData Corporation
import { invariant } from "ts-invariant";
import { InsightWidgetBuilder, KpiWidgetBuilder, resolveValueOrUpdateCallback, } from "@gooddata/sdk-backend-base";
import { isKpiWidgetDefinition, isKpiWidget, isInsightWidgetDefinition, isInsightWidget, isDashboardLayoutItem, } from "@gooddata/sdk-model";
import identity from "lodash/identity.js";
/**
 * @alpha
 */
export class DashboardLayoutItemBuilder {
    constructor(setSection, getItemFacade, itemIndex) {
        this.setSection = setSection;
        this.getItemFacade = getItemFacade;
        this.itemIndex = itemIndex;
    }
    /**
     * Creates an instance of DashboardLayoutItemBuilder for particular layout item.
     *
     * @param item - item to modify
     */
    static for(sectionBuilder, itemIndex) {
        var _a;
        invariant(isDashboardLayoutItem((_a = sectionBuilder.facade().item(itemIndex)) === null || _a === void 0 ? void 0 : _a.raw()), `Provided data must be IDashboardLayoutItem! ${itemIndex} ${sectionBuilder
            .facade()
            .item(itemIndex)}`);
        return new DashboardLayoutItemBuilder((section) => sectionBuilder.setSection(section), () => sectionBuilder.facade().item(itemIndex), itemIndex);
    }
    size(valueOrUpdateCallback) {
        this.setItem((item) => (Object.assign(Object.assign({}, item), { size: resolveValueOrUpdateCallback(valueOrUpdateCallback, item.size) })));
        return this;
    }
    widget(valueOrUpdateCallback) {
        this.setItem((item) => (Object.assign(Object.assign({}, item), { widget: resolveValueOrUpdateCallback(valueOrUpdateCallback, item.widget) })));
        return this;
    }
    setItem(valueOrUpdateCallback) {
        this.setSection((section) => {
            const updatedItems = [...section.items];
            updatedItems[this.itemIndex] = resolveValueOrUpdateCallback(valueOrUpdateCallback, this.build());
            return Object.assign(Object.assign({}, section), { items: updatedItems });
        });
        return this;
    }
    modify(modifications) {
        modifications(this, this.facade());
        return this;
    }
    build() {
        return this.facade().raw();
    }
    facade() {
        return this.getItemFacade();
    }
    newInsightWidget(insight, create = identity) {
        this.widget(create(InsightWidgetBuilder.forNew(insight)).build());
        return this;
    }
    modifyInsightWidget(modify) {
        const content = this.facade().widget();
        invariant(isInsightWidgetDefinition(content) || isInsightWidget(content), "Content of the item is not a kpi widget.");
        this.widget(modify(InsightWidgetBuilder.for(content)).build());
        return this;
    }
    newKpiWidget(measure, create = identity) {
        this.widget(create(KpiWidgetBuilder.forNew(measure)).build());
        return this;
    }
    modifyKpiWidget(modify) {
        const content = this.facade().widget();
        invariant(isKpiWidgetDefinition(content) || isKpiWidget(content), "Content of the item is not a kpi widget.");
        this.widget(modify(KpiWidgetBuilder.for(content)).build());
        return this;
    }
}
//# sourceMappingURL=item.js.map