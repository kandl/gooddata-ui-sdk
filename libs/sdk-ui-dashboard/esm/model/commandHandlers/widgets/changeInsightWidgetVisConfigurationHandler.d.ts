import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeInsightWidgetVisConfiguration } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetVisConfigurationChanged } from "../../events/index.js";
export declare function changeInsightWidgetVisConfigurationHandler(ctx: DashboardContext, cmd: ChangeInsightWidgetVisConfiguration): SagaIterator<DashboardInsightWidgetVisConfigurationChanged>;
