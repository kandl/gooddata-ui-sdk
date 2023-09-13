import { DashboardContext } from "../../types/commonTypes.js";
import { RemoveDrillsForInsightWidget } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetDrillsRemoved } from "../../events/insight.js";
export declare function removeDrillsForInsightWidgetHandler(ctx: DashboardContext, cmd: RemoveDrillsForInsightWidget): SagaIterator<DashboardInsightWidgetDrillsRemoved>;
