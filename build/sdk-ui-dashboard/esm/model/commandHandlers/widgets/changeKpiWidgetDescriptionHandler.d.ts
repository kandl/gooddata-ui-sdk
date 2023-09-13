import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeKpiWidgetDescription } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardKpiWidgetDescriptionChanged } from "../../events/index.js";
export declare function changeKpiWidgetDescriptionHandler(ctx: DashboardContext, cmd: ChangeKpiWidgetDescription): SagaIterator<DashboardKpiWidgetDescriptionChanged>;
