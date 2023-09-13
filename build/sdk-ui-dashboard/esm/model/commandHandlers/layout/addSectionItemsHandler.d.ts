import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { AddSectionItems } from "../../commands/index.js";
import { DashboardLayoutSectionItemsAdded } from "../../events/layout.js";
export declare function addSectionItemsHandler(ctx: DashboardContext, cmd: AddSectionItems): SagaIterator<DashboardLayoutSectionItemsAdded>;
