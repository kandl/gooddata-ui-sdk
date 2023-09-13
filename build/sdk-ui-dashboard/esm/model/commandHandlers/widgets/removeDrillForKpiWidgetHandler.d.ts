import { DashboardContext } from "../../types/commonTypes.js";
import { RemoveDrillForKpiWidget } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardKpiWidgetDrillRemoved } from "../../events/kpi.js";
export declare function removeDrillForKpiWidgetHandler(ctx: DashboardContext, cmd: RemoveDrillForKpiWidget): SagaIterator<DashboardKpiWidgetDrillRemoved>;
