// (C) 2021 GoodData Corporation
import { all, call, put, select } from "redux-saga/effects";
import { invariant } from "ts-invariant";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { attributeFilterSelectionChanged } from "../../../events/filters.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { dispatchFilterContextChanged } from "../common.js";
import { selectAttributeFilterDescendants, selectFilterContextAttributeFilterByLocalId, } from "../../../store/filterContext/filterContextSelectors.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
export function* changeAttributeFilterSelectionHandler(ctx, cmd) {
    const { elements, filterLocalId, selectionType } = cmd.payload;
    // validate filterLocalId
    const affectedFilter = yield select(selectFilterContextAttributeFilterByLocalId(cmd.payload.filterLocalId));
    if (!affectedFilter) {
        throw invalidArgumentsProvided(ctx, cmd, `Filter with filterLocalId ${filterLocalId} not found.`);
    }
    yield put(filterContextActions.updateAttributeFilterSelection({
        elements,
        filterLocalId,
        negativeSelection: selectionType === "NOT_IN",
    }));
    const changedFilter = yield select(selectFilterContextAttributeFilterByLocalId(cmd.payload.filterLocalId));
    invariant(changedFilter, "Inconsistent state in attributeFilterChangeSelectionCommandHandler");
    const childFiltersIds = yield select(selectAttributeFilterDescendants(changedFilter.attributeFilter.localIdentifier));
    yield all(childFiltersIds.map((childFilterId) => put(filterContextActions.updateAttributeFilterSelection({
        filterLocalId: childFilterId,
        elements: {
            uris: [],
        },
        negativeSelection: true,
    }))));
    yield dispatchDashboardEvent(attributeFilterSelectionChanged(ctx, changedFilter, cmd.correlationId));
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
//# sourceMappingURL=changeAttributeFilterSelectionHandler.js.map