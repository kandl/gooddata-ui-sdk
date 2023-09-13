import { SagaIterator } from "redux-saga";
import { ExportInsightWidget } from "../../commands/index.js";
import { DashboardInsightWidgetExportResolved } from "../../events/insight.js";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function exportInsightWidgetHandler(ctx: DashboardContext, cmd: ExportInsightWidget): SagaIterator<DashboardInsightWidgetExportResolved>;
