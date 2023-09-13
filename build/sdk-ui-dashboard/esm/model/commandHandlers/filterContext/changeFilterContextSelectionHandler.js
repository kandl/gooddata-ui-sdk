// (C) 2021-2023 GoodData Corporation
import { all, call, put, select } from "redux-saga/effects";
import { filterContextActions } from "../../store/filterContext/index.js";
import { selectFilterContextAttributeFilterByDisplayForm, selectFilterContextAttributeFilters, } from "../../store/filterContext/filterContextSelectors.js";
import { batchActions } from "redux-batched-actions";
import { canApplyDateFilter, dispatchFilterContextChanged } from "./common.js";
import partition from "lodash/partition.js";
import uniqBy from "lodash/uniqBy.js";
import compact from "lodash/compact.js";
import { objRefToString, isUriRef, isAllTimeDashboardDateFilter, isDashboardAttributeFilter, isDashboardDateFilter, updateAttributeElementsItems, getAttributeElementsItems, attributeElementsIsEmpty, isSingleSelectionFilter, isAttributeFilter, isNegativeAttributeFilter, filterObjRef, filterAttributeElements, isAbsoluteDateFilter, newAbsoluteDashboardDateFilter, isAllTimeDateFilter, newAllTimeDashboardDateFilter, isRelativeDateFilter, newRelativeDashboardDateFilter, } from "@gooddata/sdk-model";
import { NotSupported } from "@gooddata/sdk-backend-spi";
import { resolveDisplayFormMetadata } from "../../utils/displayFormResolver.js";
import { resolveAttributeMetadata } from "../../utils/attributeResolver.js";
function dashboardFilterToFilterContextItem(filter) {
    if (isAttributeFilter(filter)) {
        return {
            attributeFilter: {
                negativeSelection: isNegativeAttributeFilter(filter),
                displayForm: filterObjRef(filter),
                attributeElements: filterAttributeElements(filter),
                selectionMode: "multi",
            },
        };
    }
    else if (isAbsoluteDateFilter(filter)) {
        return newAbsoluteDashboardDateFilter(filter.absoluteDateFilter.from, filter.absoluteDateFilter.to);
    }
    else if (isAllTimeDateFilter(filter)) {
        return newAllTimeDashboardDateFilter();
    }
    else if (isRelativeDateFilter(filter)) {
        return newRelativeDashboardDateFilter(filter.relativeDateFilter.granularity, filter.relativeDateFilter.from, filter.relativeDateFilter.to);
    }
    throw new NotSupported("Unsupported filter type! Please provide valid dashboard filter.");
}
export function* changeFilterContextSelectionHandler(ctx, cmd) {
    const { filters, resetOthers } = cmd.payload;
    const normalizedFilters = filters.map((filter) => {
        if (isDashboardAttributeFilter(filter) || isDashboardDateFilter(filter)) {
            return filter;
        }
        else {
            return dashboardFilterToFilterContextItem(filter);
        }
    });
    const uniqueFilters = uniqBy(normalizedFilters, (filter) => {
        const identification = isDashboardAttributeFilter(filter)
            ? filter.attributeFilter.displayForm
            : filter.dateFilter.dataSet;
        return identification ? objRefToString(identification) : identification;
    });
    const [[dateFilter], attributeFilters] = partition(uniqueFilters, isDashboardDateFilter);
    const [attributeFilterUpdateActions, dateFilterUpdateActions] = yield all([
        call(getAttributeFiltersUpdateActions, attributeFilters, resetOthers, ctx),
        call(getDateFilterUpdateActions, dateFilter, resetOthers),
    ]);
    yield put(batchActions([...attributeFilterUpdateActions, ...dateFilterUpdateActions]));
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
function* getAttributeFiltersUpdateActions(attributeFilters, resetOthers, ctx) {
    var _a;
    const updateActions = [];
    const handledLocalIds = new Set();
    const resolvedDisplayForms = yield call(resolveDisplayFormMetadata, ctx, attributeFilters.map((af) => af.attributeFilter.displayForm));
    for (const attributeFilter of attributeFilters) {
        const filterRef = attributeFilter.attributeFilter.displayForm;
        let dashboardFilter = yield select(selectFilterContextAttributeFilterByDisplayForm(filterRef));
        if (!dashboardFilter && canMapDashboardFilterFromAnotherDisplayForm(ctx)) {
            if (isUriRef(filterRef) && !ctx.backend.capabilities.supportsObjectUris) {
                throw new NotSupported("Unsupported filter ObjRef! Please provide IdentifierRef instead of UriRef.");
            }
            const filterDF = resolvedDisplayForms.resolved.get(filterRef);
            const resolvedAttribute = yield call(resolveAttributeMetadata, ctx, compact([filterDF === null || filterDF === void 0 ? void 0 : filterDF.attribute]));
            const attribute = (filterDF === null || filterDF === void 0 ? void 0 : filterDF.attribute) && resolvedAttribute.resolved.get(filterDF === null || filterDF === void 0 ? void 0 : filterDF.attribute);
            for (const displayForm of (_a = attribute === null || attribute === void 0 ? void 0 : attribute.displayForms) !== null && _a !== void 0 ? _a : []) {
                dashboardFilter = yield select(selectFilterContextAttributeFilterByDisplayForm(displayForm.ref));
                if (dashboardFilter) {
                    break;
                }
            }
        }
        if (dashboardFilter) {
            updateActions.push(filterContextActions.updateAttributeFilterSelection(getAttributeFilterSelectionPayload(attributeFilter, dashboardFilter)));
            handledLocalIds.add(dashboardFilter.attributeFilter.localIdentifier);
        }
    }
    if (resetOthers) {
        const currentAttributeFilters = yield select(selectFilterContextAttributeFilters);
        // for filters that have not been handled by the loop above, create a clear selection actions
        const unhandledFilters = currentAttributeFilters.filter((filter) => !handledLocalIds.has(filter.attributeFilter.localIdentifier));
        if (unhandledFilters.length > 0) {
            updateActions.push(filterContextActions.clearAttributeFiltersSelection({
                filterLocalIds: unhandledFilters.map((filter) => filter.attributeFilter.localIdentifier),
            }));
        }
    }
    return updateActions;
}
function* getDateFilterUpdateActions(dateFilter, resetOthers) {
    if (dateFilter) {
        const canApply = yield call(canApplyDateFilter, dateFilter);
        if (!canApply) {
            return [];
        }
        const upsertPayload = isAllTimeDashboardDateFilter(dateFilter)
            ? { type: "allTime" }
            : {
                type: dateFilter.dateFilter.type,
                granularity: dateFilter.dateFilter.granularity,
                from: dateFilter.dateFilter.from,
                to: dateFilter.dateFilter.to,
            };
        return [filterContextActions.upsertDateFilter(upsertPayload)];
    }
    else if (resetOthers) {
        return [filterContextActions.upsertDateFilter({ type: "allTime" })];
    }
    return [];
}
const getAttributeFilterSelectionPayload = (incomingFilter, currentFilter) => {
    const { attributeElements, negativeSelection } = incomingFilter.attributeFilter;
    const attributeFilterSelectionPayload = {
        elements: attributeElements,
        filterLocalId: currentFilter.attributeFilter.localIdentifier,
        negativeSelection: negativeSelection,
    };
    if (isSingleSelectionFilter(currentFilter)) {
        if (negativeSelection) {
            return Object.assign(Object.assign({}, attributeFilterSelectionPayload), { elements: updateAttributeElementsItems(attributeElements, []), negativeSelection: false });
        }
        if (!attributeElementsIsEmpty(attributeElements)) {
            const attributeElementsValues = getAttributeElementsItems(attributeElements);
            const singleSelectAttributeElements = [attributeElementsValues[0]];
            return Object.assign(Object.assign({}, attributeFilterSelectionPayload), { elements: updateAttributeElementsItems(attributeElements, singleSelectAttributeElements) });
        }
    }
    return attributeFilterSelectionPayload;
};
/**
 *  For Bear:
 *  Attribute element in Bear can be matched because Bear utilizes a unique URI to identify each attribute element.
 *  This URI remains constant regardless of the attribute label (the URI points to the attribute URI rather than the label URI).
 *  In Bear, there are duplicate values, and each label contains the same number of element values.
 *  As a result, we can easily map one value from one label to another, and enabling us to determine the customer's intended selection
 *
 *  For Tiger/Panther:
 *  Attribute elements in Tiger/Panther are referenced solely by the values that the user sees. There is no URI like in Bear.
 *  Only the display value is available in Tiger/Panther. Additionally, Tiger only displays unique values for each label.
 *  In Tiger/Panther, you may observe a varying number of element values in the labels if duplicates are present.
 *  Therefore, mapping one value from one label to another is not straightforward, as it can be mapped to multiple values,
 *  and it is not always possible to ascertain the customer's intended selection.
 */
function canMapDashboardFilterFromAnotherDisplayForm(ctx) {
    return ctx.backend.capabilities.supportsElementUris;
}
//# sourceMappingURL=changeFilterContextSelectionHandler.js.map