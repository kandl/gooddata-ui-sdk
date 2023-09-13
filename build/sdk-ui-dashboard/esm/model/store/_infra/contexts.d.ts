import { SagaIterator } from "redux-saga";
import { DashboardContext, PrivateDashboardContext } from "../../types/commonTypes.js";
/**
 * Gets the public dashboard context stored inside redux-saga context.
 */
export declare function getDashboardContext(): SagaIterator<DashboardContext>;
/**
 * Gets the private dashboard context stored inside redux-saga context.
 */
export declare function getPrivateContext(): SagaIterator<PrivateDashboardContext>;
