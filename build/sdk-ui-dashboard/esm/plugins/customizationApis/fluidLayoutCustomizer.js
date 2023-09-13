// (C) 2021-2022 GoodData Corporation
import { objRefToString, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import cloneDeep from "lodash/cloneDeep.js";
import { DashboardLayoutBuilder } from "../../_staging/dashboard/fluidLayout/index.js";
export class FluidLayoutCustomizer {
    constructor(logger, mutationContext) {
        this.logger = logger;
        this.mutationContext = mutationContext;
        this.addItemOps = [];
        this.addSectionOps = [];
        this.addItem = (sectionIdx, itemIdx, item) => {
            if (!item.widget) {
                this.logger.warn(`Item to add to section ${sectionIdx} at index ${itemIdx} does not contain any widget. The item will not be added at all.`, item);
                return this;
            }
            this.addItemOps.push({
                sectionIdx,
                itemIdx,
                item: cloneDeep(item),
            });
            return this;
        };
        this.addSection = (sectionIdx, section) => {
            if (isEmpty(section.items)) {
                this.logger.warn(`Section to add at index ${sectionIdx} contains no items. The section will not be added at all.`, section);
                return this;
            }
            const itemsWithoutWidget = section.items.filter((item) => item.widget === undefined);
            if (!isEmpty(itemsWithoutWidget)) {
                this.logger.warn(`Section to add at index ${sectionIdx} contains items that do not specify any widgets. The section will not be added at all.`, section);
                return this;
            }
            this.addSectionOps.push({
                sectionIdx,
                section: cloneDeep(section),
            });
            return this;
        };
        this.applyTransformations = (layout) => {
            const builder = DashboardLayoutBuilder.for(layout);
            const facade = builder.facade();
            const { layouts } = this.mutationContext;
            this.addItemOps.forEach((op) => {
                const { sectionIdx, itemIdx, item } = op;
                const actualSectionIdx = sectionIdx === -1 ? facade.sections().count() : sectionIdx;
                builder.modifySection(actualSectionIdx, (sectionBuilder) => {
                    sectionBuilder.addItem(item, itemIdx === -1 ? undefined : itemIdx);
                    if (item.widget) {
                        layouts[objRefToString(item.widget)] = "inserted";
                    }
                    return sectionBuilder;
                });
            });
            this.addSectionOps.forEach((op) => {
                const { sectionIdx, section } = op;
                builder.addSection(section, sectionIdx === -1 ? undefined : sectionIdx);
                section.items.forEach((item) => {
                    if (item.widget) {
                        layouts[objRefToString(item.widget)] = "inserted";
                    }
                });
            });
            return builder.build();
        };
    }
}
//# sourceMappingURL=fluidLayoutCustomizer.js.map