import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeKpiWidgetHeader } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardKpiWidgetHeaderChanged } from "../../events/index.js";
export declare function changeKpiWidgetHeaderHandler(ctx: DashboardContext, cmd: ChangeKpiWidgetHeader): SagaIterator<DashboardKpiWidgetHeaderChanged>;
