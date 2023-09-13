// (C) 2019-2022 GoodData Corporation
import { isAttributeLocator, isMeasureSort, isInsightWidget, } from "@gooddata/sdk-model";
import isEmpty from "lodash/isEmpty.js";
import flow from "lodash/flow.js";
/**
 * Purpose of methods in this file is to remove & replace legacy element uris in the visualization properties & sorts
 * in favor of label text values (primary keys on Tiger).
 * In the past, we generated fake uris for attribute elements on Tiger to workaround some PivotTable internals,
 * but these uris are used in AD to pair attribute elements with custom colors/sortItems/columnWidths of the visualization.
 * Now, we don't need to fake these uris anymore and label text values are used directly for this on Tiger
 * so strip the fake uris and keep only label text values for the element ids.
 */
const FAKE_ELEMENT_URI_REGEX = /\/obj\/\d+\/elements\?id=(.*)/;
function fixColorMapping(colorMapping) {
    var _a, _b;
    const [uri, labelValue] = (_b = (_a = colorMapping.id) === null || _a === void 0 ? void 0 : _a.match(FAKE_ELEMENT_URI_REGEX)) !== null && _b !== void 0 ? _b : [];
    if (uri) {
        return Object.assign(Object.assign({}, colorMapping), { id: labelValue });
    }
    return colorMapping;
}
function fixVisualizationPropertiesColorMapping(properties = {}) {
    var _a;
    const colorMapping = (_a = properties.controls) === null || _a === void 0 ? void 0 : _a.colorMapping;
    if (colorMapping) {
        return Object.assign(Object.assign({}, properties), { controls: Object.assign(Object.assign({}, properties.controls), { colorMapping: colorMapping.map(fixColorMapping) }) });
    }
    return properties;
}
// Fix sorts
/**
 * We need to clone sortItems to visualizationProperties as we are not storing them on the backend,
 * but AD depends on them (and it's hard refactor).
 */
function addVisualizationPropertiesSortItems(properties = {}, sortItems = []) {
    return Object.assign(Object.assign({}, properties), { sortItems });
}
function fixSortItems(sortItems = []) {
    return sortItems.map((s) => {
        if (isMeasureSort(s)) {
            return {
                measureSortItem: Object.assign(Object.assign({}, s.measureSortItem), { locators: s.measureSortItem.locators.map(fixLocatorItem) }),
            };
        }
        return s;
    });
}
function fixLocatorItem(locator) {
    var _a, _b;
    if (isAttributeLocator(locator)) {
        // element can be null even though the OpenAPI spec says it cannot (that will be fixed in CAL-515)
        const [uri, labelValue] = (_b = (_a = locator.attributeLocatorItem.element) === null || _a === void 0 ? void 0 : _a.match(FAKE_ELEMENT_URI_REGEX)) !== null && _b !== void 0 ? _b : [];
        if (uri) {
            return Object.assign(Object.assign({}, locator), { attributeLocatorItem: Object.assign(Object.assign({}, locator.attributeLocatorItem), { element: labelValue }) });
        }
    }
    return locator;
}
/**
 * @internal
 */
function isAttributeColumnLocator(obj) {
    return !isEmpty(obj) && obj.attributeLocatorItem !== undefined;
}
/**
 * @internal
 */
function isMeasureColumnWidthItem(obj) {
    return (!isEmpty(obj) &&
        obj.measureColumnWidthItem !== undefined &&
        obj.measureColumnWidthItem.locators !== undefined);
}
function fixColumnLocator(locator) {
    var _a, _b;
    if (isAttributeColumnLocator(locator)) {
        const [uri, labelValue] = (_b = (_a = locator.attributeLocatorItem.element) === null || _a === void 0 ? void 0 : _a.match(FAKE_ELEMENT_URI_REGEX)) !== null && _b !== void 0 ? _b : [];
        if (uri) {
            return Object.assign(Object.assign({}, locator), { attributeLocatorItem: Object.assign(Object.assign({}, locator.attributeLocatorItem), { element: labelValue }) });
        }
    }
    return locator;
}
function fixVisualizationPropertiesColumnWidths(properties = {}) {
    var _a;
    const columnWidths = (_a = properties.controls) === null || _a === void 0 ? void 0 : _a.columnWidths;
    if (columnWidths) {
        return Object.assign(Object.assign({}, properties), { controls: Object.assign(Object.assign({}, properties.controls), { columnWidths: columnWidths.map((c) => {
                    if (isMeasureColumnWidthItem(c)) {
                        return {
                            measureColumnWidthItem: Object.assign(Object.assign({}, c.measureColumnWidthItem), { locators: c.measureColumnWidthItem.locators.map(fixColumnLocator) }),
                        };
                    }
                    return c;
                }) }) });
    }
    return properties;
}
export function fixInsightLegacyElementUris(insight) {
    const fixedSortItems = fixSortItems(insight.insight.sorts);
    const fixedProperties = flow(fixVisualizationPropertiesColorMapping, fixVisualizationPropertiesColumnWidths, (properties) => addVisualizationPropertiesSortItems(properties, fixedSortItems))(insight.insight.properties);
    return Object.assign(Object.assign({}, insight), { insight: Object.assign(Object.assign({}, insight.insight), { sorts: fixedSortItems, properties: fixedProperties }) });
}
export function fixWidgetLegacyElementUris(widget) {
    if (isInsightWidget(widget)) {
        const fixedProperties = fixVisualizationPropertiesColumnWidths(widget.properties);
        return Object.assign(Object.assign({}, widget), { properties: fixedProperties });
    }
    return widget;
}
//# sourceMappingURL=fixLegacyElementUris.js.map