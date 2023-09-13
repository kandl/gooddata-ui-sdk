import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../../types/commonTypes.js";
import { IDrillTargets } from "../../../store/drillTargets/drillTargetsTypes.js";
import { ObjRefMap } from "../../../../_staging/metadata/objRefMap.js";
import { ObjRef, InsightDrillDefinition, IListedDashboard } from "@gooddata/sdk-model";
import { IDashboardCommand } from "../../../commands/index.js";
import { InsightResolutionResult } from "../../../utils/insightResolver.js";
import { DisplayFormResolutionResult } from "../../../utils/displayFormResolver.js";
import { IInaccessibleDashboard } from "../../../types/inaccessibleDashboardTypes.js";
export declare function validateDrillDefinition(drillDefinition: InsightDrillDefinition, validationData: DrillDefinitionValidationData, ctx: DashboardContext, cmd: IDashboardCommand): InsightDrillDefinition;
export interface DrillDefinitionValidationData {
    drillTargets: IDrillTargets | undefined;
    resolvedInsights: InsightResolutionResult;
    resolvedDisplayForms: DisplayFormResolutionResult;
    accessibleDashboardMap: ObjRefMap<IListedDashboard>;
    inaccessibleDashboardsMap: ObjRefMap<IInaccessibleDashboard>;
}
export declare function getValidationData(widgetRef: ObjRef, drillsToModify: InsightDrillDefinition[], ctx: DashboardContext): SagaIterator<DrillDefinitionValidationData>;
