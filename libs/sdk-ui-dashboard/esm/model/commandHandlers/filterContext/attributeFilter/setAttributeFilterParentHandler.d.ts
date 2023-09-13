import { SagaIterator } from "redux-saga";
import { SetAttributeFilterParents } from "../../../commands/filters.js";
import { DashboardContext } from "../../../types/commonTypes.js";
export declare function setAttributeFilterParentsHandler(ctx: DashboardContext, cmd: SetAttributeFilterParents): SagaIterator<void>;
