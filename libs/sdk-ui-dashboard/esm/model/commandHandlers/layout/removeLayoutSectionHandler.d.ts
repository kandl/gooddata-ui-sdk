import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { RemoveLayoutSection } from "../../commands/index.js";
import { DashboardLayoutSectionRemoved } from "../../events/layout.js";
export declare function removeLayoutSectionHandler(ctx: DashboardContext, cmd: RemoveLayoutSection): SagaIterator<DashboardLayoutSectionRemoved>;
