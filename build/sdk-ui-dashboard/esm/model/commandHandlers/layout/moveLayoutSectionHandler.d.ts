import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { MoveLayoutSection } from "../../commands/index.js";
import { DashboardLayoutSectionMoved } from "../../events/layout.js";
export declare function moveLayoutSectionHandler(ctx: DashboardContext, cmd: MoveLayoutSection): SagaIterator<DashboardLayoutSectionMoved>;
