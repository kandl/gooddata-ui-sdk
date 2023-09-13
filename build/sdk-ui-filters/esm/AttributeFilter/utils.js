// (C) 2022-2023 GoodData Corporation
import { UnexpectedSdkError } from "@gooddata/sdk-ui";
import { invariant } from "ts-invariant";
import isEmpty from "lodash/isEmpty.js";
import { attributeElementsCount, filterAttributeElements, isPositiveAttributeFilter, } from "@gooddata/sdk-model";
/**
 * @internal
 */
export const ThrowMissingComponentError = (componentName, providerName) => () => {
    throw new UnexpectedSdkError(`Component: ${componentName} is missing in the ${providerName}.`);
};
/**
 * @internal
 */
export const throwMissingCallbackError = (callbackName, providerName) => (..._args) => {
    throw new UnexpectedSdkError(`Callback: ${callbackName} is missing in the ${providerName}.`);
};
/**
 * @internal
 */
export function getElementTitle(element, intl) {
    return element.formattedTitle || element.title || `(${intl.formatMessage({ id: "empty_value" })})`;
}
/**
 * @internal
 */
export function getElementTitles(elements, intl) {
    return elements.map((el) => getElementTitle(el, intl)).join(", ");
}
/**
 * @internal
 */
export function getElementKey(element) {
    return element.uri;
}
/**
 * @internal
 */
export function validateAttributeFilterProps(props) {
    var _a, _b;
    const { connectToPlaceholder, filter, onApply, parentFilters, hiddenElements, staticElements, backend } = props;
    invariant(!(filter && connectToPlaceholder), "It's not possible to combine 'filter' property with 'connectToPlaceholder' property. Either provide a filter, or a placeholer.");
    invariant(!(filter && !onApply), "It's not possible to use 'filter' property without 'onApply' property. Either provide 'onApply' callback or use placeholders.");
    invariant(filter || connectToPlaceholder, "No filter or placeholer provided. Provide one of the properties: 'filter', 'connectToPlaceholder'.");
    invariant(!(!((_a = backend === null || backend === void 0 ? void 0 : backend.capabilities) === null || _a === void 0 ? void 0 : _a.supportsElementsQueryParentFiltering) && !isEmpty(parentFilters)), "Parent filtering is not supported by the current backend implementation.");
    invariant(!(!((_b = backend === null || backend === void 0 ? void 0 : backend.capabilities) === null || _b === void 0 ? void 0 : _b.supportsElementsQueryParentFiltering) &&
        !isEmpty(hiddenElements) &&
        isEmpty(staticElements)), "Hidden elements are not supported by the current backend implementation.");
}
/**
 * @internal
 */
export function isValidSingleSelectionFilter(selectionMode, filter, limitingAttributeFilters) {
    const isSingleSelect = selectionMode === "single";
    const hasEmptyParentFilters = isEmpty(limitingAttributeFilters);
    const isPositiveWithMaxOneElement = isPositiveAttributeFilter(filter) && attributeElementsCount(filterAttributeElements(filter)) < 2;
    if (isSingleSelect) {
        if (!isPositiveWithMaxOneElement) {
            console.error("Provided 'filter' or 'connectToPlaceholder' property is not compatible with given single selection mode. It needs to be positive filter with max one item selected in attribute elements");
            return false;
        }
        if (!hasEmptyParentFilters) {
            console.error("Parent filtering can not be used together with single selection mode. Use only one of these properties at the same time.");
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=utils.js.map