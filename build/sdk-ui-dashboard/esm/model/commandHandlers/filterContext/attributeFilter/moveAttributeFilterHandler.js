// (C) 2021 GoodData Corporation
import { call, put, select } from "redux-saga/effects";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { attributeFilterMoved } from "../../../events/filters.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { selectFilterContextAttributeFilterByLocalId, selectFilterContextAttributeFilterIndexByLocalId, selectFilterContextFilters, } from "../../../store/filterContext/filterContextSelectors.js";
import { dispatchFilterContextChanged } from "../common.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
export function* moveAttributeFilterHandler(ctx, cmd) {
    const { filterLocalId, index } = cmd.payload;
    // validate filterLocalId
    const affectedFilter = yield select(selectFilterContextAttributeFilterByLocalId(filterLocalId));
    if (!affectedFilter) {
        throw invalidArgumentsProvided(ctx, cmd, `Filter with filterLocalId ${filterLocalId} not found.`);
    }
    // validate target index
    const allFilters = yield select(selectFilterContextFilters);
    const maximalTargetIndex = allFilters.length - 1;
    if (index > maximalTargetIndex || index < -1) {
        throw invalidArgumentsProvided(ctx, cmd, `Invalid index (${index}) provided, it must be between -1 and ${maximalTargetIndex}`);
    }
    const originalIndex = yield select(selectFilterContextAttributeFilterIndexByLocalId(filterLocalId));
    yield put(filterContextActions.moveAttributeFilter({
        filterLocalId,
        index,
    }));
    const finalIndex = yield select(selectFilterContextAttributeFilterIndexByLocalId(filterLocalId));
    yield dispatchDashboardEvent(attributeFilterMoved(ctx, affectedFilter, originalIndex, finalIndex, cmd.correlationId));
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
//# sourceMappingURL=moveAttributeFilterHandler.js.map