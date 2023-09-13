import { IDrillEvent } from "@gooddata/sdk-ui";
import { IDrillToAttributeUrl } from "@gooddata/sdk-model";
import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function resolveDrillToAttributeUrl(drillConfig: IDrillToAttributeUrl, event: IDrillEvent, ctx: DashboardContext): SagaIterator<string | null | undefined>;
