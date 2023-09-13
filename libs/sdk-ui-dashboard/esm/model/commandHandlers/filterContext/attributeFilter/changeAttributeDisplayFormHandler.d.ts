import { SagaIterator } from "redux-saga";
import { SetAttributeFilterDisplayForm } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function changeAttributeDisplayFormHandler(ctx: DashboardContext, cmd: SetAttributeFilterDisplayForm): SagaIterator<void>;
