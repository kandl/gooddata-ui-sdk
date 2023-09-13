import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeKpiWidgetComparison } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardKpiWidgetComparisonChanged } from "../../events/index.js";
export declare function changeKpiWidgetComparisonHandler(ctx: DashboardContext, cmd: ChangeKpiWidgetComparison): SagaIterator<DashboardKpiWidgetComparisonChanged>;
