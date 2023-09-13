import { SagaIterator } from "redux-saga";
import { SetAttributeFilterSelectionMode } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function changeAttributeSelectionModeHandler(ctx: DashboardContext, cmd: SetAttributeFilterSelectionMode): SagaIterator<void>;
