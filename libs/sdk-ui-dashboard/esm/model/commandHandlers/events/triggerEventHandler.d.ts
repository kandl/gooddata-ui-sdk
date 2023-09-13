import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { TriggerEvent } from "../../commands/index.js";
export declare function triggerEventHandler(ctx: DashboardContext, cmd: TriggerEvent): SagaIterator<void>;
