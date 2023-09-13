// (C) 2022-2023 GoodData Corporation
import { useCallback, useEffect } from "react";
import isEqual from "lodash/isEqual.js";
import debounce from "lodash/debounce.js";
import { filterAttributeElements, isAttributeElementsByRef, isAttributeElementsByValue, isNegativeAttributeFilter, } from "@gooddata/sdk-model";
import { useBackendStrict, useWorkspaceStrict, UnexpectedSdkError } from "@gooddata/sdk-ui";
import { useResolveFilterInput } from "./useResolveFilterInput.js";
import { useResolveParentFiltersInput } from "./useResolveParentFiltersInput.js";
import { useAttributeFilterHandler } from "./useAttributeFilterHandler.js";
import { useAttributeFilterControllerData } from "./useAttributeFilterControllerData.js";
import { PARENT_FILTERS_CORRELATION, RESET_CORRELATION, SEARCH_CORRELATION } from "./constants.js";
import { isValidSingleSelectionFilter } from "../utils.js";
import isEmpty from "lodash/isEmpty.js";
/**
 * UseAttributeFilterController hook is responsible for initialization of AttributeFilterHandler {@link IMultiSelectAttributeFilterHandler} Core API for Attribute Filter components
 *
 * @remarks
 * You can access AttributeFilter state and callbacks ({@link AttributeFilterController})
 *
 * This is the best option if you need to implement fully custom UI for the attribute filter. This option requires a bit more coding, but you have a full control over the UI.
 * It has identical convenient API as AttributeFilter component - same input props and same output props that are available in the internal context of the AttributeFilter component.
 * It works out of the box with other UI.SDK things - {@link @gooddata/sdk-ui#BackendProvider}, {@link @gooddata/sdk-ui#WorkspaceProvider} and visualization definition placeholders.
 *
 * @public
 */
