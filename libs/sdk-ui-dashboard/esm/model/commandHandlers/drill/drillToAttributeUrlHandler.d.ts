import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { DrillToAttributeUrl } from "../../commands/drill.js";
import { DashboardDrillToAttributeUrlResolved } from "../../events/drill.js";
export declare function drillToAttributeUrlHandler(ctx: DashboardContext, cmd: DrillToAttributeUrl): SagaIterator<DashboardDrillToAttributeUrlResolved>;
