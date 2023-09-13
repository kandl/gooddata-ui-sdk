import { SagaIterator } from "redux-saga";
import { RefreshInsightWidget } from "../../commands/index.js";
import { DashboardContext } from "../../types/commonTypes.js";
import { DashboardInsightWidgetRefreshed } from "../../events/insight.js";
export declare function refreshInsightWidgetHandler(ctx: DashboardContext, cmd: RefreshInsightWidget): SagaIterator<DashboardInsightWidgetRefreshed>;
