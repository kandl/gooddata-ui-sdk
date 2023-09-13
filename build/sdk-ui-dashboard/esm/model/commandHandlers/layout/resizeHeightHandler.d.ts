import { SagaIterator } from "redux-saga";
import { ResizeHeight } from "../../commands/layout.js";
import { DashboardLayoutSectionItemsHeightResized } from "../../events/layout.js";
import { DashboardContext } from "../../types/commonTypes.js";
export declare function resizeHeightHandler(ctx: DashboardContext, cmd: ResizeHeight): SagaIterator<DashboardLayoutSectionItemsHeightResized>;
