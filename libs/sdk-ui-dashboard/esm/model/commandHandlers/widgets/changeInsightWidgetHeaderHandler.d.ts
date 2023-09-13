import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeInsightWidgetHeader } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetHeaderChanged } from "../../events/index.js";
export declare function changeInsightWidgetHeaderHandler(ctx: DashboardContext, cmd: ChangeInsightWidgetHeader): SagaIterator<DashboardInsightWidgetHeaderChanged>;
