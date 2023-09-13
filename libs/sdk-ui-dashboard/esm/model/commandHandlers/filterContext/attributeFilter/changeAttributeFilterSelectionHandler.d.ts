import { SagaIterator } from "redux-saga";
import { ChangeAttributeFilterSelection } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function changeAttributeFilterSelectionHandler(ctx: DashboardContext, cmd: ChangeAttributeFilterSelection): SagaIterator<void>;
