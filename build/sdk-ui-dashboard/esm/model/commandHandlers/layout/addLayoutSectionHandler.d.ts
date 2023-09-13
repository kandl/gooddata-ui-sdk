import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { AddLayoutSection } from "../../commands/index.js";
import { DashboardLayoutSectionAdded } from "../../events/layout.js";
export declare function addLayoutSectionHandler(ctx: DashboardContext, cmd: AddLayoutSection): SagaIterator<DashboardLayoutSectionAdded>;
