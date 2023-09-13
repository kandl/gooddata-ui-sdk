import { SagaIterator } from "redux-saga";
import { ChangeDateFilterSelection } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function changeDateFilterSelectionHandler(ctx: DashboardContext, cmd: ChangeDateFilterSelection): SagaIterator<void>;
