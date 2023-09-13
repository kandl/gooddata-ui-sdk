import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeInsightWidgetVisProperties } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetVisPropertiesChanged } from "../../events/index.js";
export declare function changeInsightWidgetVisPropertiesHandler(ctx: DashboardContext, cmd: ChangeInsightWidgetVisProperties): SagaIterator<DashboardInsightWidgetVisPropertiesChanged>;
