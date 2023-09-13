import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeRenderMode } from "../../commands/index.js";
import { DashboardRenderModeChanged } from "../../events/index.js";
export declare function changeRenderModeHandler(ctx: DashboardContext, cmd: ChangeRenderMode): SagaIterator<DashboardRenderModeChanged>;
