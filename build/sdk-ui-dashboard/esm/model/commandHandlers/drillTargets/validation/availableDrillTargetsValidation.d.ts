import { DashboardContext } from "../../../types/commonTypes.js";
import { IDashboardCommand } from "../../../commands/index.js";
import { IAvailableDrillTargets } from "@gooddata/sdk-ui";
export declare function availableDrillTargetsValidation(availableDrillTargets: IAvailableDrillTargets, enableKPIDashboardDrillFromAttribute: boolean, ctx: DashboardContext, cmd: IDashboardCommand): IAvailableDrillTargets;
