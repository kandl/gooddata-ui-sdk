import { IDashboardCommand, RemoveDrillsSelector } from "../../../commands/index.js";
import { DashboardContext } from "../../../types/commonTypes.js";
import { InsightDrillDefinition } from "@gooddata/sdk-model";
export declare function validateRemoveDrillsByOrigins(drillSelector: RemoveDrillsSelector, drills: InsightDrillDefinition[], ctx: DashboardContext, cmd: IDashboardCommand): InsightDrillDefinition[];
