import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeInsightWidgetInsight } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetInsightSwitched } from "../../events/index.js";
export declare function changeInsightWidgetInsightHandler(ctx: DashboardContext, cmd: ChangeInsightWidgetInsight): SagaIterator<DashboardInsightWidgetInsightSwitched>;
