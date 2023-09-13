import { DateFilterValidationResult } from "../../../../types.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function onDateFilterConfigValidationError(ctx: DashboardContext, validationResult: DateFilterValidationResult, correlationId?: string): Generator<import("redux-saga/effects").PutEffect<import("../../../index.js").IDashboardEvent<any> | import("../../../index.js").ICustomDashboardEvent<any>> | import("redux-saga/effects").PutEffect<{
    payload: DateFilterValidationResult;
    type: "dateFilterConfig/addDateFilterConfigValidationWarning";
}>, void, unknown>;
