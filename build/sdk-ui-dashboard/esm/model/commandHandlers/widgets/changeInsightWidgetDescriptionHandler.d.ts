import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeInsightWidgetDescription } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardInsightWidgetDescriptionChanged } from "../../events/index.js";
export declare function changeInsightWidgetDescriptionHandler(ctx: DashboardContext, cmd: ChangeInsightWidgetDescription): SagaIterator<DashboardInsightWidgetDescriptionChanged>;
