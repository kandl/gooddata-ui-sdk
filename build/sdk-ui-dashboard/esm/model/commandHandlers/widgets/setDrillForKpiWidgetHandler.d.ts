import { DashboardContext } from "../../types/commonTypes.js";
import { SetDrillForKpiWidget } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardKpiWidgetDrillSet } from "../../events/kpi.js";
export declare function setDrillForKpiWidgetHandler(ctx: DashboardContext, cmd: SetDrillForKpiWidget): SagaIterator<DashboardKpiWidgetDrillSet>;
