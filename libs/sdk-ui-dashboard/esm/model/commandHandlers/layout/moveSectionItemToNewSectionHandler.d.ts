import { SagaIterator } from "redux-saga";
import { MoveSectionItemToNewSection } from "../../commands/layout.js";
import { DashboardLayoutSectionItemMovedToNewSection } from "../../events/layout.js";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function moveSectionItemToNewSectionHandler(ctx: DashboardContext, cmd: MoveSectionItemToNewSection): SagaIterator<DashboardLayoutSectionItemMovedToNewSection>;
