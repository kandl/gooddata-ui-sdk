// (C) 2021 GoodData Corporation
import { getContext } from "redux-saga/effects";
/**
 * Gets the public dashboard context stored inside redux-saga context.
 */
export function* getDashboardContext() {
    return yield getContext("dashboardContext");
}
/**
 * Gets the private dashboard context stored inside redux-saga context.
 */
export function* getPrivateContext() {
    return yield getContext("privateContext");
}
//# sourceMappingURL=contexts.js.map