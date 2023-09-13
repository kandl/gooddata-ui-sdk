import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { ChangeDrillableItems } from "../../commands/drill.js";
import { DashboardDrillableItemsChanged } from "../../events/drill.js";
export declare function changeDrillableItemsHandler(ctx: DashboardContext, cmd: ChangeDrillableItems): SagaIterator<DashboardDrillableItemsChanged>;
