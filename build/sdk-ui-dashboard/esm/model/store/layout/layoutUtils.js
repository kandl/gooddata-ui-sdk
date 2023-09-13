// (C) 2021-2023 GoodData Corporation
import { areObjRefsEqual, isInsightWidget, isKpiWidget, } from "@gooddata/sdk-model";
export function getWidgetCoordinates(layout, ref) {
    const itemData = getWidgetCoordinatesAndItem(layout, ref);
    if (itemData) {
        return {
            sectionIndex: itemData.sectionIndex,
            itemIndex: itemData.itemIndex,
        };
    }
    return undefined;
}
export function getWidgetCoordinatesAndItem(layout, ref) {
    var _a;
    for (let sectionIndex = 0; sectionIndex < layout.sections.length; sectionIndex++) {
        const section = layout.sections[sectionIndex];
        for (let itemIndex = 0; itemIndex < section.items.length; itemIndex++) {
            const item = section.items[itemIndex];
            if (areObjRefsEqual((_a = item.widget) === null || _a === void 0 ? void 0 : _a.ref, ref)) {
                return {
                    sectionIndex,
                    itemIndex,
                    item,
                };
            }
        }
    }
    return undefined;
}
export function isItemWithBaseWidget(obj) {
    const widget = obj.widget;
    return isInsightWidget(widget) || isKpiWidget(widget);
}
export function resizeInsightWidget(size, sizeInfo) {
    const { width, height } = sizeInfo;
    const { heightAsRatio } = size;
    let { gridWidth = 0, gridHeight } = size;
    //width
    if (width.max && gridWidth > width.max) {
        gridWidth = width.max;
    }
    if (width.min && gridWidth < width.min) {
        gridWidth = width.min;
    }
    //height
    if (!heightAsRatio) {
        if (height.max && (gridHeight || 0) > height.max) {
            gridHeight = height.max;
        }
        if (height.min && (gridHeight || 0) < height.min) {
            gridHeight = height.min;
        }
    }
    return {
        gridWidth,
        gridHeight,
        heightAsRatio,
    };
}
//# sourceMappingURL=layoutUtils.js.map