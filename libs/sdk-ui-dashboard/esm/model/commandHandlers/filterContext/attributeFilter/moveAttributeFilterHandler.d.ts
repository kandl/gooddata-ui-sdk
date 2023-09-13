import { SagaIterator } from "redux-saga";
import { MoveAttributeFilter } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function moveAttributeFilterHandler(ctx: DashboardContext, cmd: MoveAttributeFilter): SagaIterator<void>;
