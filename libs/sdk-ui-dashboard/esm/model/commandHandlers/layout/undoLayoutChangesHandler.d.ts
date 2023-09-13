import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { UndoLayoutChanges } from "../../commands/index.js";
import { DashboardLayoutChanged } from "../../events/layout.js";
export declare function undoLayoutChangesHandler(ctx: DashboardContext, cmd: UndoLayoutChanges): SagaIterator<DashboardLayoutChanged>;
