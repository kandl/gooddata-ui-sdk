import { SagaIterator } from "redux-saga";
import { DashboardContext } from "../../types/commonTypes.js";
import { MoveSectionItem } from "../../commands/index.js";
import { DashboardLayoutSectionItemMoved } from "../../events/layout.js";
export declare function moveSectionItemHandler(ctx: DashboardContext, cmd: MoveSectionItem): SagaIterator<DashboardLayoutSectionItemMoved>;
