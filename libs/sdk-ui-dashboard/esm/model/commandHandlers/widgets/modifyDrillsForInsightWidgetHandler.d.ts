import { DashboardContext } from "../../types/commonTypes.js";
import { ModifyDrillsForInsightWidget } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetDrillsModified } from "../../events/insight.js";
export declare function modifyDrillsForInsightWidgetHandler(ctx: DashboardContext, cmd: ModifyDrillsForInsightWidget): SagaIterator<DashboardInsightWidgetDrillsModified>;
