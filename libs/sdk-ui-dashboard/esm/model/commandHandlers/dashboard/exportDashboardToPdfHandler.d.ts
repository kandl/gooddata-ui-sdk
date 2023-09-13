import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { ExportDashboardToPdf } from "../../commands/index.js";
import { DashboardExportToPdfResolved } from "../../events/dashboard.js";
export declare function exportDashboardToPdfHandler(ctx: DashboardContext, cmd: ExportDashboardToPdf): SagaIterator<DashboardExportToPdfResolved>;
