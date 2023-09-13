import { SagaIterator } from "redux-saga";
import { KpiDrillDefinition } from "@gooddata/sdk-model";
import { DashboardContext } from "../../../types/commonTypes.js";
import { IDashboardCommand } from "../../../commands/index.js";
export declare function validateKpiDrill(drill: KpiDrillDefinition, ctx: DashboardContext, cmd: IDashboardCommand): SagaIterator<void>;