export const useAttributeFilterController = (props) => {
    const { backend: backendInput, workspace: workspaceInput, filter: filterInput, connectToPlaceholder, parentFilters, parentFilterOverAttribute, resetOnParentFilterChange = true, onApply, onError, hiddenElements, staticElements, elementsOptions, selectionMode = "multi", selectFirst = false, attribute, } = props;
    const backend = useBackendStrict(backendInput, "AttributeFilter");
    const workspace = useWorkspaceStrict(workspaceInput, "AttributeFilter");
    const { filter, setConnectedPlaceholderValue } = useResolveFilterInput(filterInput, connectToPlaceholder);
    const limitingAttributeFilters = useResolveParentFiltersInput(parentFilters, parentFilterOverAttribute);
    const handler = useAttributeFilterHandler({
        backend,
        filter,
        workspace,
        hiddenElements,
        staticElements,
        attribute,
    });
    const attributeFilterControllerData = useAttributeFilterControllerData(handler);
    const forcedInitErrorProp = isValidSingleSelectionFilter(selectionMode, filter, limitingAttributeFilters)
        ? {}
        : { initError: new UnexpectedSdkError() };
    useOnError(handler, { onError });
    useInitOrReload(handler, {
        filter,
        limitingAttributeFilters,
        limit: elementsOptions === null || elementsOptions === void 0 ? void 0 : elementsOptions.limit,
        onApply,
        setConnectedPlaceholderValue,
        resetOnParentFilterChange,
        selectionMode,
    });
    const callbacks = useCallbacks(handler, { onApply, setConnectedPlaceholderValue, selectionMode });
    useSingleSelectModeHandler(handler, {
        selectFirst,
        onApply: callbacks.onApply,
        selectionMode,
    });
    return Object.assign(Object.assign(Object.assign({}, attributeFilterControllerData), callbacks), forcedInitErrorProp);
};
//
function useOnError(handler, props) {
    const { onError } = props;
    useEffect(() => {
        function handleError(payload) {
            onError === null || onError === void 0 ? void 0 : onError(payload.error);
        }
        const callbackUnsubscribeFunctions = [
            handler.onInitError(handleError),
            handler.onLoadAttributeError(handleError),
            handler.onLoadInitialElementsPageError(handleError),
            handler.onLoadNextElementsPageError(handleError),
            handler.onLoadCustomElementsError(handleError),
        ];
        return () => {
            callbackUnsubscribeFunctions.forEach((unsubscribe) => {
                unsubscribe();
            });
        };
    }, [handler, onError]);
}
//
function useInitOrReload(handler, props) {
    const { filter, limitingAttributeFilters, limit, resetOnParentFilterChange, setConnectedPlaceholderValue, onApply, selectionMode, } = props;
    useEffect(() => {
        if (limitingAttributeFilters.length > 0) {
            handler.setLimitingAttributeFilters(limitingAttributeFilters);
        }
        if (limit) {
            handler.setLimit(limit);
        }
        handler.init();
        // Change of the parent filters is resolved in the useEffect bellow,
        // it does not need full reinit.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handler]);
    useEffect(() => {
        const limitingAttributesChanged = !isEqual(limitingAttributeFilters, handler.getLimitingAttributeFilters());
        const filterChanged = !isEqual(filter, handler.getFilter());
        const props = {
            filter,
            limitingAttributeFilters,
            limitingAttributesChanged,
            filterChanged,
            setConnectedPlaceholderValue,
            onApply,
            selectionMode,
        };
        const change = resetOnParentFilterChange
            ? updateAutomaticResettingFilter(handler, props)
            : updateNonResettingFilter(handler, props);
        refreshByType(handler, change);
    }, [
        filter,
        limitingAttributeFilters,
        resetOnParentFilterChange,
        handler,
        onApply,
        setConnectedPlaceholderValue,
        selectionMode,
    ]);
}
function updateNonResettingFilter(handler, { filter, limitingAttributeFilters, limitingAttributesChanged, filterChanged, setConnectedPlaceholderValue, }) {
    if (limitingAttributesChanged || filterChanged) {
        const elements = filterAttributeElements(filter);
        const keys = isAttributeElementsByValue(elements) ? elements.values : elements.uris;
        const isInverted = isNegativeAttributeFilter(filter);
        handler.changeSelection({ keys, isInverted });
        handler.setLimitingAttributeFilters(limitingAttributeFilters);
        handler.commitSelection();
        const nextFilter = handler.getFilter();
        setConnectedPlaceholderValue(nextFilter);
        if (limitingAttributesChanged) {
            return "init-parent";
        }
        return "init-self";
    }
    return undefined;
}
function updateAutomaticResettingFilter(handler, { filter, limitingAttributeFilters, limitingAttributesChanged, filterChanged, setConnectedPlaceholderValue, onApply, selectionMode, }) {
    var _a;
    if (limitingAttributesChanged) {
        handler.changeSelection({ keys: [], isInverted: selectionMode !== "single" });
        handler.setLimitingAttributeFilters(limitingAttributeFilters);
        // the next lines are to apply selection to the state of the parent component to make the
        // new attribute filter state persistent
        handler.commitSelection();
        //if filters are controlled from outside, do not call this kind of update because is already updated by controlled app
        const nextFilter = handler.getFilter();
        const isInverted = (_a = handler.getCommittedSelection()) === null || _a === void 0 ? void 0 : _a.isInverted;
        setConnectedPlaceholderValue(nextFilter);
        onApply === null || onApply === void 0 ? void 0 : onApply(nextFilter, isInverted);
        return "init-parent";
    }
    if (filterChanged) {
        const elements = filterAttributeElements(filter);
        const keys = isAttributeElementsByValue(elements) ? elements.values : elements.uris;
        const isInverted = isNegativeAttributeFilter(filter);
        handler.changeSelection({ keys, isInverted });
        handler.commitSelection();
        return "init-self";
    }
    return undefined;
}
function refreshByType(handler, change) {
    if (change === "init-parent") {
        if (handler.getInitStatus() !== "success") {
            handler.init(PARENT_FILTERS_CORRELATION);
        }
        else {
            handler.initTotalCount(PARENT_FILTERS_CORRELATION);
            handler.loadInitialElementsPage(PARENT_FILTERS_CORRELATION);
        }
    }
    if (change === "init-self") {
        handler.init();
    }
}
//
function useCallbacks(handler, props) {
    const { onApply: onApplyInput, setConnectedPlaceholderValue, selectionMode } = props;
    const onSelect = useCallback((selectedItems, isInverted) => {
        const attributeFilter = handler.getFilter();
        const isElementsByRef = isAttributeElementsByRef(filterAttributeElements(attributeFilter));
        const keys = selectedItems.map((item) => (isElementsByRef ? item.uri : item.title));
        handler.changeSelection({ keys, isInverted });
    }, [handler]);
    // Rule is not working with debounce
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onSearch = useCallback(debounce((search) => {
        if (handler.getSearch() !== search) {
            handler.setSearch(search);
            handler.loadInitialElementsPage(SEARCH_CORRELATION);
        }
    }, 200), [handler]);
    const onLoadNextElementsPage = useCallback(() => {
        handler.loadNextElementsPage();
    }, [handler]);
    const onReset = useCallback(() => {
        handler.revertSelection();
        if (handler.getSearch().length > 0) {
            handler.setSearch("");
            handler.loadInitialElementsPage(RESET_CORRELATION);
        }
    }, [handler]);
    const onApply = useCallback(() => {
        var _a;
        handler.commitSelection();
        const nextFilter = handler.getFilter();
        const isInverted = (_a = handler.getCommittedSelection()) === null || _a === void 0 ? void 0 : _a.isInverted;
        setConnectedPlaceholderValue(nextFilter);
        onApplyInput === null || onApplyInput === void 0 ? void 0 : onApplyInput(nextFilter, isInverted, selectionMode);
    }, [onApplyInput, setConnectedPlaceholderValue, handler, selectionMode]);
    return {
        onApply,
        onLoadNextElementsPage,
        onSearch,
        onSelect,
        onReset,
    };
}
//
const useSingleSelectModeHandler = (handler, props) => {
    const { selectFirst, selectionMode, onApply } = props;
    const committedSelectionKeys = handler.getCommittedSelection().keys;
    const initialElementsPageStatus = handler.getInitialElementsPageStatus();
    const elements = handler.getAllElements();
    const filter = handler.getFilter();
    useEffect(() => {
        if (selectFirst &&
            selectionMode === "single" &&
            isEmpty(committedSelectionKeys) &&
            initialElementsPageStatus === "success" &&
            !isEmpty(elements)) {
            const isElementsByRef = isAttributeElementsByRef(filterAttributeElements(filter));
            const keys = [isElementsByRef ? elements[0].uri : elements[0].title];
            handler.changeSelection({ keys, isInverted: false });
            handler.commitSelection();
            onApply();
        }
    }, [
        selectFirst,
        selectionMode,
        committedSelectionKeys,
        initialElementsPageStatus,
        elements,
        filter,
        handler,
        onApply,
    ]);
};
//# sourceMappingURL=useAttributeFilterController.js.map