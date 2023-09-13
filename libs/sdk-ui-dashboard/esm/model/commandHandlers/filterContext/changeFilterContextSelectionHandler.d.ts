import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeFilterContextSelection } from "../../commands/index.js";
export declare function changeFilterContextSelectionHandler(ctx: DashboardContext, cmd: ChangeFilterContextSelection): SagaIterator<void>;
