// (C) 2021-2022 GoodData Corporation
import { call, put, select } from "redux-saga/effects";
import { invariant } from "ts-invariant";
import { invalidArgumentsProvided } from "../../../events/general.js";
import { attributeFilterParentChanged } from "../../../events/filters.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { selectAttributeFilterDisplayFormsMap, selectFilterContextAttributeFilterByLocalId, selectFilterContextAttributeFilters, } from "../../../store/filterContext/filterContextSelectors.js";
import { validateAttributeFilterParents } from "./validation/parentFiltersValidation.js";
import { dispatchFilterContextChanged } from "../common.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
export function* setAttributeFilterParentsHandler(ctx, cmd) {
    const { filterLocalId, parentFilters } = cmd.payload;
    const allFilters = yield select(selectFilterContextAttributeFilters);
    const affectedFilter = yield select(selectFilterContextAttributeFilterByLocalId(filterLocalId));
    const displayFormsMap = yield select(selectAttributeFilterDisplayFormsMap);
    if (!affectedFilter) {
        throw invalidArgumentsProvided(ctx, cmd, `Filter with localId ${filterLocalId} was not found.`);
    }
    const validationResult = yield call(validateAttributeFilterParents, ctx, affectedFilter, [...parentFilters], allFilters, displayFormsMap);
    if (validationResult !== "VALID") {
        const message = validationResult === "EXTRANEOUS_PARENT"
            ? "Some of the parents provided cannot be used because filters for those are not in the filters collection. " +
                "Only existing filters can be used as parent filters."
            : validationResult === "INVALID_METADATA"
                ? "Some of the parents provided cannot be used because the 'metadata' for parent filter are missing."
                : "Some of the parents provided cannot be used because the 'over' parameter is invalid for the target filter.";
        throw invalidArgumentsProvided(ctx, cmd, message);
    }
    yield put(filterContextActions.setAttributeFilterParents({
        filterLocalId,
        parentFilters,
    }));
    const changedFilter = yield select(selectFilterContextAttributeFilterByLocalId(filterLocalId));
    invariant(changedFilter, "Inconsistent state in attributeFilterSetParentCommandHandler");
    yield dispatchDashboardEvent(attributeFilterParentChanged(ctx, changedFilter, cmd.correlationId));
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
//# sourceMappingURL=setAttributeFilterParentHandler.js.map