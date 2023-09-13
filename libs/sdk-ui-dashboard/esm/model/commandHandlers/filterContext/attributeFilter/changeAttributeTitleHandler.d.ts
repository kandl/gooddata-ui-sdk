import { SagaIterator } from "redux-saga";
import { SetAttributeFilterTitle } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function changeAttributeTitleHandler(ctx: DashboardContext, cmd: SetAttributeFilterTitle): SagaIterator<void>;
