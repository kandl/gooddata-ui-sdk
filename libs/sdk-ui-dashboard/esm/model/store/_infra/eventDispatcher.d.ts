import { PutEffect } from "redux-saga/effects";
import { ICustomDashboardEvent, IDashboardEvent } from "../../events/base.js";
/**
 * Creates an effect which will dispatch the provided event. Yield whatever this function returns
 *
 * @param event - event to dispatch
 */
export declare function dispatchDashboardEvent(event: IDashboardEvent | ICustomDashboardEvent): PutEffect<IDashboardEvent | ICustomDashboardEvent>;
