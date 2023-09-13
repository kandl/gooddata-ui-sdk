import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { UpsertExecutionResult } from "../../commands/index.js";
export declare function upsertExecutionResultHandler(_ctx: DashboardContext, cmd: UpsertExecutionResult): SagaIterator<void>;
