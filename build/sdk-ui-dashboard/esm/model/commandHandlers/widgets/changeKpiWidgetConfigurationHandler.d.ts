import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeKpiWidgetConfiguration } from "../../commands/index.js";
import { SagaIterator } from "redux-saga";
import { DashboardKpiWidgetConfigurationChanged } from "../../events/index.js";
export declare function changeKpiWidgetConfigurationHandler(ctx: DashboardContext, cmd: ChangeKpiWidgetConfiguration): SagaIterator<DashboardKpiWidgetConfigurationChanged>;
