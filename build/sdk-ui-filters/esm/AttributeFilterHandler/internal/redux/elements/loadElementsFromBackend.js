// (C) 2022-2023 GoodData Corporation
import isEmpty from "lodash/isEmpty.js";
import { isElementsQueryOptionsElementsByValue, isValueBasedElementsQueryOptionsElements, } from "@gooddata/sdk-backend-spi";
import { attributeElementsIsEmpty, newNegativeAttributeFilter, newAttribute, newPositiveAttributeFilter, } from "@gooddata/sdk-model";
import { convertError, DataViewFacade } from "@gooddata/sdk-ui";
import { InMemoryPaging } from "./InMemoryPaging.js";
async function loadElementsAsExecution(backend, workspace, displayFormRef, elements, hiddenElementsInfo) {
    const elementValues = elements.values;
    const filters = [newPositiveAttributeFilter(displayFormRef, elementValues)];
    if (!attributeElementsIsEmpty(hiddenElementsInfo.hiddenElements)) {
        filters.push(newNegativeAttributeFilter(displayFormRef, hiddenElementsInfo.hiddenElements));
    }
    const executionResult = await backend
        .workspace(workspace)
        .execution()
        .forItems([newAttribute(displayFormRef)], filters)
        .execute()
        .catch((err) => {
        throw convertError(err);
    });
    const executionDataView = await executionResult.readAll().catch((err) => {
        throw convertError(err);
    });
    const dataViewFacade = DataViewFacade.for(executionDataView);
    const [headers] = dataViewFacade.meta().attributeHeaders();
    return headers.map(([header]) => {
        return {
            title: header.attributeHeaderItem.name,
            uri: header.attributeHeaderItem.uri,
        };
    });
}
/**
 * @internal
 */
export async function loadElementsFromBackend(context, options, hiddenElementsInfo) {
    const { backend, workspace } = context;
    const { displayFormRef, elements, limit, limitingAttributeFilters, limitingDateFilters, limitingMeasures, offset, search, order, includeTotalCountWithoutFilters, excludePrimaryLabel = true, signal, } = options;
    const isInitialSelectionRequest = isEmpty(limitingAttributeFilters) &&
        isEmpty(limitingDateFilters) &&
        isEmpty(limitingMeasures) &&
        !search &&
        !excludePrimaryLabel &&
        !order &&
        offset === 0;
    // Bear validElements API does not support loading elements by values,
    // but it's possible to load them with execution API.
    // This is necessary to load the initial selection.
    if (isElementUrisSupported(backend) &&
        isElementsQueryOptionsElementsByValue(elements) &&
        isInitialSelectionRequest) {
        const resolvedElements = await loadElementsAsExecution(backend, workspace, displayFormRef, elements, hiddenElementsInfo);
        return new InMemoryPaging(resolvedElements, limit, offset);
    }
    let loader = backend.workspace(workspace).attributes().elements().forDisplayForm(displayFormRef);
    const loaderOptions = {};
    if (limit) {
        loader = loader.withLimit(limit);
    }
    if (offset) {
        loader = loader.withOffset(offset);
    }
    if (search) {
        loaderOptions.filter = search;
    }
    if (excludePrimaryLabel && !isElementUrisSupported(backend)) {
        loaderOptions.excludePrimaryLabel = true;
    }
    if (elements) {
        loaderOptions.elements =
            !isElementUrisSupported(backend) && !isValueBasedElementsQueryOptionsElements(elements)
                ? { primaryValues: elements.uris }
                : elements;
    }
    if (order) {
        loaderOptions.order = order;
    }
    if (includeTotalCountWithoutFilters) {
        loaderOptions.includeTotalCountWithoutFilters = includeTotalCountWithoutFilters;
    }
    if (!isEmpty(loaderOptions)) {
        loader = loader.withOptions(loaderOptions);
    }
    if (limitingDateFilters === null || limitingDateFilters === void 0 ? void 0 : limitingDateFilters.length) {
        loader = loader.withDateFilters(limitingDateFilters);
    }
    const effectiveLimitingAttributeFilters = getLimitingAttributeFilters(displayFormRef, limitingAttributeFilters, hiddenElementsInfo.hiddenElements, hiddenElementsInfo.attribute);
    if (effectiveLimitingAttributeFilters.length) {
        loader = loader.withAttributeFilters(effectiveLimitingAttributeFilters);
    }
    if (limitingMeasures === null || limitingMeasures === void 0 ? void 0 : limitingMeasures.length) {
        loader = loader.withMeasures(limitingMeasures);
    }
    if (signal) {
        loader.withSignal(signal);
    }
    return loader.query().catch((error) => {
        throw convertError(error);
    });
}
export const isElementUrisSupported = (backend) => !!backend.capabilities.supportsElementUris;
function getLimitingAttributeFilters(displayFormRef, limitingAttributeFilters, hiddenElements, attribute) {
    if (attributeElementsIsEmpty(hiddenElements)) {
        return limitingAttributeFilters !== null && limitingAttributeFilters !== void 0 ? limitingAttributeFilters : [];
    }
    // add a virtual parent filter to get rid of the hidden elements
    // this is the only way that does not mess up offsets since it is handled by the server "natively"
    const hiddenElementsVirtualFilter = {
        attributeFilter: newNegativeAttributeFilter(displayFormRef, hiddenElements),
        overAttribute: attribute.ref,
    };
    return [hiddenElementsVirtualFilter, ...(limitingAttributeFilters !== null && limitingAttributeFilters !== void 0 ? limitingAttributeFilters : [])];
}
//# sourceMappingURL=loadElementsFromBackend.js.map