// (C) 2022 GoodData Corporation
import { put } from "redux-saga/effects";
import { dateFilterValidationFailed } from "../../../events/dashboard.js";
import { dispatchDashboardEvent } from "../../../store/_infra/eventDispatcher.js";
import { dateFilterConfigActions } from "../../../store/dateFilterConfig/index.js";
export function* onDateFilterConfigValidationError(ctx, validationResult, correlationId) {
    yield dispatchDashboardEvent(dateFilterValidationFailed(ctx, validationResult, correlationId));
    yield put(dateFilterConfigActions.addDateFilterConfigValidationWarning(validationResult));
}
//# sourceMappingURL=onDateFilterConfigValidationError.js.map