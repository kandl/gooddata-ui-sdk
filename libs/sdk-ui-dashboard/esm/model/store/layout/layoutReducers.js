import { invariant } from "ts-invariant";
import { resetUndoReducer, undoReducer, withUndo } from "../_infra/undoEnhancer.js";
import { isCustomWidget, } from "../../types/layoutTypes.js";
import { addArrayElements, moveArrayElement, removeArrayElement } from "../../utils/arrayOps.js";
import { areObjRefsEqual, isDashboardDateFilterReference, isKpiWidget, isInsightWidget, } from "@gooddata/sdk-model";
import flatMap from "lodash/flatMap.js";
import { newMapForObjectWithIdentity } from "../../../_staging/metadata/objRefMap.js";
import { setOrDelete } from "../../../_staging/objectUtils/setOrDelete.js";
import { getWidgetCoordinatesAndItem, resizeInsightWidget } from "./layoutUtils.js";
//
//
//
const setLayout = (state, action) => {
    state.layout = action.payload;
    resetUndoReducer(state);
};
//
//
//
function recurseLayoutAndUpdateWidgetIds(layout, mapping) {
    layout.sections.forEach((section) => {
        section.items.forEach((item) => {
            var _a;
            const widget = item.widget;
            if (!isInsightWidget(widget) && !isKpiWidget(widget)) {
                return;
            }
            const { updated: newIdentity } = (_a = mapping.get(widget.ref)) !== null && _a !== void 0 ? _a : {};
            if (!newIdentity) {
                return;
            }
            widget.ref = newIdentity.ref;
            widget.uri = newIdentity.uri;
            widget.identifier = newIdentity.identifier;
        });
    });
}
const updateWidgetIdentities = (state, action) => {
    invariant(state.layout);
    recurseLayoutAndUpdateWidgetIds(state.layout, action.payload);
};
const addSection = (state, action) => {
    invariant(state.layout);
    const { index, section, usedStashes } = action.payload;
    addArrayElements(state.layout.sections, index, [section]);
    usedStashes.forEach((stashIdentifier) => {
        delete state.stash[stashIdentifier];
    });
};
const removeSection = (state, action) => {
    invariant(state.layout);
    const { index, stashIdentifier } = action.payload;
    if (stashIdentifier) {
        const items = state.layout.sections[index].items;
        state.stash[stashIdentifier] = items;
    }
    removeArrayElement(state.layout.sections, index);
};
const changeSectionHeader = (state, action) => {
    invariant(state.layout);
    const { index, header } = action.payload;
    state.layout.sections[index].header = header;
};
const changeItemsHeight = (state, action) => {
    invariant(state.layout);
    const { sectionIndex, itemIndexes, height } = action.payload;
    const section = state.layout.sections[sectionIndex];
    itemIndexes.forEach((itemIndex) => {
        const item = section.items[itemIndex];
        if (isCustomWidget(item.widget)) {
            return;
        }
        const newSize = Object.assign(Object.assign({}, item.size), { xl: Object.assign(Object.assign({}, item.size.xl), { gridHeight: height }) });
        item.size = newSize;
    });
};
const changeItemWidth = (state, action) => {
    invariant(state.layout);
    const { sectionIndex, itemIndex, width } = action.payload;
    const section = state.layout.sections[sectionIndex];
    const item = section.items[itemIndex];
    const newSize = Object.assign(Object.assign({}, item.size), { xl: Object.assign(Object.assign({}, item.size.xl), { gridWidth: width }) });
    item.size = newSize;
};
const moveSection = (state, action) => {
    invariant(state.layout);
    const { sectionIndex, toIndex } = action.payload;
    moveArrayElement(state.layout.sections, sectionIndex, toIndex);
};
const addSectionItems = (state, action) => {
    invariant(state.layout);
    const { sectionIndex, itemIndex, items, usedStashes } = action.payload;
    const section = state.layout.sections[sectionIndex];
    invariant(section);
    addArrayElements(section.items, itemIndex, items);
    usedStashes.forEach((stashIdentifier) => {
        delete state.stash[stashIdentifier];
    });
};
const moveSectionItem = (state, action) => {
    invariant(state.layout);
    const { sectionIndex, itemIndex, toSectionIndex, toItemIndex } = action.payload;
    const fromSection = state.layout.sections[sectionIndex];
    const toSection = state.layout.sections[toSectionIndex];
    invariant(fromSection);
    invariant(toSection);
    const item = removeArrayElement(fromSection.items, itemIndex);
    invariant(item);
    addArrayElements(toSection.items, toItemIndex, [item]);
};
const removeSectionItem = (state, action) => {
    invariant(state.layout);
    const { sectionIndex, itemIndex, stashIdentifier } = action.payload;
    const section = state.layout.sections[sectionIndex];
    invariant(section);
    const item = removeArrayElement(section.items, itemIndex);
    invariant(item);
    if (stashIdentifier) {
        state.stash[stashIdentifier] = [item];
    }
};
const replaceSectionItem = (state, action) => {
    invariant(state.layout);
    const { sectionIndex, itemIndex, newItems, stashIdentifier, usedStashes } = action.payload;
    const section = state.layout.sections[sectionIndex];
    invariant(section);
    const item = removeArrayElement(section.items, itemIndex);
    invariant(item);
    if (stashIdentifier) {
        state.stash[stashIdentifier] = [item];
    }
    addArrayElements(section.items, itemIndex, newItems);
    usedStashes.forEach((usedStash) => {
        /*
         * It is a valid case that the new item is taken from a stash and the replaced item is then
         * used to replace the same stash.
         */
        if (stashIdentifier !== undefined && usedStash === stashIdentifier) {
            return;
        }
        delete state.stash[usedStash];
    });
};
//
// Layout-widget specific reducers
//
const getWidgetByRef = (state, widgetRef) => {
    var _a;
    const allWidgets = flatMap((_a = state === null || state === void 0 ? void 0 : state.layout) === null || _a === void 0 ? void 0 : _a.sections, (section) => section.items.map((item) => item.widget));
    const widgets = allWidgets.filter(Boolean);
    const widgetMap = newMapForObjectWithIdentity(widgets);
    return widgetMap.get(widgetRef);
};
const replaceWidgetHeader = (state, action) => {
    var _a;
    invariant(state.layout);
    const { header, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    // this means command handler did not correctly validate that the widget exists before dispatching the
    // reducer action
    invariant(widget && (isKpiWidget(widget) || isInsightWidget(widget)));
    widget.title = (_a = header.title) !== null && _a !== void 0 ? _a : "";
};
const replaceWidgetDescription = (state, action) => {
    var _a;
    invariant(state.layout);
    const { description, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    // this means command handler did not correctly validate that the widget exists before dispatching the
    // reducer action
    invariant(widget && (isKpiWidget(widget) || isInsightWidget(widget)));
    widget.description = (_a = description.description) !== null && _a !== void 0 ? _a : "";
};
const replaceWidgetDrill = (state, action) => {
    invariant(state.layout);
    const { drillDefinitions, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    // this means command handler did not correctly validate that the widget exists before dispatching the
    // reducer action
    invariant(widget && (isKpiWidget(widget) || isInsightWidget(widget)));
    widget.drills = drillDefinitions !== null && drillDefinitions !== void 0 ? drillDefinitions : [];
};
const replaceInsightWidgetVisProperties = (state, action) => {
    invariant(state.layout);
    const { properties, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && isInsightWidget(widget));
    setOrDelete(widget, "properties", properties);
};
const replaceInsightWidgetVisConfiguration = (state, action) => {
    invariant(state.layout);
    const { config, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && isInsightWidget(widget));
    setOrDelete(widget, "configuration", config);
};
const replaceInsightWidgetInsight = (state, action) => {
    invariant(state.layout, "State of layout is empty");
    const { insightRef, properties, ref, header, newSize } = action.payload;
    const widget = getWidgetByRef(state, ref);
    const data = getWidgetCoordinatesAndItem(state.layout, ref);
    invariant(isInsightWidget(widget), "IInsightWidget is missing in state");
    if (properties) {
        widget.properties = properties;
    }
    if (header === null || header === void 0 ? void 0 : header.title) {
        widget.title = header.title;
    }
    widget.insight = insightRef;
    if (newSize && (data === null || data === void 0 ? void 0 : data.item)) {
        data.item.size.xl = resizeInsightWidget(data.item.size.xl, newSize);
    }
};
const replaceWidgetFilterSettings = (state, action) => {
    invariant(state.layout);
    const { ignoreDashboardFilters, dateDataSet, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && (isInsightWidget(widget) || isKpiWidget(widget)));
    widget.dateDataSet = dateDataSet;
    widget.ignoreDashboardFilters = ignoreDashboardFilters !== null && ignoreDashboardFilters !== void 0 ? ignoreDashboardFilters : [];
};
const removeIgnoredAttributeFilter = (state, action) => {
    invariant(state.layout);
    const { displayFormRefs } = action.payload;
    state.layout.sections.forEach((section) => {
        section.items.forEach((item) => {
            const widget = item.widget;
            if (isInsightWidget(widget) || isKpiWidget(widget)) {
                const updatedFilters = widget.ignoreDashboardFilters.filter((filter) => {
                    if (isDashboardDateFilterReference(filter)) {
                        return true;
                    }
                    return (displayFormRefs.find((removed) => areObjRefsEqual(removed, filter.displayForm)) ===
                        undefined);
                });
                widget.ignoreDashboardFilters = updatedFilters;
            }
        });
    });
};
const replaceWidgetDateDataset = (state, action) => {
    invariant(state.layout);
    const { dateDataSet, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && (isInsightWidget(widget) || isKpiWidget(widget)));
    widget.dateDataSet = dateDataSet;
};
const replaceKpiWidgetMeasure = (state, action) => {
    invariant(state.layout);
    const { ref, measureRef } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && isKpiWidget(widget));
    widget.kpi.metric = measureRef;
};
const replaceKpiWidgetComparison = (state, action) => {
    invariant(state.layout);
    const { ref, comparisonType, comparisonDirection } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && isKpiWidget(widget));
    widget.kpi.comparisonType = comparisonType;
    widget.kpi.comparisonDirection = comparisonDirection;
};
const replaceKpiWidgetDrill = (state, action) => {
    invariant(state.layout);
    const { ref, drill } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && isKpiWidget(widget));
    widget.drills = drill ? [drill] : [];
};
const replaceKpiWidgetConfiguration = (state, action) => {
    invariant(state.layout);
    const { config, ref } = action.payload;
    const widget = getWidgetByRef(state, ref);
    invariant(widget && isKpiWidget(widget));
    setOrDelete(widget, "configuration", config);
};
export const layoutReducers = {
    setLayout,
    updateWidgetIdentities,
    removeIgnoredAttributeFilter,
    addSection: withUndo(addSection),
    removeSection: withUndo(removeSection),
    moveSection: withUndo(moveSection),
    changeSectionHeader: withUndo(changeSectionHeader),
    addSectionItems: withUndo(addSectionItems),
    moveSectionItem: withUndo(moveSectionItem),
    removeSectionItem: withUndo(removeSectionItem),
    replaceSectionItem: withUndo(replaceSectionItem),
    replaceWidgetHeader: withUndo(replaceWidgetHeader),
    replaceWidgetDescription: withUndo(replaceWidgetDescription),
    replaceWidgetDrillWithoutUndo: replaceWidgetDrill,
    replaceWidgetDrills: withUndo(replaceWidgetDrill),
    replaceInsightWidgetVisProperties: withUndo(replaceInsightWidgetVisProperties),
    replaceInsightWidgetVisConfiguration: withUndo(replaceInsightWidgetVisConfiguration),
    replaceInsightWidgetInsight: withUndo(replaceInsightWidgetInsight),
    replaceWidgetFilterSettings: withUndo(replaceWidgetFilterSettings),
    replaceWidgetDateDataset: withUndo(replaceWidgetDateDataset),
    replaceKpiWidgetMeasure: withUndo(replaceKpiWidgetMeasure),
    replaceKpiWidgetComparison: withUndo(replaceKpiWidgetComparison),
    replaceKpiWidgetDrillWithoutUndo: replaceKpiWidgetDrill,
    replaceKpiWidgetDrill: withUndo(replaceKpiWidgetDrill),
    replaceKpiWidgetConfiguration: withUndo(replaceKpiWidgetConfiguration),
    undoLayout: undoReducer,
    clearLayoutHistory: resetUndoReducer,
    changeItemsHeight: changeItemsHeight,
    changeItemWidth: changeItemWidth,
};
//# sourceMappingURL=layoutReducers.js.map