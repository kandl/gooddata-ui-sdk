import { call, put, select } from "redux-saga/effects";
import { newAbsoluteDashboardDateFilter, newAllTimeDashboardDateFilter, newRelativeDashboardDateFilter, } from "@gooddata/sdk-model";
import toNumber from "lodash/toNumber.js";
import { dateFilterChanged } from "../../../events/filters.js";
import { filterContextActions } from "../../../store/filterContext/index.js";
import { selectFilterContextDateFilter } from "../../../store/filterContext/filterContextSelectors.js";
import { canApplyDateFilter, dispatchFilterContextChanged } from "../common.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
import { invalidArgumentsProvided } from "../../../events/general.js";
export function* changeDateFilterSelectionHandler(ctx, cmd) {
    const isAllTime = cmd.payload.type === "relative" &&
        cmd.payload.granularity === "GDC.time.date" &&
        cmd.payload.from === undefined &&
        cmd.payload.to === undefined;
    const canApply = yield call(canApplyDateFilter, dateFilterSelectionToDateFilter(cmd.payload));
    if (!canApply) {
        throw invalidArgumentsProvided(ctx, cmd, `Cannot apply a date filter that is invalid by the current dateFilterConfig.`);
    }
    yield put(filterContextActions.upsertDateFilter(isAllTime
        ? { type: "allTime" }
        : {
            type: cmd.payload.type,
            granularity: cmd.payload.granularity,
            from: cmd.payload.from,
            to: cmd.payload.to,
        }));
    const affectedFilter = yield select(selectFilterContextDateFilter);
    yield dispatchDashboardEvent(dateFilterChanged(ctx, affectedFilter, cmd.payload.dateFilterOptionLocalId, cmd.correlationId));
    yield call(dispatchFilterContextChanged, ctx, cmd);
}
function dateFilterSelectionToDateFilter(dateFilterSelection) {
    if (dateFilterSelection.type === "absolute" && dateFilterSelection.from && dateFilterSelection.to) {
        return newAbsoluteDashboardDateFilter(dateFilterSelection.from.toString(), dateFilterSelection.to.toString());
    }
    else if (dateFilterSelection.type === "relative" &&
        dateFilterSelection.granularity === "GDC.time.date" &&
        dateFilterSelection.from === undefined &&
        dateFilterSelection.to === undefined) {
        return newAllTimeDashboardDateFilter();
    }
    else {
        return newRelativeDashboardDateFilter(dateFilterSelection.granularity, toNumber(dateFilterSelection.from), toNumber(dateFilterSelection.to));
    }
}
//# sourceMappingURL=changeDateFilterSelectionHandler.js.map